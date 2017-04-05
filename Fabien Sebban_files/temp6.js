 var temp6 = (function () {
    var paper;
    var colors = ["#fff", "#fef200", "#000", "#ed008c", "#00adef", "#fef200", "#BBCB5F"];
   // var colors = ["#00adef", "#fe0000", "#fff", "#fe0000", "#00adef", "#7d7d7d", "#2b2b2b"];
    var fonts = ["museo-slab", "museo-slab", "cooper-black-std"];
    //var colors = { "color1": "#fef200", "color2": "#fff", "color3": "#000", "color4": "#ed008c", "color5": "#00adef", "color6": "#BBCB5F", "color7": "#fef200" };

    var style = {
        "fonts": {
            // http://new.myfonts.com/fonts/exljbris/museo-slab/500/
            "title": "Museo Slab 500",
            // http://new.myfonts.com/fonts/cheapprofonts/familiar-pro/bold/
            "content": "Familar Pro Bold"
        },
        "header": {
            "header_bg": colors[2],
            "name": {
                "fontsize": 50,
                "fontweight": "bold",
                "fontcolor": colors[0]
            },
            "title": {
                "fontsize": 25,
                "fontweight": "bold",
                "fontcolor": "#000"
            }
        },
        "skills": {
            "title_fontsize": 35,
            "title_fontcolor": "#000",
            "title_fontweight": "bold",
            "skill_fillcolor": "#00adef",
            "skill_emptycolor": "#ddd",
            "skill_fontsize": 12
        },
        "languages": {
            "title_fontsize": 35,
            "title_fontcolor": "#000",
            "title_fontweight": "bold",
            "lang_fontcolor": "#000",
            "lang_fontsize": 22

        },
        "interests": {
            "title_fontsize": 35,
            "title_fontcolor": "#000",
            "title_fontweight": "bold",
            "int_fontcolor": "#000",
            "int_fontsize": 22

        },
        "awards": {
            "title_fontsize": 35,
            "title_fontcolor": "#000",
            "title_fontweight": "bold",
            "int_fontcolor": "#000",
            "int_fontsize": 22

        },
        "recomm": {
            "title_fontsize": 35,
            "title_fontcolor": "#000",
            "title_fontweight": "bold",
            "rec_fontcolor": "#fff",
            "rec_fontsize": 18,
            "rec_font": "Verdana",
            "rec_fill": "#000",
            "recommender_fontsize": 20,
            "recommender_fontcolor": '#ed008c',
            "recommender_fontweight": "bold",
            "recommender_font": "Verdana"
        },
        "timeline": {
            "title_fontsize": 20,
            "title_fontcolor": "#fff",
            "title_fontweight": "bold",
            "title_font": "Verdana",
            "title_bgcolor": "#999",
            "bg_color": "#ffffff",
            "bg_color_alt": "#F2EEEE",
            "year_color": "#CDC9C9",
            "year_color_alt": "#F0ECEC",
            "colors": ["#ed008c", "#00adef", "#BBCB5F", "#fef200"]
        },
        "connections": {
            "title_fontsize": 35,
            "title_fontcolor": "#000",
            "title_fontweight": "bold",
            "bg_color": "#000",
            "conn_fontcolor": "#fef200",
            "conn_fontsize": 140,
            "conn_fontweight": "bold",
            "conn_text_fontcolor": "#fff",
            "conn_text_fontsize": 35,
            "conn_text_fontweight": "bold"
        }
    };
	
	var skillsStyle = {
		"main": {
			"hr": {
				"style": {
					"stroke": "#e6e7e9"
				}
			},
			"style": {
				"fill": "#000",
				"stroke-width": "1px",
				"stroke": "#808080"
			}
		},
		"label": {
			"hr": {
				"style": {
					"stroke": "#fff",
					"stroke-width": 2
				}
			},
			"style": {
                "fontsize": 35,
                "fontcolor": "#fff",
                "fontweight": "bold"						
			}
		},
		"bar": {
			"label": {
				"style": {
					"font-size": "20px",
					"text-anchor": "end",
					"fill": "#fff"
				}
			},
			"yearLabel": {
				"style": {
					"font-size": "20px",
					"text-anchor": "start",
					"fill": "#fff"
				}
			},
			"style": {
				"stroke": "#222",
				"stroke-width": "1px"
			}
		},
		"axis": {
			"style": {
				"stroke": "#fff",
				"stroke-width": "6px"
			},
			"yearLabel": {
				"style": {
					"font-size": "20px",
					"fill": "#fff"
				}
			}
		}
	};
    
	var timelineTitleHeight = 35;
	var timelineTitleWidth = 155;
	var timelineTitleChamfer = 15;
	//infographic settings
	var infographicWidth = 960;
	var infographicHeight = 2000;
	//timeline settings
	var timelineWidth = infographicWidth;
	var hues = ["ed008c", "00adef", "BBCB5F", "fef200", "ed008c", "00adef", "BBCB5F", "fef200", "ed008c", "00adef", "BBCB5F", "fef200", "ed008c", "00adef", "BBCB5F", "fef200"];
	var yearInterval = 4;
	var yearWidth = 30;
	var yearIntervalWidth = 30;
	var totalIntervals = timelineWidth / yearIntervalWidth;
	//infographic settings
	var headerHeight = 160;
	var headerAndBottomDiff = 35;
	var experienceStartY = headerHeight+headerAndBottomDiff;
	var experienceTimeLineHeight = 240;
	var timeLineDifference = 60;
	var educationStartY = experienceTimeLineHeight+timeLineDifference+experienceStartY;
	var educationTimeLineHeight = 240;
	var timelineHeight = experienceTimeLineHeight + educationTimeLineHeight + timeLineDifference;
	var skillsHeight = 200;
	var skillsStartY = timelineHeight + timeLineDifference+experienceStartY;
	var groupsHeight = 300;
	var groupsStartY = skillsStartY;

	// settings for vertical timeline
	var verticalTimeLineWidth = infographicWidth;
	var verticalTimeLineStartY = experienceStartY + 30; // some offset
	var verticalTimeLineTitleHeight = 40;
	var verticalTimeLineTitleWidth = verticalTimeLineWidth / 2;
	var verticalTimeLineYearHeight = 100;
	var verticalTimeLineShadowWidth = 10;
	var verticalTimeLinePaddingTop = 50; // top padding
	var verticalTimeLineAxisRectWidth = 70;
	var verticalTimeLineAxisRectHeight = 30;
	var verticalTimeLineHeight_dynamic = 0;

	var verticalTimelineStyle;

	// settings for skills in vertical template
	var verticalSkillsMargin = 30;
	var verticalSkillHorizontalPadding = 50;
	var verticalSkillsHeight = 600 + verticalSkillsMargin * 2;
	var verticalSkillsStartY_dynamic = 0; // depends on verticalTimeLineHeight_dynamic
	var verticalSkillsLabelHeight = 80;
	var verticalSkillsVerticalAxisX = 260;
	var verticalSkillsVerticalAxisHeight = 400;
	var verticalSkillsVerticalAxisTopPadding = 40;
	var verticalSkillsMaxSkills = 5;
	var verticalSkillsMaxYears = 20;
	var verticalSkillsHues = [ "00adef", "ed008c" ];
	var verticalSkillsBarHeight = 26;

	var verticalDetailsHeight = 0;
	
	return {
		getDefaultColors: function () {
			return clone(colors);
		},
		getDefaultFonts: function () {
			return clone(fonts);
		},
		//Generates the SVG
		generate: function (timeLineShape, defColors) {
			if (!customizedColors) {
				if (defColors)
					customizedColors = clone(defColors);
				else
					customizedColors = clone(colors);
			}
			
			if (!customizedFonts)
				customizedFonts = clone(fonts);
				verticalTimelineStyle = {
				"mainLabel": {
					"style": {
						"font-family": customizedFonts[1],
						"font-size": 40,
						fill: "#000"
					}
				},
				"axis": {
					"line": {
						"style": {
							"stroke": "#000",
							"stroke-width": 5
						}
					},
					"labelRect": {
						"style": {
							fill: "#000"
						}
					},
					"labelText": {
						"style": {
							fill: "#fff",
							"font-size": "18"
						}
					}
				},
				"block": {
					"style": {
						"stroke": "none",
					},
					"shadow": {
						"style": {
							"fill": "#000",
							"opacity": "0.3",
							"stroke": "none"
						}
					},
					"label": {
						"style": {
							"font-family": customizedFonts[2],
							"fill": "#000",
							"font-size": 12,
						}
					}
				}
			};
			
			function drawHeaderDiv(id) {
				var div = createDiv('__header');
				document.getElementById(id).appendChild(div);
				
				var paper = Raphael(div, timelineWidth, headerHeight);
				
				var div = paper.rect(0, 0, timelineWidth, headerHeight+30).attr({ fill: customizedColors[2], stroke: "none" });
				var userName = paper.text(infographicWidth / 2, 50, userInfo.first_name + " " + userInfo.last_name)
						.attr({ 'font-family': customizedFonts[0], 'font-size': style.header.name.fontsize, fill: customizedColors[0], "font-weight": style.header.name.fontweight });
				var userTitle = paper.text(infographicWidth / 2, 110, trucateText(userInfo.title, 60))
						.attr({ 'font-family': customizedFonts[1], 'font-size': style.header.title.fontsize, fill: customizedColors[1], "font-weight": style.header.title.fontweight });
			}
			function drawWorkEducationDiv(id) {
				var div = createDiv('__workedu');
				document.getElementById(id).appendChild(div);
				
				var paper = Raphael(div, timelineWidth, headerHeight);
				verticalTimeLineStartY = 35;			// HACK
				// var timeLineExp = paper.viz.applyConstraintsOnTimeLine(15, jsonData.timeline_work, jsonData.counts.year_work_began, jsonData.counts.year_work_ended);
				drawVerticalTimeLine( jsonData.counts, jsonData.timeline_work, jsonData.timeline_education, paper );
				
				paper.setSize(infographicWidth, timelineHeight);
			}
			function drawSkillsDiv(id) {
				var div = createDiv('__skills');
				document.getElementById(id).appendChild(div);
				
				verticalTimeLineStartY = 35;			// HACK
				verticalTimeLineHeight_dynamic = 0;		// HACK
				skillsStartY = 170;						// HACK
				
				verticalSkillsHeight = 600 + verticalSkillsMargin * 2;
				var paper = Raphael(div, timelineWidth, verticalSkillsHeight);
				
				drawSkillsChart( jsonData.skills, paper ); 
			}
			function drawExtraDiv(id) {
				var div = createDiv('__extra');
				document.getElementById(id).appendChild(div);
				
				var verticalDetailsY = 0 // HACK;
			    verticalDetailsHeight = 500;
				
				var displayed = false;
				if (customizedSections.interests && vizData.languages && vizData.languages.length > 0) {
					var height = 0;
					height = 120 + (Math.min(vizData.languages.length, 8) * 40);
					height = Math.max(425, height);
					var paper = Raphael(div, timelineWidth, height + 25);
					drawLanguages(verticalDetailsY, jsonData.languages, paper);
                    displayed = true;
				} else if (customizedSections.recommendations && vizData.recommendations && vizData.recommendations.length>0) {
					var height = 0;
					if (vizData.recommendations.length == 1) {
						height = 300;
					} else {
						height = Math.min(vizData.recommendations.length, 3) * 120;
					}
					height = Math.max(425, height);
					var paper = Raphael(div, timelineWidth, height);
					drawRecommendation(verticalDetailsY, vizData.recommendations, paper);
                    displayed = true;
				} else if (customizedSections.languages && vizData.interests && vizData.interests.length > 0) {
					var height = 0;
					height = 120 + (Math.min(vizData.interests.length, 8) * 40);
					height = Math.max(425, height);
					var paper = Raphael(div, timelineWidth, height + 25);
					drawInterests(verticalDetailsY, vizData.interests, paper);
                    displayed = true;
				}

                if(displayed)
			        drawConnections(verticalDetailsY, jsonData.counts.connections, paper);
				else
                    verticalDetailsHeight = 0;
			}
			//clone vizData
			var jsonData = clone(vizData);
			
			timeLineType = timeLineShape;
			var userInfo = jsonData.user_info;

			drawHeaderDiv("infographic");
			drawWorkEducationDiv("infographic");
			
			if (customizedSections.skills && vizData.skills && vizData.skills.length > 0) {
				drawSkillsDiv("infographic");
			} else {
				verticalSkillsHeight = 0;
            }
			//drawExtraDiv("infographic");		
			if (customizedSections.interests && vizData.interests && vizData.interests.length > 0) {
                Viz.widgets.drawInterests("infographic", Viz.stripHidden(vizData.interests), style.interests);
            }
            if (customizedSections.languages && vizData.languages && vizData.languages.length > 0) {
                Viz.widgets.languageChart("infographic", Viz.stripHidden(vizData.languages));
            }
            if (customizedSections.awards && vizData.awards && vizData.awards.length > 0) {
		    Viz.widgets.drawAwards("infographic", Viz.stripHidden(vizData.awards), style.awards);
		    }
		    if (customizedSections.myStats && vizData.mystats && vizData.mystats.length > 0) {
		        var statStyle = {
		            'titleFont': customizedFonts[1],
		            'titleColor': 'black',
		            'textFont': customizedFonts[2],
		            'textColor': 'black',
		            'numberFont': customizedFonts[2],
		            'numberColor': customizedColors[3],
		            'iconColor': customizedColors[2]
		            //'iconFadedColor': customizedColors[3]
		        };
		        Viz.widgets.myStatChart("infographic", Viz.stripHidden(vizData.mystats), vizData.counts, statStyle);
		    }
            if (customizedSections.recommendations && vizData.recommendations && vizData.recommendations.length > 0) {
                Viz.widgets.drawRecommendations("infographic", Viz.stripHidden(vizData.recommendations));
            }
			//resizeCanvas2();
		} //Generate

	}; //Return
	
	function createDiv(id) {
		newdiv = document.createElement('div');
		newdiv.setAttribute('id',id);
		return newdiv;
	}
       
	function drawSkillsChart( skills, paper ) {
		if ( typeof skills == "undefined" || skills.length == 0 ) return;

		// calculating top Y coordinate of skills
		verticalSkillsStartY_dynamic = verticalTimeLineStartY + verticalTimeLineHeight_dynamic;

		// common variables: count of skills (max. is verticalSkillsMaxSkills which default value is 5)
		var skillsCount = ( skills.length > verticalSkillsMaxSkills ? verticalSkillsMaxSkills : skills.length );
		// height of each skill rect
		var skillHeight = Math.round( verticalSkillsVerticalAxisHeight / skillsCount );

		// calculating max year count (max. is verticalSkillsMaxYears which default value is 20)
		var fnCalculateMaxYear = function() {
			var max = 0;
			for ( var i = 0; i < skillsCount; i++ ) if ( skills[i].years > max ) max = skills[i].years;
			return max > verticalSkillsMaxYears ? verticalSkillsMaxYears : max;
		}
		// calculating middle year for horizontal axis
		var fnCalculateMiddleYear = function( maxYear ) {
			if ( maxYear < 6 ) return undefined;
			return Math.round( maxYear / 2 );
		}
		var fnGetBarLabelText = function( years ) {
			if ( years == 1 ) return "1 year";
			else return years + " years";
		}

		var sy = verticalSkillsStartY_dynamic;
		var margin = verticalSkillsMargin;

		var inner_sx = margin + verticalSkillHorizontalPadding;
		var inner_width = infographicWidth - inner_sx * 2;
		var inner_sy = sy + margin;
		var inner_height = verticalSkillsHeight - margin * 2;

		var maxYear = fnCalculateMaxYear();
		var middleYear = fnCalculateMiddleYear( maxYear );
		// max width of bar (width of chart)
		var barsWidth = inner_sx + inner_width - verticalSkillsVerticalAxisX;

		var fnDrawLabel = function() {
			paper.path( "M" + inner_sx + " " + ( inner_sy + verticalSkillsLabelHeight + skillsStartY -200) + " H" + ( inner_sx + inner_width ) ).attr(
				skillsStyle.label.hr.style
			);
            paper.text( inner_sx + inner_width / 2, inner_sy + skillsStartY -200 + verticalSkillsLabelHeight / 2, "SKILLS" ).attr({ 'font-family': customizedFonts[1], 'font-size': skillsStyle.label.style.fontsize, fill: skillsStyle.label.style.fontcolor, "font-weight": skillsStyle.label.style.fontweight });
                   
//			paper.text( inner_sx + inner_width / 2, inner_sy + skillsStartY -200 + verticalSkillsLabelHeight / 2, "SKILLS" ).attr({
//				skillsStyle.label.style,'font-family': customizedFonts[1]
//            });
		}

		// calculating geometry of each bar
		var fnCalculateSkillsGeometry = function() {
			var yearWidth = barsWidth / maxYear;
			for ( var i = 0; i < skillsCount; i++ ) {
				skills[i].labelX = verticalSkillsVerticalAxisX - 20;
				skills[i].y = inner_sy + verticalSkillsLabelHeight + verticalSkillsVerticalAxisTopPadding + ( skillHeight * i + skillHeight / 2 );
				skills[i].fill = getHue[ i % 2 ];
				skills[i].width = yearWidth * ( skills[i].years > verticalSkillsMaxYears ? verticalSkillsMaxYears : skills[i].years );
			}
		}
	
		function getHue(paletteId) {
			return customizedColors[(paletteId%(customizedColors.length))+3];
		}
		
		function getHueIndex(colour) {
			return customizedColors.indexOf(colour);
		}
		
		// main function
		var fnDrawChart = function() {
			// first - drawing a bars
			for ( var i = 0; i < skills.length && i < verticalSkillsMaxSkills; i++ ) {
				var title = skills[i].name;

				var skillT=paper.text( skills[i].labelX, skills[i].y + skillsStartY -200, title ).attr(
					skillsStyle.bar.label.style
				);
                drawTooltip(skillT.node, getSkillsTooltip(skills[i]));  
					var xpos=0;
					if (skills[i].proficiency=="Beginner"){var stars=1;}
					if (skills[i].proficiency=="Intermediate"){var stars=2;}
					if (skills[i].proficiency=="Advanced"){var stars=3;}
					if (skills[i].proficiency=="Expert"){var stars=4; }
					
				for (s=0;s<stars;s++){
				paper.g.star(skills[i].labelX-10+xpos,skills[i].y+25 + skillsStartY -200,12.5,5,5).attr({fill: customizedColors[1], stroke: "none"});	
				xpos=xpos-30;
				}
				var skillR=paper.rect( verticalSkillsVerticalAxisX, skills[i].y + skillsStartY -200  - verticalSkillsBarHeight / 2, skills[i].width, verticalSkillsBarHeight ).attr(
					skillsStyle.bar.style
				).attr({
					"fill": skills[i].fill=getHue(getHueIndex(skills[i].fill)+1)
				});
                drawTooltip(skillR.node, getSkillsTooltip(skills[i]));         
			}

			// vertical axis
			paper.path( "M" + verticalSkillsVerticalAxisX + " " + (inner_sy + skillsStartY -200 + verticalSkillsLabelHeight + verticalSkillsVerticalAxisTopPadding) + " V" + (inner_sy + verticalSkillsLabelHeight + skillsStartY -200 + verticalSkillsVerticalAxisTopPadding + verticalSkillsVerticalAxisHeight + 3) ).attr(
				skillsStyle.axis.style
			);
			// horizontal axis
			paper.path( "M" + verticalSkillsVerticalAxisX + " " + (inner_sy + skillsStartY -200 + verticalSkillsLabelHeight + verticalSkillsVerticalAxisTopPadding + verticalSkillsVerticalAxisHeight) + " H" + (inner_sx + inner_width) ).attr(
				skillsStyle.axis.style
			);

			// drawing labels for horizontal axis
			var horizontalLabelY = inner_sy + verticalSkillsLabelHeight + verticalSkillsVerticalAxisTopPadding + verticalSkillsVerticalAxisHeight + 20;
			paper.text( verticalSkillsVerticalAxisX,skillsStartY -200 + horizontalLabelY, "0 years" ).attr({
				"text-anchor": "start"
			}).attr(
				skillsStyle.axis.yearLabel.style
			);
			paper.text( inner_sx + inner_width, skillsStartY -200 + horizontalLabelY, maxYear + " years" ).attr({
				"text-anchor": "end"
			}).attr(
				skillsStyle.axis.yearLabel.style
			);
			if ( typeof middleYear != "undefined" ) {
				// drawing middleYear label
				paper.text( verticalSkillsVerticalAxisX + (barsWidth / maxYear * middleYear),skillsStartY -200 + horizontalLabelY, middleYear + " years" ).attr({
					"text-anchor": "middle"
				}).attr(
					skillsStyle.axis.yearLabel.style
				);
			}
		}

		// Drawing skills block
		paper.path( "M" + margin + " " + (sy + verticalSkillsHeight + skillsStartY -200) + "H" + (infographicWidth - margin) ).attr(
			skillsStyle.main.hr.style
		);
		var skillRect= paper.rect( 0 + margin, sy + margin + skillsStartY - 200, infographicWidth - margin * 2, verticalSkillsHeight - margin * 2 ).attr(
			skillsStyle.main.style
		);
        
		// Drawing chart
		fnCalculateSkillsGeometry();
		fnDrawLabel();
		fnDrawChart();
	}

			
    
	// Created by adk
	// Vertical timeline creation

	function drawVerticalTimeLine( counts, timeLineExp, timeLineEdu, paper ) {
		// calculations
		// TODO: check for timeline data existance
		var timeLineExpExists = false, timeLineEduExists = false;
		if ( typeof timeLineExp != "undefined" && timeLineExp.length > 0 ) timeLineExpExists = true;
		if ( typeof timeLineEdu != "undefined" && timeLineEdu.length > 0 ) timeLineEduExists = true;

		// both timelines not exists
		if ( !timeLineExpExists && !timeLineEduExists ) {
			return;
		}
		var firstYear = Math.min(counts.year_education_began, counts.year_work_began);
		var lastYear = Math.max(counts.year_education_ended, counts.year_work_ended);

		////
	   // alert("First Year:" + firstYear + " LastYear:" + lastYear);
		///////
		var yearCount = (lastYear - firstYear) + 1;

		// this function draws timeline label (EDUCATION or EMPLOYMENT)
		var fnDrawVerticalTimeLineLabel = function( x, y, text ) {
			var eduLabelText = paper.text( x, y, text ).attr(
				verticalTimelineStyle.mainLabel.style
			);
		}

		// draws vertical axis with year labels
		var fnDrawAxis = function() {
			// setting up new timeline height
			var axisHeight = verticalTimeLinePaddingTop + verticalTimeLineYearHeight * yearCount;
			timelineHeight = axisHeight + 50 + verticalTimeLinePaddingTop;

			paper.path( "M" + verticalTimeLineWidth/2 + " " + verticalTimeLineStartY + "V" + (verticalTimeLineStartY + axisHeight) ).attr(
				verticalTimelineStyle.axis.line.style
			);

			var sx = verticalTimeLineWidth/2;
			var sy = verticalTimeLineStartY + verticalTimeLinePaddingTop;
			var yh = verticalTimeLineYearHeight;
			for( var i = 0; i < yearCount; i++ ) {
				paper.rect( sx - verticalTimeLineAxisRectWidth/2, sy + yh * (i+1) - verticalTimeLineAxisRectHeight/2, verticalTimeLineAxisRectWidth, verticalTimeLineAxisRectHeight ).attr(
					verticalTimelineStyle.axis.labelRect.style
				);
				paper.text( sx, sy + yh * (i+1), lastYear - i ).attr(
					verticalTimelineStyle.axis.labelText.style
				);
				
				skillsStartY = sy + yh * (i+1);
			}
		}

		// calculating range for each period
		var fnCalculateRange = function( timeline ) {
			for (var i = 0; i < timeline.length; i++) {
				var start = getDateFromString( timeline[i].start_date );
				var end = getDateFromString( timeline[i].end_date );
				timeline[i].range = (end.getTime() - start.getTime()) / 86400000; //convert from ms to days
				if ( timeline[i].range < 30 )
					timeline[i].range = 30;
			}
		}

		// calculating blocks width
		var fnSetBlocksWidth = function( timeLine ) {
			var experienceWidth = 100;
			var experienceWidthInc = 100;
			var maxBlockWidth = 100;
			var currentStart, currentEnd, previousStart, previousEnd;
			timeLine.sort(sortByRange);
			var maxOverlaps = 0;
			//Preprocess to figure out max overlaps
			for (var i = 0; i < timeLine.length; i++) {
				var overlap = 0;
				timeLine[i].width = experienceWidth;
				currentStart = getDateFromString( timeLine[i].start_date ).getTime();
				currentEnd = getDateFromString( timeLine[i].end_date ).getTime();
				for ( var j = 0; j < i; j++ ) {
					previousStart = getDateFromString( timeLine[j].start_date ).getTime();
					previousEnd = getDateFromString( timeLine[j].end_date ).getTime();
					if ( (previousStart > currentStart && previousStart < currentEnd) || (previousEnd > currentStart && previousEnd < currentEnd) ||
						(previousStart == currentStart && previousEnd == currentEnd) ) {
						// Only increment if needed
						if ( timeLine[i].width == timeLine[j].width ) {
							overlap++;
						}
					}
				}
				
				if ( overlap > maxOverlaps)
					maxOverlaps = overlap;
			}
			
			if(maxOverlaps > 10)
				experienceWidthInc = 30;
			else if (maxOverlaps > 6)
				experienceWidthInc = 50;
			else if(maxOverlaps > 3)
				experienceWidthInc = 70;
							
			//now figure out the width
			for (var i = 0; i < timeLine.length; i++) {
				var overlap = 0;
				timeLine[i].width = experienceWidth;
				currentStart = getDateFromString( timeLine[i].start_date ).getTime();
				currentEnd = getDateFromString( timeLine[i].end_date ).getTime();
				for ( var j = 0; j < i; j++ ) {
					previousStart = getDateFromString( timeLine[j].start_date ).getTime();
					previousEnd = getDateFromString( timeLine[j].end_date ).getTime();
					if ( (previousStart > currentStart && previousStart < currentEnd) || (previousEnd > currentStart && previousEnd < currentEnd) ||
						(previousStart == currentStart && previousEnd == currentEnd) ) {
						// Only increment if needed
						if ( timeLine[i].width == timeLine[j].width ) {
							timeLine[i].width = timeLine[i].width + experienceWidthInc;
							if (timeLine[i].width > maxBlockWidth)
								maxBlockWidth = timeLine[i].width;
						}
					}
				}
			}
			return maxBlockWidth;
		}

		// calculating block x, y, width, height, fill, shadow geometry
		// reverse is used for education timeline
		var fnCalculateBlocksGeometry = function( timeLine, reverse ) {
			// checks that whatLayer hovers inLayer
			var fnCheckLayerHoversLayer = function( whatLayer, inLayer ) {
				if ( whatLayer.width > inLayer.width ) return false;
				if ( (whatLayer.y + whatLayer.height) > inLayer.y && whatLayer.y < (inLayer.y + inLayer.height) )
					return true;
				return false;
			}
			// calculating interception of two ranges
			// one, two - is a ranges like [0, 100] and [50, 150]
			var fnCalculateInterception = function( one, two ) {
				var out = [];
				out[0] = (one[0] > two[0] ? one[0] : two[0]);
				out[1] = (one[1] < two[1] ? one[1] : two[1]);
				return out;
			}
			// calculating union of two ranges
			// if ranges interception is none then return value will be array of passed arguments
			var fnCalculateUnion = function( one, two ) {
				var out = [];



				if ( one[1] >= two[0] || two[1] >= one[0] ) {
				    out[0] = (one[0] <= two[0] ? one[0] : two[0]);
				    out[1] = (one[1] >= two[1] ? one[1] : two[1]);
				}
				return out;
			}
			// calculating vertical shadow for whatLayer block
			var fnCalculateVerticalShadow = function( whatLayer, inLayer ) {
				var whatBounds = [ whatLayer.y, whatLayer.y + whatLayer.height ];
				var inBounds = [ inLayer.y, inLayer.y + inLayer.height ];
				out = fnCalculateInterception( whatBounds, inBounds );
				out[0] -= whatLayer.y;
				out[1] -= whatLayer.y;
				if ( out[0] == 0 ) out[0] += verticalTimeLineShadowWidth;

				
				if ( whatLayer.shadow.vertical.length > 0 ) {
					for ( var i = 0; i < whatLayer.shadow.vertical.length; i++ ) {
				        var union = fnCalculateUnion( whatLayer.shadow.vertical[i], out );
				    }
					return [union];
				}
				else
					return [out];
			}
			// calculating horizontal shadow for whatLayer block
			var fnCalculateHorizontalShadow = function( whatLayer, inLayer ) {
				if ( (whatLayer.y + whatLayer.height) < (inLayer.y + inLayer.height) ) {
					return [ [0, whatLayer.width + verticalTimeLineShadowWidth] ];
				} else
					return whatLayer.shadow.horizontal;
			}
			// calculating horizontal shadow height
			var fnCalculateHorizontalShadowHeight = function( whatLayer, inLayer ) {
			    var tmp = (inLayer.y + inLayer.height) - (whatLayer.y + whatLayer.height);
				if ( tmp > 0 && tmp < verticalTimeLineShadowWidth ) {
				    return tmp;
				}
				else return verticalTimeLineShadowWidth;
			}
			// horizontal shadow fix for layers, that have same width
			var fnFixHorizontalShadow = function( whatLayer, inLayer ) {
				if ( false && whatLayer.y + whatLayer.height > inLayer.y - verticalTimeLineShadowWidth ) {
					return [];
				} else
					return whatLayer.shadow.horizontal;
			}
			function getHue(paletteId) {
				return customizedColors[(paletteId%(customizedColors.length-4))+4];
			}
			function getHueIndex(colour) {
				return customizedColors.indexOf(colour) - 3;
			}

			var dayHeight = verticalTimeLineYearHeight / 365;
			timeLine.sort(sortByRange).reverse();
			var timelineStartDate = new Date(firstYear,1,1); 
			var timelineEndDate = new Date(lastYear, 12, 31);
			
			var sx = verticalTimeLineWidth/2; // X of timeline axis
			var sy = verticalTimeLineStartY + verticalTimeLinePaddingTop;
			var shw = verticalTimeLineShadowWidth;
			for ( var i = 0; i < timeLine.length; i++ ) {
				var thisStartDate = getDateFromString( timeLine[i].start_date );
				var thisEndDate = getDateFromString( timeLine[i].end_date );
				thisStartY = Math.floor( sy + ( (timelineEndDate.getTime() - thisEndDate.getTime()) / 86400000 ) * dayHeight );
				thisHeight =  Math.floor( (timeLine[i].range / 365) * verticalTimeLineYearHeight );
				thisWidth = timeLine[i].width; // hint
				timeLine[i].height = thisHeight;
				timeLine[i].center = thisStartY + (thisHeight / 2);
				timeLine[i].x = sx;
				timeLine[i].y = thisStartY;
				timeLine[i].fill = getHue(i);
				timeLine[i].shadow = {
					"hasShadow": false,
					"vertical": [],
					"horizontal": [],
					"horizontalHeight": verticalTimeLineShadowWidth
				};

				if ( reverse ) {
					// education timeline
					timeLine[i].x = sx - timeLine[i].width;
				}
			}
			
			for ( var i = 0; i < timeLine.length; i++ ) {
				for ( var j = 0; j < timeLine.length; j++ ) {
					if ( i != j && fnCheckLayerHoversLayer( timeLine[i], timeLine[j] ) && timeLine[i].fill == timeLine[j].fill ) {
						// one layer hovers second layer and both have same fill - need to change it
						timeLine[i].fill = getHue(getHueIndex(timeLine[i].fill)+1); // TODO: now choosing next index of hues array
					}
					if ( i != j && fnCheckLayerHoversLayer( timeLine[i], timeLine[j] ) ) {
						timeLine[i].shadow.hasShadow = true;
						timeLine[i].shadow.vertical = fnCalculateVerticalShadow( timeLine[i], timeLine[j] );
						timeLine[i].shadow.horizontal = fnCalculateHorizontalShadow( timeLine[i], timeLine[j] );
						timeLine[i].shadow.horizontalHeight = fnCalculateHorizontalShadowHeight( timeLine[i], timeLine[j] );
					}
					if ( i != j && timeLine[i].width == timeLine[j].width ) {
						timeLine[i].shadow.horizontal = fnFixHorizontalShadow( timeLine[i], timeLine[j] )
					}
				}
			}
		}
		var fnCalculateLabelsPosition = function( timeLine ) {
			timeLine.sort( sortByRange ).reverse();
			var labelHeight = new Number( verticalTimelineStyle.block.label.style['font-size'] ) * 2 + 6; // getting approx. height of text label
			for ( var i = 0; i < timeLine.length; i++ )
				timeLine[i].labelY = timeLine[i].center;

			for ( var i = 0; i < timeLine.length; i++ ) {
				for ( var j = 0; j < timeLine.length; j++ ) {
					if ( i != j && Math.abs( timeLine[i].labelY - timeLine[j].labelY ) < labelHeight ) {
						var labelShift = Math.ceil((labelHeight - Math.abs(timeLine[i].labelY - timeLine[j].labelY)) / 2);
						if (timeLine[i].labelY > timeLine[j].labelY) {
							timeLine[i].labelY += labelShift;
							timeLine[j].labelY -= labelShift;
						} else {
							timeLine[i].labelY -= labelShift;
							timeLine[j].labelY += labelShift;
						}
					}
				}
			}
		}
		// timeline array multisorting: 1st by width, second by end date
		/*var fnSortTimelineBeforeDraw = function( timeline ) {
			var fnSortByWidth = function(a, b) { a.width - b.width };
			var fnSortByEnd = function(a, b) { return new Date(a.end_date).getTime() - new Date(b.end_date).getTime(); };
			timeline.sort( fnSortByWidth );
			var widthGroups = new Array();
			var currentWidth = timeline[0].width;
			for ( var i = 0, j = 0; i < timeline.length; i++ ) {
				if ( currentWidth != timeline[i].width ) {
					j++;
					currentWidth = timeline[i].width;
				}
				if ( typeof widthGroups[j] == "undefined" ) widthGroups[j] = Array();
				widthGroups[j][ widthGroups[j].length ] = timeline[i];
			}
			var newTimeline = new Array();
			for ( var i = 0; i < widthGroups.length; i++ ) widthGroups[i].sort( fnSortByEnd ).reverse();
			for ( var i = 0; i < widthGroups.length; i++ ) {
				for ( var j = 0; j < widthGroups[i].length; j++ ) {
					newTimeline[ newTimeline.length ] = widthGroups[i][j];
				}
			}
			return newTimeline;
		}*/
		var fnSortByWidthAndEnd = function(a, b) {
			return (a.width * new Date(a.end_date).getTime() - b.width * new Date(b.end_date).getTime());
		}
		
		// label for education
		fnDrawVerticalTimeLineLabel( verticalTimeLineTitleWidth/2, verticalTimeLineStartY + verticalTimeLineTitleHeight/2, "EDUCATION" );
		// label for experience
		fnDrawVerticalTimeLineLabel( verticalTimeLineTitleWidth/2 + verticalTimeLineTitleWidth, verticalTimeLineStartY + verticalTimeLineTitleHeight/2, "EMPLOYMENT" );

		// now drawing experience timeline:

		if ( timeLineExpExists ) {
			fnCalculateRange( timeLineExp );
			var maxExpBlockWidth = fnSetBlocksWidth( timeLineExp );
			fnCalculateBlocksGeometry( timeLineExp, false );
			fnCalculateLabelsPosition( timeLineExp );
			fnCalculateLabelsPosition( timeLineExp );	// Two passes

			timeLineExp.sort(fnSortByWidthAndEnd).reverse();

			for (var i = 0; i < timeLineExp.length; i++) {
				var experienceItem = paper.rect( timeLineExp[i].x, timeLineExp[i].y, timeLineExp[i].width, timeLineExp[i].height ).attr(
					verticalTimelineStyle.block.style
				).attr({
					fill: timeLineExp[i].fill
				});

                 //tooltip
                var tipText = getExperienceToolTip(timeLineExp[i]);
                drawTooltip(experienceItem.node, tipText);
				if ( timeLineExp[i].shadow.hasShadow ) {
					for ( var vs = 0; vs < timeLineExp[i].shadow.vertical.length; vs++ ) {
						var x = timeLineExp[i].x + timeLineExp[i].width,
							y = timeLineExp[i].y + timeLineExp[i].shadow.vertical[vs][0],
							width = verticalTimeLineShadowWidth, 
							//height = timeLineExp[i].shadow.vertical[vs][1] - timeLineExp[i].shadow.vertical[vs][0] + verticalTimeLineShadowWidth
							height = timeLineExp[i].shadow.vertical[vs][1] - timeLineExp[i].shadow.vertical[vs][0]
						paper.rect( x, y, width, height ).attr(verticalTimelineStyle.block.shadow.style);
					}

					for ( var hs = 0; hs < timeLineExp[i].shadow.horizontal.length; hs++ ) {
						paper.rect( timeLineExp[i].x + timeLineExp[i].shadow.horizontal[hs][0], timeLineExp[i].y + timeLineExp[i].height, timeLineExp[i].shadow.horizontal[hs][1], timeLineExp[i].shadow.horizontalHeight ).attr(
							verticalTimelineStyle.block.shadow.style
						);
					}
				}
			}
			for (var i = 0; i < timeLineExp.length; i++) {
				timeLineExp[i].label = (timeLineExp[i].position || "") + "\n" + (timeLineExp[i].company || "");
				var label = paper.text( timeLineExp[i].x + timeLineExp[i].width - 50, timeLineExp[i].labelY, timeLineExp[i].label ).attr(
					verticalTimelineStyle.block.label.style
				).attr({
					"text-anchor": "start"
				});
                 //tooltip                
                var tipText = getExperienceToolTip(timeLineExp[i]);
                drawTooltip(label.node, tipText);
				
			}
		}

		// now drawing education timeline

		if ( timeLineEduExists ) {

			fnCalculateRange( timeLineEdu );
			var maxEduBlockWidth = fnSetBlocksWidth( timeLineEdu );
			fnCalculateBlocksGeometry( timeLineEdu, true );
			fnCalculateLabelsPosition( timeLineEdu );
			fnCalculateLabelsPosition( timeLineEdu );	// Two passes

			timeLineEdu.sort(fnSortByWidthAndEnd).reverse();

			for (var i = 0; i < timeLineEdu.length; i++) {
				var eduItem = paper.rect( timeLineEdu[i].x, timeLineEdu[i].y, timeLineEdu[i].width, timeLineEdu[i].height ).attr(
					verticalTimelineStyle.block.style
				).attr({
					fill: timeLineEdu[i].fill
				});
                 //tooltip                
                var tipText = getEducationToolTip(timeLineEdu[i]);
                drawTooltip(eduItem.node, tipText);

				if ( timeLineEdu[i].shadow.hasShadow ) {
					for ( var vs = 0; vs < timeLineEdu[i].shadow.vertical.length; vs++ ) {
						
						var x = timeLineEdu[i].x - verticalTimeLineShadowWidth,
							y = timeLineEdu[i].y + timeLineEdu[i].shadow.vertical[vs][0],
							width = verticalTimeLineShadowWidth,
							height = timeLineEdu[i].shadow.vertical[vs][1] - timeLineEdu[i].shadow.vertical[vs][0]
							paper.rect( x, y, width, height ).attr(verticalTimelineStyle.block.shadow.style);
					}

					for ( var hs = 0; hs < timeLineEdu[i].shadow.horizontal.length; hs++ ) {
						var x = timeLineEdu[i].x + timeLineEdu[i].shadow.horizontal[hs][0] - verticalTimeLineShadowWidth,
							y = timeLineEdu[i].y + timeLineEdu[i].height,
							width = timeLineEdu[i].shadow.horizontal[hs][1],

							height = timeLineEdu[i].shadow.horizontalHeight;
						paper.rect( x, y, width, height ).attr(verticalTimelineStyle.block.shadow.style);
					}
				}
			}
			for (var i = 0; i < timeLineEdu.length; i++) {
				timeLineEdu[i].label = (timeLineEdu[i].degree || "") + "\n" + (timeLineEdu[i].school || "");
				var eduLabel=paper.text( timeLineEdu[i].x + timeLineEdu[i].width - 50, timeLineEdu[i].labelY, timeLineEdu[i].label ).attr(
					verticalTimelineStyle.block.label.style
				).attr({
					"text-anchor": "end"
				});
                 //tooltip                
                var tipText = getEducationToolTip(timeLineEdu[i]);
                drawTooltip(eduLabel.node, tipText);
			}
		}

		fnDrawAxis();
	}

    function drawInterests(startY, interests, paper) {
        var text = paper.text(275, startY + 50, "INTERESTS");
        text.attr({ 'font-family': customizedFonts[1], 'font-size': style.languages.title_fontsize, fill: "#000", "font-weight": style.languages.title_fontweight });
        if (interests && interests.length > 0) {
            var yPositionText = startY + 120;
            for (var i = 0; i < Math.min(interests.length, 8); i++) {
                var textLanguage = paper.text(275, yPositionText, interests[i].name)
					.attr({ 'font-size': style.languages.lang_fontsize, fill: style.languages.lang_fontcolor, 'font-family': customizedFonts[2] });
                yPositionText += 40;
            }
        }
    }
    function drawLanguages(startY, data, paper) {
        var text = paper.text(275, startY + 50, "LANGUAGES");
        text.attr({ 'font-family': customizedFonts[1], 'font-size': style.languages.title_fontsize, fill: "#000", "font-weight": style.languages.title_fontweight });
        var yPositionText = startY + 120;
        for (var i = 0; i < Math.min(data.length, 8); i++) {
            var textLanguage = paper.text(275, yPositionText, data[i].name)
				.attr({ 'font-size': style.languages.lang_fontsize, fill: style.languages.lang_fontcolor, 'font-family': customizedFonts[2] });
            yPositionText += 40;
        }
    }
    function drawConnections(startY, connections, paper) {
        var textNoOfConn = connections;
        var fontSize = style.connections.conn_fontsize;

        if (textNoOfConn == 500) {
            textNoOfConn = textNoOfConn + "+";
            fontSize = fontSize - 30;
        }
        var title = paper.text(infographicWidth - 200, startY + 50, "LINKEDIN")
                    .attr({ 'font-family': customizedFonts[1], 'font-size': style.connections.title_fontsize, fill: "#000", "font-weight": style.connections.title_fontweight });
        var circ = paper.circle(infographicWidth - 200, startY + 250, 160)
					.attr({ fill: customizedColors[2], stroke: 'none' });
        var text = paper.text(infographicWidth - 200,startY + 225, textNoOfConn)
                    .attr({ 'font-size': fontSize, fill: customizedColors[1], "font-weight": style.connections.conn_fontweight });
        var textConn = paper.text(infographicWidth - 200, startY + 305, "Connections")
						.attr({ 'font-family': customizedFonts[1], 'font-size': style.connections.conn_text_fontsize, fill: 'white', "font-weight": style.connections.conn_text_fontweight });
    }

    function drawRecommendation(groupsStartY, recomm, paper) {
        var text = paper.text(275, groupsStartY + 50, "RECOMMENDATIONS");
        text.attr({ 'font-family': customizedFonts[1], 'font-size': style.recomm.title_fontsize, fill: style.recomm.title_fontcolor, "font-weight": style.recomm.title_fontweight });
        var recommendations = clone(recomm); // $.extend(true, {}, recomm);
        var totalRecommendationsToDisplay = recommendations.length > 3 ? 3 : recommendations.length;
        var yPositionBlock = (groupsStartY + 100);
        var yPositionText = (groupsStartY + 120);
        var blockHeight = 50;
       var textLength = 105;
        var lineLength = 50;
        var maxLines = 2;
        if (recommendations.length == 1) {
            blockHeight = 300;
            yPositionText += 130;
            textLength = 500;
            maxLines = 12;
        }

        for (var i = 0; i < totalRecommendationsToDisplay; i++) {          

            var bubble = paper.path("M 50 " + yPositionBlock + " l 450 0 l 0 " + blockHeight + " l -420 0 l 5 20 l -20 -20 l -15 0 l 0 -" + blockHeight + " z")
                .attr({ fill: customizedColors[3], stroke: customizedColors[3], 'stroke-width': 20, 'stroke-linejoin': 'round' });
            
            drawTooltip(bubble.node, recommendations[i].content.recommendationText);
            var displayText = getWrappedText(clone(recommendations[i].content.recommendationText), textLength, lineLength, maxLines);

            var textRecomm = paper.text(275, yPositionText, displayText)
            .attr({ 'font-size': style.recomm.rec_fontsize, fill: style.recomm.rec_fontcolor, 'font': style.recomm.rec_font });
            drawTooltip(textRecomm.node, recommendations[i].content.recommendationText);
            var textRecommender = paper.text(120, yPositionBlock + blockHeight + 40, recommendations[i].content.recommender.firstName)
            .attr({ 'font-size': style.recomm.recommender_fontsize, fill: customizedColors[2], "font-weight": style.recomm.recommender_fontweight, 'font': style.recomm.recommender_font });
            yPositionText += 120;
            yPositionBlock += 120;
        }

    }
	
	function resizeCanvas2() {
		paper.setSize(infographicWidth, timelineHeight + timeLineDifference +100 + verticalSkillsHeight + verticalDetailsHeight);
	}
	
})();                                                                    //NameSpace


