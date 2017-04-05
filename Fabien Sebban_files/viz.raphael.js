Raphael.fn.viz = {
    debug: true,

    getStars: function (prof) {
        var stars = 0;
        if (prof) {
            switch (prof) {
                case "advanced":
                    stars = 3;
                    break;
                case "expert":
                    stars = 4;
                    break;
                case "intermediate":
                    stars = 2;
                    break;
                case "beginner":
                    stars = 1;
                    break;
                default:
                    stars = 0;

            }
        }
        return stars;
    },
    applyConstraintsOnTimeLine: function (yearLimit, dataToProcess, startYear, endYear) {

        var timeLineArray = [];
        var tempArray = clone(dataToProcess);
        var tempStartYear;
        var minDate = getMinStartDate(dataToProcess, yearLimit,endYear);

        for (var i = 0; i < tempArray.length; i++) {
            //make sure the dates are there
            if (tempArray[i].start_date && tempArray[i].end_date) {
                var endDate = getDateFromString(tempArray[i].end_date);
                var startDate = getDateFromString(tempArray[i].start_date);

                tempStartYear = startDate.getFullYear();
                if (tempStartYear >= minDate.getFullYear())
                    timeLineArray.push(tempArray[i]);
                else if ((endYear - tempStartYear) >= yearLimit && endDate > minDate) {//to include dates that are prior to min date but greater than min dates
                    tempArray[i].isInPast = true;
                    //tempArray[i].start_date = Math.round(minDate.getTime() / 1000); 
                    timeLineArray.push(tempArray[i]);
                }

            }
        }

        return timeLineArray;
    },
    normalize: function (array, offset) {
        offset = offset || 0;
        var max = 0,
			result = [];
        for (var i = 0; i < array.length; ++i) {
            max = Math.max(max, array[i] + offset);
        }
        for (var i = 0; i < array.length; ++i) {
            result.push(array[i] / max);
        }
        return result;
    },

    wedge: function (x, y, radius, startAngle, endAngle, opts) {
        opts = opts || {};
        function sector(cx, cy, r, startAngle, endAngle) {
            var rad = Math.PI / 180,
				start = { x: cx + r * Math.cos(startAngle * rad), y: cy + r * Math.sin(startAngle * rad) },
				end = { x: cx + r * Math.cos(endAngle * rad), y: cy + r * Math.sin(endAngle * rad) },
				largeSweep = Math.abs(startAngle - endAngle) >= 180 ? 1 : 0,
				res = [" M", cx, cy, " L", start.x, start.y, " A", r, r, 0, largeSweep, 1, end.x, end.y, "z"];
            return res;
        }
        this.path(sector(x, y, radius, startAngle, endAngle))
			.attr({
			    fill: opts.colors || "#666",
			    "stroke-width": (opts.strokewidth == null ? 1 : opts.strokewidth),
			    "stroke-linejoin": "round",
			    stroke: opts.stroke || "#666",
			    opacity: opts.opacity || "1"
			}
		);
    },

    seperateSkillChart: function (x, y, skills, opts) {
        var debug = this.viz.debug;
        opts = opts || {};
        //alert(JSON.stringify(opts));
        var data = [],
			factor = opts.factor || 50,
			pieColor = opts.colors || 'red',
			emptyColor = opts.empty || '#999',
			spacing = opts.spacing || 20,
			radius = opts.radius || 50
        fontSize = opts.fontSize || 10;
        //!debug || alert(JSON.stringify(skills));
        for (var skill in skills) {
            //!debug || alert(JSON.stringify(skills[skill]));
            data.push(skills[skill].level * skills[skill].years);
        }
        data = this.viz.normalize(data, factor);
        for (var i = 0; i < Math.min(5, data.length); ++i) {
            var startX = (spacing + 2 * radius) * i + x,
				angle = (data[i] * 360) - 90;
            //!debug || alert(data[i] + " x 360 -90 = " + angle);
            this.viz.wedge(startX, y, radius, -90, angle, { colors: pieColor, stroke: opts.stroke, opacity: opts.opacity });
            this.viz.wedge(startX, y, radius, angle, 270, { colors: emptyColor, stroke: opts.stroke, opacity: opts.opacity });
            var label = this.text(startX, y + radius + 10, skills[i].name.replace(/ /gi, "\n")); // Line spaces for each
            var labelBox = label.getBBox();
            label.attr({ "font-size": fontSize, y: labelBox.y + ((y + radius + 10) - (labelBox.y - labelBox.height / 2)) });
        }
    },


    scatterLabels: function (x, y, data, opts) {	// Assuming data has...
        var debug = this.viz.debug;
        function sortByTextSize(a, b) {
            return Math.max(b.title.length, b.desc.length) - Math.max(a.title.length, a.desc.length)
        }
        function sortByHeight(a, b) {
            return b.height - a.height;
        }
        function isOverlap(start1, end1, start2, end2) {
            //alert(JSON.stringify([start1, end1, start2, end2]));
            return (end1 >= start2 && end1 <= end2) || (end2 >= start1 && end2 <= end1);
        }
        function truncate(text, size, appendText) {
            appendText = appendText || "...";
            return text.substr(0, size) + (text.length > size ? appendText : "");
        }
        function toElement(index, data, title, desc, startX, startY, maxWidth, maxHeight) {	// Standardize an element in layers
            return {
                index: index,
                titleElement: title,
                descElement: desc,
                maxWidth: maxWidth,
                maxHeight: maxHeight,
                startX: startX,
                startY: startY,
                middle: { x: startX + (maxWidth / 2), y: startY + (maxHeight / 2) },
                data: data
            };
        }
        data = data || [];
        opts = opts || [];
        var spacing = opts.spacing || 5,
			horz_spacing = opts.horizontal_spacing || 5,
			X_relativity = 0,
			layers = [],
			reverse = opts.reverse || false;

        data.sort(sortByHeight);
        //data.sort(sortByTextSize);

        // Each data point
        for (i = 0; i < data.length; ++i) {
            var canvasWidth = opts.canvasWidth || this.width,
				titleText = data[i].title || "",
				title = this.text(data[i].center, y, titleText).attr({ fill: "#000", 'font-family': customizedFonts[2], "text-anchor": "start", "font-size": 12, "font-weight": "bold" }),
				titleBox = title.getBBox(),
				descText = data[i].desc || "",
				desc = this.text(data[i].center, y + titleBox.height, descText).attr({ fill: "#000", 'font-family': customizedFonts[2], "text-anchor": "start", "font-size": 12 }),
				descBox = desc.getBBox(),
				maxWidth = Math.max(titleBox.width, descBox.width) + (spacing * 2) + (horz_spacing * 2),
				middle = { x: data[i].center - (maxWidth / 2) },
				startX = Math.max(middle.x - Math.max(0, (middle.x + maxWidth + spacing) - canvasWidth), spacing),
				startY = y,
				maxHeight = Math.max(titleBox.height, descBox.height);
            addNewLayer = true;

            if (middle.x > maxWidth / 2) {
                X_relativity += (canvasWidth / 2) - middle.x;
            }
            //!debug || alert(i + ". Title: " + data[i].title + " middleX: " + middle.x + " X: " + startX + "-" + (titleBox.x+maxWidth) + " (" +(Math.max(0, (titleBox.x+maxWidth)-canvasWidth))+ " over) Width: " + (titleBox.x+maxWidth));
            // Collision detection
            for (var layerIndex = 0; layerIndex < layers.length; ++layerIndex) {	// Each layer
                //!debug || alert(i + ". Checking layer " + layerIndex)
                var isClearToPlace = true,
					newY = y + (layerIndex * maxHeight * 2) + (layerIndex * spacing); // Calculate our y

                title.attr({ y: newY, x: startX }); // Move title
                desc.attr({ y: newY + titleBox.height, x: startX }); // Move desc

                for (var elIndex = 0; elIndex < layers[layerIndex].length; ++elIndex) {	// Each element in layer
                    var element = layers[layerIndex][elIndex];
                    //!debug || alert(i + ". Check overlap with element " + element.index + ", " + element.data.title + "\nWidth: " + element.maxWidth + ", " + maxWidth + "\nStart: " + element.startX + ", " + startX);
                    if (isOverlap(element.startX, element.startX + element.maxWidth, startX, startX + maxWidth)) {	// Text Overlap?
                        // Check for middle overlap (when the middle is too close to each other)
                        if (isOverlap(data[i].center - spacing, data[i].center + spacing, element.middle.x - spacing, element.middle.x + spacing)) {	// Middles overlap

                            if (data[i].center > element.middle.x) {
                                startX += spacing + (X_relativity < 0) ? spacing * 2 : 0; // Right
                                startX = Math.min(this.width - maxWidth, startX);
                            } else {
                                startX -= spacing + (X_relativity >= 0) ? spacing * 2 : 0; // Left
                                startX = Math.max(spacing, startX);
                            }

                        }
                        //!debug || alert(i + ". Overlaps in layer " + layerIndex + " with element " + element.index);
                        isClearToPlace = false; // Overlaps
                        break;
                    }
                }
                if (isClearToPlace) {	// Layer is clear
                    layers[layerIndex].push(toElement(i, data[i], title, desc, startX, newY, maxWidth, descBox.y + maxHeight, data[i].desc));
                    addNewLayer = false;
                    //!debug || alert(i + ". Clear to place! @ " + layerIndex);
                    break;
                }
            }

            if (addNewLayer) {
                /*
                if (layers.length > 3) {	// 4 layer max
                title.remove();
                desc.remove();
                continue;
                }
                */
                var newY = y + (layers.length * maxHeight * 2) + (layers.length * spacing);
                layers.push([toElement(i, data[i], title, desc, startX, newY, maxWidth, descBox.y + maxHeight, data[i].desc)]);
                title.attr({ y: newY, x: startX });
                desc.attr({ y: newY + titleBox.height, x: startX });
                //(!debug) || alert(i + ". Added new layer! @" + ((layers.length - 1) || "0"));
            }
        }


        // Calculate offset and shift everything down if we can (3 or less layers)
        if (layers.length < 4) {
            var element = layers[0][0];
            var offsetRange = element.data.apex - y;
            var itemHeight = element.titleElement.getBBox().height * 2 + spacing
            offset = (offsetRange - itemHeight * layers.length + spacing * (layers.length - 1)) / 2
            for (var layerIndex = 0; layerIndex < layers.length; ++layerIndex) {	// Each layer
                for (var elIndex = 0; elIndex < layers[layerIndex].length; ++elIndex) {	// Each element in layer
                    var element = layers[layerIndex][elIndex];
                    var titleNewY = element.titleElement.getBBox().y + offset;
                    var descNewY = element.descElement.getBBox().y + offset;
                    element.titleElement.attr({ y: titleNewY });
                    element.descElement.attr({ y: descNewY });
                }
            }
        }

        var downShift = reverse ? 0 : (layers.length - 3) * (maxHeight + spacing * 2);

        // Lines!
        for (var layerIndex = 0; layerIndex < layers.length; ++layerIndex) {	// Each layer
            for (var elIndex = 0; elIndex < layers[layerIndex].length; ++elIndex) {	// Each element in layer
                var element = layers[layerIndex][elIndex],
					titleBox = element.titleElement.getBBox(),
					descBox = element.descElement.getBBox(),
					maxY = Math.max(element.data.title ? titleBox.y : 0, element.data.desc ? descBox.y : 0),
					minY = Math.min(element.data.title ? titleBox.y : 0, element.data.desc ? descBox.y : 0),
					maxHeight = Math.max(element.data.title ? titleBox.height : 0, element.data.desc ? descBox.height : 0),
                //linePath = ["M", 0, 0, "L", element.data.center, element.data.apex];
                //linePath = ["M", element.middle.x, maxY + maxHeight, "L", 0,0];
					linePath = ["M", element.middle.x, reverse ? minY : (maxY + maxHeight), "L", element.data.center, element.data.apex + downShift];
                //(!debug) || alert(element.data.title + " " + element.data.desc + " " + JSON.stringify(linePath));
                this.path(linePath).attr({ fill: "#fff", opacity: ".7" });
                if (element.data.is_current) {
                    this.g.star(Math.max(element.data.center, spacing), element.data.apex + downShift, 5).attr({ stroke: "none", fill: "#000" });
                }
                else if (element.data.isInPast) {
                    this.g.arrow(Math.max(element.data.center - 3, spacing), (element.data.apex + downShift), -5).attr({ stroke: "none", fill: "#000" });
                }
                else {
                    this.circle(Math.max(element.data.center, spacing), element.data.apex + downShift, 3).attr({ stroke: "none", fill: "#000" });
                }
            }
        }

        // logic to move text to front
        for (var layerIndex = 0; layerIndex < layers.length; ++layerIndex) {	// Each layer
            for (var elIndex = 0; elIndex < layers[layerIndex].length; ++elIndex) {	// Each element in layer
                var element = layers[layerIndex][elIndex];
                element.titleElement.toFront();
                element.descElement.toFront();
            }
        }
        // Return shift in height
        return downShift;
    },
/*
    scatterLabels2: function (x, y, data, options) {
        function drawItemText(paper, x, y, set, title, desc, titleStyle, descStyle) {
            set.push(paper.text(x, y, title).attr(titleStyle));
            set.push(paper.text(x, y, desc).attr(descStyle));
            var titleBox = set[set.length - 2].getBBox();
            var descBox = set[set.length - 2].getBBox();
            set[set.length - 1].translate(0, titleBox.height);
        }
        function center(item) {
            var box = item.getBBox();
            item.translate(-box.width / 2, -box.height / 2);
        }
        function isOverlap(box1, box2) {
            function isBetweenRange(value, rangeMin, rangeMax) {
                return (value >= rangeMin && value <= rangeMax);
            }
            return (isBetweenRange(box1.x, box2.x, box2.x + box2.width)
					|| isBetweenRange(box1.x + box1.width, box2.x, box2.x + box2.width))
				&& (isBetweenRange(box1.y, box2.y, box2.y + box2.height)
					|| isBetweenRange(box1.y + box1.height, box2.y, box2.y + box2.height));
        }
        function getLabelCollisions(item, dataSet, ignoreIndex) {
            var result = [];
            for (var i in dataSet) {
                if (ignoreIndex === i) continue;
                if (isOverlap(item.label.getBBox(), dataSet[i].label.getBBox())) {
                    result.push(dataSet[i]);
                }
            }
            return result;
        }
        opt = options || {};
        data = data || [];

        var titleStyle = { fill: "#000", 'font-family': customizedFonts[2], "text-anchor": "start", "font-size": 12, "font-weight": "bold" },
			descStyle = { fill: "#000", 'font-family': customizedFonts[2], "text-anchor": "start", "font-size": 12 },
			professorX = 0, // Relative midpoints
			layers = [];


        // Draw all the labels
        for (var i in data) {
            var labelSet = this.set(),
				item = data[i],
				addNewLayer = true;

            // Initial position
            drawItemText(this, item.center, item.apex, labelSet, item.title, item.desc, titleStyle, descStyle);
            center(labelSet);
            labelSet.translate(0, -labelSet.getBBox().y + y);

            data[i].label = labelSet;
            professorX += (item.center - this.width / 2);

            // Move to optimal position
            var collisions = getLabelCollisions(data[i], layer, i);
            tries = 0;
            while (collisions.length > 0 && tries < 5)
                if (collisions.length > 0) {
                    // Reposition
                }
        }
    }
*/

}

