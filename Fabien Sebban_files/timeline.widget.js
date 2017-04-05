Viz.widget.register("template7.timeline", function (options) {
	var widget = Viz.createTag("div"),
		opt = options || {},
		paper = new Raphael(widget, 960, 340),
		margin = {
			horizontal: opt.marginHorizontal || 0, 
			vertical: (!isNaN(opt.marginVertical) && opt.marginVertical >= 0) ? opt.marginVertical : 25
		},
		hues = opt.colors || ['#a3af81', '#836c7e', '#6b7785', '#4c1a26', '#703f30', '#307066', '#305670', '#367030'],
		dimensions = {
			infographicPadding: 35,
			infographicWidth: 960,
			timelineWidth: 960 - 35 * 2,
			timelineBlockHeight: 25,
			workHeight: 170,
			educationHeight: 170,
			years: []
		},
		mutedTemplateStyle = {
			"common": {
				"lines": {
					"style": {
						"stroke": "#caced1"
					}
				}
			},
			"timeline": {
				"axis": {
					"style": {
						stroke: "#222",
						"stroke-width": "4px"
					},
					"yearLabel": {
						"style": {
							"font-size": 11,
							"font-weight": "bold",
							"text-anchor": "center"
						}
					}
				},
				"block": {
					"style": {
						"stroke": "none"
					},
					"anchor": {
						"style": {
							stroke: "none",
							fill: "#1f1f1f"
						}
					}
				}
			}
		};
	widget.style.marginTop = margin.vertical + 'px';

	widget.raphael = paper;
	
	// TODO: Change to Viz.dataStream.request
	var timeLineExp = vizData.timeline_work;
	var timeLineEdu = vizData.timeline_education;
		
	var sortByRange = function (a, b) {
		return a.range - b.range;
	};
	var getDateFromString = function (unixtimestamp) {
		return new Date(unixtimestamp * 1000);
	};
	
	var drawHorizontalLine = function (paper, y, isDashed) {
		var line = paper.path("M" + dimensions.infographicPadding + " " + (y - 0.5) + " H" + (dimensions.infographicWidth - dimensions.infographicPadding)).attr(
			mutedTemplateStyle.common.lines.style
		);
		if (isDashed) {
			line.attr({
				"stroke-dasharray": "- "
			});
		}
		return line;
	};
	
	var drawTriangleNotch = function (paper, x, y, width) {
		var height = (0.5 * width) * Math.sqrt(3);
		var path = "M " + x + " " + y + " l " + (-0.5 * width) + " 0 l " + (0.5 * width) + " " + height + " l " + (0.5 * width) + " " + (-1 * height) + " z";

		var triangle = paper.path(path).attr({
			fill: "#222",
			stroke: "none"
		});
		return triangle;
	};
		
	// calculating range for each period
    var fnCalculateRange = function (timeline) {
		var i;
        for (i = 0; i < timeline.length; i++) {
            var start = getDateFromString(timeline[i].start_date);
            var end = getDateFromString(timeline[i].end_date);

            timeline[i].range = (end.getTime() - start.getTime()) / 86400000; //convert from ms to days
            if (timeline[i].range < 30) {
                timeline[i].range = 30;
			}
        }
    };

    // calculating blocks height
    var fnSetBlocksHeight = function (timeLine) {
        var maxBlockHeight = dimensions.timelineBlockHeight;
        var currentStart, currentEnd, previousStart, previousEnd;
		var i;
		var j;
        timeLine.sort(sortByRange);
        for (i = 0; i < timeLine.length; i++) {
            timeLine[i].height = dimensions.timelineBlockHeight;
            currentStart = getDateFromString(timeLine[i].start_date).getTime();
            currentEnd = getDateFromString(timeLine[i].end_date).getTime();
            for (j = 0; j < i; j++) {
                previousStart = getDateFromString(timeLine[j].start_date).getTime();
                previousEnd = getDateFromString(timeLine[j].end_date).getTime();
                if ((previousStart > currentStart && previousStart < currentEnd) || (previousEnd > currentStart && previousEnd < currentEnd) 
						|| (previousStart === currentStart && previousEnd === currentEnd)) {
                    // Only increment if needed
                    if (timeLine[i].height === timeLine[j].height) {
                        timeLine[i].height = timeLine[i].height + dimensions.timelineBlockHeight;
                        if (timeLine[i].height > maxBlockHeight) {
                            maxBlockHeight = timeLine[i].height;
						}
                    }
                }
            }
        }
        return maxBlockHeight;
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // calculations of years
    var timeLineExpExists = false, timeLineEduExists = false;
	timeLineExpExists = (typeof timeLineExp !== "undefined" && timeLineExp.length > 0);
	timeLineEduExists = (typeof timeLineEdu !== "undefined" && timeLineEdu.length > 0);

	var firstExpYear, firstEduYear, lastExpYear, lastEduYear;
    if (timeLineExpExists) {
        firstExpYear = getDateFromString(timeLineExp[timeLineExp.length - 1].start_date).getFullYear();
        lastExpYear = getDateFromString(timeLineExp[0].end_date).getFullYear();
    }
    if (timeLineEduExists) {
        firstEduYear = getDateFromString(timeLineEdu[timeLineEdu.length - 1].start_date).getFullYear();
        lastEduYear = getDateFromString(timeLineEdu[0].end_date).getFullYear();
    }
	var firstYear, lastYear;
    if (timeLineExpExists && timeLineEduExists) {
        // all of timelines exists
        firstYear = firstExpYear > firstEduYear ? firstEduYear : firstExpYear;
        lastYear = lastExpYear > lastEduYear ? lastExpYear : lastEduYear;
    } else if (timeLineExpExists && !timeLineEduExists) {
        // only experience timeline exists
        firstYear = firstExpYear;
        lastYear = lastExpYear;
    } else if (!timeLineExpExists && timeLineEduExists) {
        // only education timeline exists
        firstYear = firstEduYear;
        lastYear = lastEduYear;
    } else {
        // both timelines not exists
        return;
    }

    var yearCount = (lastYear - firstYear) + 1;

    // geometry
    var startY = 0;
    var startX = dimensions.infographicPadding;
    var endX = dimensions.infographicWidth - dimensions.infographicPadding;
    var axisY = startY + dimensions.workHeight;
    var sectionHeight = 40;
    var yearWidth = dimensions.timelineWidth / yearCount;
	
    // calculating years coordinates on timeline axis
	var y, i;
    for (y = lastYear + 1, i = 0; y > firstYear; y--, i++) {
        dimensions.years[i] = {
            x: Math.round(endX - i * yearWidth),
            isVisible: (i % 2 === 1),
            label: y
        };
    }

    var fnCalculateBlocksGeometry = function (timeLine, reverse) {
        var dayWidth = yearWidth / 365;
        timeLine.sort(sortByRange).reverse();
        var timelineStartDate = new Date(firstYear, 0, 1);
        var timelineEndDate = new Date(lastYear, 11, 31);
        var blockHeight = dimensions.timelineBlockHeight;
		var i, j;
        for (i = 0; i < timeLine.length; i++) {
            var thisStartDate = getDateFromString(timeLine[i].start_date);
            var thisEndDate = getDateFromString(timeLine[i].end_date);
            var thisStartX = Math.floor(startX + ((thisStartDate.getTime() - timelineStartDate.getTime()) / 86400000) * dayWidth);
            var thisWidth =  Math.floor((timeLine[i].range / 365) * yearWidth);
            var thisHeight = timeLine[i].height;
            timeLine[i].width = thisWidth;
            timeLine[i].center = thisStartX + (thisWidth / 2);
            timeLine[i].x = thisStartX;
            timeLine[i].y = axisY - thisHeight;
            timeLine[i].fill = hues[3 + (i % (hues.length - 3))];
			//console.log(timeLine[i].fill);
            // setting up coordinates of anchor circle
            timeLine[i].anchorX = timeLine[i].center;
            timeLine[i].anchorY = timeLine[i].y + blockHeight / 2;
			
            if (reverse) {
                // education timeline
                timeLine[i].y = axisY;
                timeLine[i].anchorY = timeLine[i].y + blockHeight / 2;
				
                // now we have to check, that year labels doesn't overlap anchor circles
                // this is for reversed template only (education) and for first-level blocks (with default height = 25)
                if (timeLine[i].height === blockHeight) {
                    var approxLabelWidth = 34; // approx. width of year label
                    for (j = 0; j < dimensions.years.length; j++) {
                        if (dimensions.years[j].isVisible && timeLine[i].anchorX > dimensions.years[j].x - approxLabelWidth / 2 && timeLine[i].anchorX < dimensions.years[j].x + approxLabelWidth / 2) {
                            if (timeLine[i].anchorX < dimensions.years[j].x) {
                                // move anchor to the left side
                                timeLine[i].anchorX -= Math.abs(approxLabelWidth / 2 - (dimensions.years[j].x - timeLine[i].anchorX));
                            } else {
                                // move anchor to the right side
                                timeLine[i].anchorX += Math.abs(approxLabelWidth / 2 - (timeLine[i].anchorX - dimensions.years[j].x));
                            }
                        }
                    }
                }
            }
        }
    };

	// Start Drawing
	var set = paper.set();
	
    // grid
    // for (i = 1; i <= 4; i++) {
		// set.push(
			// drawHorizontalLine(paper, axisY - dimensions.timelineBlockHeight * i, (i % 2) === 1),
			// drawHorizontalLine(paper, axisY + dimensions.timelineBlockHeight * i, (i % 2) === 1)
		// );
    // }
    // for (i = 1; i < yearCount; i++) {
        // paper.path("M" + (startX + yearWidth * i + 0.5) + " " + startY + " V" + (startY + dimensions.workHeight + dimensions.educationHeight)).attr(
            // mutedTemplateStyle.common.lines.style
        // );
    // }

    if (timeLineExpExists) {
        // draw experience timeline
        fnCalculateRange(timeLineExp);
        fnSetBlocksHeight(timeLineExp);
        fnCalculateBlocksGeometry(timeLineExp, false);

        for (i = 0; i < timeLineExp.length; i++) {
			var block = paper.rect(timeLineExp[i].x, timeLineExp[i].y, timeLineExp[i].width, timeLineExp[i].height).attr(
					mutedTemplateStyle.timeline.block.style
				).attr({
					fill: timeLineExp[i].fill
				});
			set.push(block);
			
            // draw anchor circle
            timeLineExp[i].title = timeLineExp[i].position;
            timeLineExp[i].desc = timeLineExp[i].company;
			timeLineExp[i].center = timeLineExp[i].anchorX;
            timeLineExp[i].apex = timeLineExp[i].anchorY + 8;
			
			var tipText = getExperienceToolTip(timeLineExp[i]);
            drawTooltip(block.node, tipText);
        }
    }

    if (timeLineEduExists) {
        // draw education timeline
        fnCalculateRange(timeLineEdu);
        fnSetBlocksHeight(timeLineEdu);
        fnCalculateBlocksGeometry(timeLineEdu, true);
		
        for (i = 0; i < timeLineEdu.length; i++) {
			var block = paper.rect(timeLineEdu[i].x, timeLineEdu[i].y, timeLineEdu[i].width, timeLineEdu[i].height).attr(
					mutedTemplateStyle.timeline.block.style
				).attr({
					fill: timeLineEdu[i].fill
				});
			set.push(block);

            // draw anchor circle
            timeLineEdu[i].title = timeLineEdu[i].degree;
            timeLineEdu[i].desc = timeLineEdu[i].school;
            timeLineEdu[i].center = timeLineEdu[i].anchorX;
            timeLineEdu[i].apex = timeLineEdu[i].anchorY - 8;
			
			var tipText = getEducationToolTip(timeLineEdu[i]);
            drawTooltip(block.node, tipText);
        }
		//paper.viz.3Labels(100, 450, timeLineEdu, { spacing: 5, horz_spacing: 10 });
    }
    
    // main axis
	set.push(
		paper.path("M" + startX + " " + axisY + " H" + endX).attr(
			mutedTemplateStyle.timeline.axis.style
		)
	);

    // add years drawn centered on "endpoint" of year
	for (i = 0; i < dimensions.years.length; i++) {
		if (dimensions.years[i].isVisible) {
			set.push(
				drawTriangleNotch(paper, dimensions.years[i].x, axisY, 10),
				paper.text(dimensions.years[i].x, axisY + 15, dimensions.years[i].label).attr(
					mutedTemplateStyle.timeline.axis.yearLabel.style
				)
			);
		}
	}
	
	widget.drawLabels = function () {
		var downShift = paper.viz.scatterLabels(100, 10, timeLineExp, { spacing: 10, horz_spacing: 10 });
		paper.setSize(paper.width, paper.height + downShift);
		set.translate(0, downShift);
		//console.log(downShift);
		var i;
		for (i = 0; i < timeLineEdu.length; ++i) {
			timeLineEdu[i].apex += downShift;
		}
		paper.viz.scatterLabels(100, 450 + downShift, timeLineEdu, { spacing: 5, horz_spacing: 10, reverse: true });
	};
	
	return widget;
});