/*function getExperienceToolTip(expItem) {
	$("#Photo_Gallery").hide();
    var ttext = '';
    if (expItem.title && expItem.title.length > 0) {
        ttext = ttext + expItem.title;
    }
    if (expItem.desc && expItem.desc.length > 0) {
        if (ttext.length > 0) {
            ttext = ttext + ": ";
        }
        ttext = ttext + expItem.desc;
    }
    if (ttext.length > 0) {
        ttext = "<b>" + ttext + "</b></br>";
    }
    var startDate = getDateFromString(expItem.start_date);
    var endDate = getDateFromString(expItem.end_date);
    ttext = ttext + (startDate.getMonth() + 1) + "/" + startDate.getFullYear() + " - " + (endDate.getMonth() + 1) + "/" + endDate.getFullYear();

    if (expItem.portfolio) {
					        ttext += '<br/><a onclick="showGallery('+expItem.portfolio+')">View my portfolio</a>';
    }
    if (expItem.summary && expItem.summary.length > 0) {
        ttext += "</br></br>";
        var htmlFormatted = expItem.summary.replace(/\n/g, "<br />");
        ttext = ttext + htmlFormatted;
    }
    
   // ttext = ttext + "</div>"; //<div style='float: right; width: 100px;'><b>Hello </b><br><br><img src='http://www.blueriverdigital.com/images/galleryIcon.png'><br></div></div></div>";
    return ttext;
}*/

function getExperienceToolTip(expItem) {
	$("#Photo_Gallery").hide();
	$("#Display_Links").hide();
	var ttext = '';

	if(expItem.portfolio) {
	   ttext = '<div class="tip-layout"><div class="tip-desc">';
	}
    if (expItem.position && expItem.position.length > 0) {
        ttext = ttext + expItem.position;
    }
    if (expItem.company && expItem.company.length > 0) {
        if (ttext.length > 0) {
            ttext = ttext + " @ ";
        }
        ttext = ttext + expItem.company;
    }
    if (ttext.length > 0) {
        ttext = "<b>" + ttext + "</b></br>";
    }
    var startDate = getDateFromString(expItem.start_date);
    var endDate = getDateFromString(expItem.end_date);
    ttext = ttext + (startDate.getMonth() + 1) + "/" + startDate.getFullYear() +" - ";
    if (expItem.is_current)
        ttext += "Current";
    else
        ttext += (endDate.getMonth() + 1) + "/" + endDate.getFullYear();
	if(expItem.portfolio) {
		ttext = ttext + '</div><div class="tip-portfolio"><a onclick="showGallery('+expItem.portfolio+')"><img alt="View Portfolio" title="Portfolio" src="/media/img/portfolio.gif"/></a></div></div><br /><br />';
	}
	if (expItem.location) {
	    ttext = ttext + "</br> Location: " + expItem.location;
	}
    if (expItem.summary && expItem.summary.length > 0) {
        ttext += "</br></br>";
        var htmlFormatted = expItem.summary.replace(/\n/g, "<br />").substring(0, 750);
        ttext = ttext + htmlFormatted;
    }
    
    if(expItem.portfolio) {
		ttext = ttext + '</div>';
	}
	
    return ttext;
}

function getEducationToolTip(eduItem) {
    var ttext = '';
    if (eduItem.degree && eduItem.degree.length > 0) {
        ttext = eduItem.degree;
    }
    if (eduItem.discipline && eduItem.discipline.length > 0) {
        if (ttext.length > 0) {
            ttext = ttext + ": ";
        }
        ttext = ttext + eduItem.discipline;
    }
    if (ttext.length > 0) {
        ttext = "<b>" + ttext + "</b></br>";
    }
    
    var startDate = getDateFromString(eduItem.start_date);
    var endDate = getDateFromString(eduItem.end_date);
    ttext = ttext + (startDate.getMonth() + 1) + "/" + startDate.getFullYear() +" - ";
    if (eduItem.is_current)
        ttext += "Current";
    else
        ttext += (endDate.getMonth() + 1) + "/" + endDate.getFullYear();

    if (eduItem.school && eduItem.school.length > 0) {
        ttext+="</br>";
        ttext = ttext + eduItem.school;
    }
    if (eduItem.location) {
        ttext = ttext + "</br> Location: " + eduItem.location;
    }
    if (eduItem.activities && eduItem.activities.length > 0) {
        ttext += "</br></br>";
        ttext = ttext + eduItem.activities.substring(0, 750);
    }
    return ttext;
}
function getSkillsTooltip(skill) {
    var skillTooltip = skill.name;
    if (skill.years || skill.proficiency) {
        skillTooltip += "</br>";
        if (skill.years)
            skillTooltip = skillTooltip + " " + skill.years + " years";
        if (skill.proficiency)
            skillTooltip = skillTooltip + " " + skill.proficiency;
    }
    return skillTooltip;   
}
			
function loadGallery(id){
	$.ajax({
					type: 'GET',
					url: '/portfolio/'+id,
					success: function (resp) {
						initpic(resp);
					}
		  });
function initpic(resp){
				var galleryNum = resp.items.length;
				if (galleryNum >=5){
					galleryNum-=galleryNum-5;	
				}
				var data = [galleryNum];
			    for (i=0;i<galleryNum;i++){
					//types [0=image 1=link 2=video]
					if (resp.items[i].type==1){
						//CURRENTLY _BLANK DOES NOT WORK
						var url = encodeURIComponent(resp.items[i].url);
						var linkurl= 'http://images.websnapr.com/?url=' + url + '&key=' + 'k2BgmWIUhk9W' + '&hash=' + encodeURIComponent(websnapr_hash);
						data[i] = {"image":linkurl,"caption":resp.items[i].desc, "title":resp.items[i].title, "link":resp.items[i].url, "target": "_blank"};
					}else{
			    	data[i] = {"image":resp.items[i].url,"caption":resp.items[i].desc, "title":resp.items[i].title};
					}
				}
				$(".pika-stage").remove();
				$(".pika-thumbs").remove();
				$(".pika-tooltip").remove();
				$(".pikachoose").PikaChoose({data:data, autoPlay:false, carousel:true, text: {previous: "", next: "" }});
				$("#Photo_Gallery").show();	
    			$("#Photo_Gallery").dialog("open");	
			}
}

//Show portfolio gallery
function showGallery(id){
	loadGallery(id);	
	$('.qtip:visible').qtip("hide");
}

function getMinStartDate(items,yearLimit,endYear) {
    //TODO: Improve this method
    if (items && items.length>0) {
        var currentDate = new Date();
        var minDate = currentDate;
        $.each(items, function (i, item) {
            var endDate = getDateFromString(item.end_date);
            var startDate = getDateFromString(item.start_date);
            if (yearLimit && endYear) {
                if (startDate < minDate && ((endYear - startDate.getFullYear()) < yearLimit)) {
                    minDate = startDate;
                }
            }
            else if (startDate < minDate) {
                minDate = startDate;
            }
        });
        if (yearLimit && endYear) {
            if (minDate == currentDate) {
                minDate = new Date(endYear-yearLimit,01,01);
            }

        }
        return minDate;
    }
    return null;
}

function getMaxEndDate(items) {
    if (items && items.length > 0) {
        var maxDate = getDateFromString(items[0].end_date); ;
        $.each(items, function (i, item) {
            if(item.end_date && item.start_date){
                var date = getDateFromString(item.end_date);
                if (date > maxDate) {
                    maxDate = date;
                }
            }
        });
        return maxDate;
    }
    return null;
}