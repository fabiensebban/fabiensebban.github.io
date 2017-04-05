
//Template 2:Chris - Circle
var temp2 = (function () {
	var colors =  ["#ED008C", "#CCC", "#0a0a0a", "#BBB", "#333", "#999", "#DDD"];
    return {
        getDefaultColors: function () {
            return colors;
        },
        getDefaultFonts: function () {
            return temp1.getDefaultFonts();
        },
        generate: function () {
            temp1.generate("c", colors);
        }
    };

}());           

//Template 3:Chris - Triangle
var temp3 = (function () {
    var colors =  ["#ED008C", "#CCC", "#0a0a0a", "#BBB", "#333", "#999", "#DDD"];
    return {
        getDefaultColors: function () {
            return colors;
        },
        getDefaultFonts: function () {
            return temp1.getDefaultFonts();
        },
        generate: function () {
            temp1.generate("t", colors);
        }
    };

}());


//Template 1:Chris - Square
var temp1 = (function () {

    //var colors = ["#fef200", "#fff", "#000", "#ed008c", "#00adef", "#BBCB5F", "#fef200"];
	var colors =  ["#ED008C", "#CCC", "#0a0a0a", "#BBB", "#333", "#999", "#DDD"];

    var fonts = ["cooper-black-std", "proxima-nova", "ff-netto-web"];

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
                "fontsize": 24,
                "fontweight": "bold",
                "fontcolor": colors[1]
            },
            "summary": {
                "fontsize": 16
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
    var timelineTitleHeight = 35;
    var timelineTitleWidth = 155;
    var timelineTitleChamfer = 15;
    //infographic settings
    var infographicWidth = 960;
    var infographicHeight = 1550;
    //timeline settings
    var timelineWidth = infographicWidth;
    var yearInterval = 4;
    var yearWidth = 30;
    var yearIntervalWidth = 30;
    var totalIntervals = timelineWidth / yearIntervalWidth;
    //infographic settings
    var headerHeight = 160;
    var headerAndBottomDiff = 35;
    var experienceStartY = headerHeight + headerAndBottomDiff;
    var experienceTimeLineHeight = 240;
    var timeLineDifference = 60;
    var educationStartY = experienceTimeLineHeight + timeLineDifference + experienceStartY;
    var educationTimeLineHeight = 240;
    var timelineHeight = experienceTimeLineHeight + educationTimeLineHeight + timeLineDifference;
    var skillsHeight = 200;
    var skillsStartY = timelineHeight + timeLineDifference + experienceStartY;
    var groupsHeight = 400;
    var groupsStartY = skillsStartY + skillsHeight + timeLineDifference;
    var timeLineType = "s";
    var yearLimit = 19;
    return {
        getDefaultColors: function () {
            return clone(colors);
        },
        getDefaultFonts: function () {
            return clone(fonts);
        },
        //Generates the SVG
        generate: function (timeLineShape, defColors) {

            function drawWorkEduDiv(id) {
                var div = createDiv('__workedu');
                div.style.marginBottom = "16px";
                document.getElementById(id).appendChild(div);

                if (vizData.timeline_work && vizData.timeline_work.length > 0) {

                    var workTextDiv = createDiv('__workText');
                    div.appendChild(workTextDiv);
                    var paper = new Raphael(workTextDiv, infographicWidth, 90);
                    drawTimeLineLabel("EXPERIENCE", paper, 50, 0);

                    var workDiv = createDiv('__work');
                    div.appendChild(workDiv);

                    var paper = new Raphael(workDiv, timelineWidth, experienceTimeLineHeight + 50);
                    drawExperienceTimeLine(vizData.timeline_work, paper);
                }

                if (vizData.timeline_education && vizData.timeline_education.length > 0) {
                    var timeLineEducation = Raphael.fn.viz.applyConstraintsOnTimeLine(yearLimit, vizData.timeline_education, vizData.counts.year_education_began, vizData.counts.year_education_ended);
                    if (timeLineEducation && timeLineEducation.length > 0) {
                        var eduTextDiv = createDiv('__eduText');
                        div.appendChild(eduTextDiv);
                        var paper = new Raphael(eduTextDiv, infographicWidth, 90);
                        drawTimeLineLabel("EDUCATION", paper, 50, 0);

                        var eduDiv = createDiv('__edu');
                        div.appendChild(eduDiv);

                        var paper = new Raphael(eduDiv, timelineWidth, educationTimeLineHeight + 50);
                        drawEducationTimeLine(timeLineEducation, paper);
                    }
                }
            }
            function drawSkillsDiv(id) {
                var div = createDiv('__skills');
                document.getElementById(id).appendChild(div);


                if (customizedSections.skills && vizData.skills && vizData.skills.length > 0) {
                    var paper = new Raphael(div, timelineWidth, skillsHeight + timeLineDifference + 25);
                    skillsStartY = 25; // HACK
                    //groupsStartY = skillsStartY + skillsHeight + timeLineDifference;
                    groupsStartY = 25; // HACK

                    var text = paper.text(infographicWidth / 2, (skillsStartY + 20), "SKILLS")
							.attr({ 'font-family': customizedFonts[1], 'font-size': style.skills.title_fontsize, fill: style.skills.title_fontcolor, "font-weight": style.skills.title_fontweight });
                    if (vizData.skills) { drawSkills(vizData.skills, paper); }
                }
            }

            if (!customizedColors) {
                if (defColors) {
                    customizedColors = clone(defColors);
                } else {
                    customizedColors = clone(colors);
				}
            }
            if (!customizedFonts) {
                customizedFonts = clone(fonts);
			}
            //if(timeLineShape)
            timeLineType = timeLineShape;

            var userInfo = vizData.user_info;
            var userWeb = vizData.urls;

            //drawHeaderDiv("infographic");
            Viz.widgets.header("infographic", userInfo, style.header);
            drawWorkEduDiv("infographic");
            //drawSkillsDiv("infographic");

            if (customizedSections.skills && vizData.skills && vizData.skills.length > 0) {
                var skillStyle = {
                    'titleStyle': {'fill': customizedColors[0], 'font-family': customizedFonts[0]},
                    'textStyle': {'fill': customizedColors[1], 'font-family': customizedFonts[2]},
					'nameStyle': {'fill': customizedColors[1], 'font-family': customizedFonts[1]},
                    //'circleStyle':{'fill': customizedColors[2]},
                    'backgroundStyle': {'fill': customizedColors[2]}
                };
                Viz.widgets.skillChart("infographic", vizData.skills, skillStyle);
            }
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

        } //Generate

    }; //Return

    function createDiv(id) {
        newdiv = document.createElement('div');
        newdiv.setAttribute('id', id);
        return newdiv;
    }

    function drawInterests(groupsStartY, interests, paper) {
        var text = paper.text(275, groupsStartY + 50, "INTERESTS");
        text.attr({ 'font-family': customizedFonts[1], 'font-size': style.languages.title_fontsize, fill: style.languages.title_fontcolor, "font-weight": style.languages.title_fontweight });
        if (interests && interests.length > 0) {
            var yPositionText = (groupsStartY + 120);
			var i;
            for (i = 0; i < interests.length && i < 8; i++) {
                var textLanguage = paper.text(275, yPositionText, interests[i].name)
					.attr({ 'font-size': style.interests.int_fontsize, fill: style.languages.lang_fontcolor, 'font-family': customizedFonts[1] });
                yPositionText += 40;
            }
        }
    }
    function drawLanguages(groupsStartY, languages, paper) {
        var text = paper.text(275, groupsStartY + 50, "LANGUAGES");
        text.attr({ 'font-family': customizedFonts[1], 'font-size': style.languages.title_fontsize, fill: style.languages.title_fontcolor, "font-weight": style.languages.title_fontweight });
        var yPositionText = (groupsStartY + 120);
		var i;
        for (i = 0; i < languages.length && i < 8; i++) {
            var textLanguage = paper.text(275, yPositionText, languages[i].name)
					.attr({ 'font-size': style.languages.lang_fontsize, fill: style.languages.lang_fontcolor, 'font-family': customizedFonts[1] });
            yPositionText += 40;
        }

    }
    function drawConnections(connections, paper) {
        var textNoOfConn = connections;
        var fontSize = style.connections.conn_fontsize;

        if (textNoOfConn === 500) {
            textNoOfConn = textNoOfConn + "+";
            fontSize = fontSize - 30;
        }
        var title = paper.text(infographicWidth - 200, (groupsStartY + 50), "LINKEDIN")
                    .attr({ 'font-family': customizedFonts[1], 'font-size': style.connections.title_fontsize, fill: style.connections.title_fontcolor, "font-weight": style.connections.title_fontweight });
        var circ = paper.circle(infographicWidth - 200, groupsStartY + 250, 160)
                    .attr({ fill: customizedColors[2], stroke: 'none' });
        var text = paper.text(infographicWidth - 200, groupsStartY + 225, textNoOfConn)
                    .attr({ 'font-size': fontSize, fill: customizedColors[0], "font-weight": style.connections.conn_fontweight });
        var textConn = paper.text(infographicWidth - 200, groupsStartY + 305, "Connections")
                        .attr({ 'font-family': customizedFonts[1], 'font-size': style.connections.conn_text_fontsize, fill: style.connections.conn_text_fontcolor, "font-weight": style.connections.conn_text_fontweight });
    }

    function drawRecommendation(groupsStartY, recomm, paper) {
        var text = paper.text(275, groupsStartY + 50, "RECOMMENDATIONS");
        text.attr({ 'font-family': customizedFonts[1], 'font-size': style.recomm.title_fontsize, fill: style.recomm.title_fontcolor, "font-weight": style.recomm.title_fontweight });
        var recommendations = clone(recomm);
        var totalRecommendationsToDisplay = recommendations.length > 3 ? 3 : recommendations.length;
        var yPositionBlock = (groupsStartY + 100);
        var yPositionText = (groupsStartY + 120);
        var blockHeight = 50;
        var textLength = 105;
        var lineLength = 47;
        var maxLines = 2;
		var i;
        if (recommendations.length === 1) {
            blockHeight = 300;
            yPositionText += 130;
            textLength = 500;
            maxLines = 12;
        }
        for (i = 0; i < totalRecommendationsToDisplay; i++) {
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
    function drawSkills(skills, paper) {

        var skillY = skillsStartY + 150;
        var skillHeight = 30;
        var skillX = 150;
        var shapeWidth = 80;
        var skillBox;
        var yearDisplay = shapeWidth;
		var i;
        for (i = 0; i < skills.length && i < 5; i++) {
            if (timeLineType && timeLineType === "c") {
                shapeWidth = 70;
                yearDisplay = 90;
                skillBox = paper.g.disc(skillX, skillY, shapeWidth).attr({ fill: customizedColors[2], "stroke": "none" });
            } else if (timeLineType && timeLineType === "t") {
                shapeWidth = 70;
                yearDisplay = 90;
                skillBox = paper.g.diamond(skillX, skillY, shapeWidth).attr({ fill: customizedColors[2], "stroke": "none" });
            } else {
                shapeWidth = 70;
                yearDisplay = 90;
                skillBox = paper.g.disc(skillX, skillY, shapeWidth).attr({ fill: customizedColors[2], "stroke": "none" });
                //                shapeWidth = 80;
                //                yearDisplay = 80;
                //                skillBox=paper.g.flower(skillX, skillY, shapeWidth).attr({ fill: customizedColors[2], "stroke": "none" });
            }
            drawTooltip(skillBox.node, getSkillsTooltip(skills[i]));
            // var skillText = paper.text(skillX, skillY, trucateText(skills[i].name, 15)).attr({ fill: "#fff", "font-family": "proxima-nova", "font-size": 13 });		
            var textLength = 20;
            var lineLength = 10;
            var maxLines = 2;
            var skillText = getWrappedText(clone(skills[i].name), textLength, lineLength, maxLines);
            var textSkill = paper.text(skillX, skillY, skillText).attr({ fill: "#fff", "font-family": "proxima-nova", "font-size": 13 });

            drawTooltip(skillText.node, getSkillsTooltip(skills[i]));
            if (skills[i].years && skills[i].proficiency === null) {
				skills[i].proficiency = "Unspecified";
			}
            if (skills[i].years === null) {
                skills[i].years = "Unspecified";
            }
            var skillPro = paper.text(skillX, skillY + yearDisplay, skills[i].proficiency + "\n" + skills[i].years + "+ years").attr({ "font-size": 15, "font-family": "proxima-nova", fill: customizedColors[2], stroke: "none", "opacity": 0.9 });

            skillX += 170;

        }
    }

    function drawTimeLineLabel(text, paper, textY, pathY) {
        var timelineTitleHeight = 35;
        var timelineTitleWidth = 155;
        var timelineTitleChamfer = 15;
        //Add label for Experience
        var labelPath = " M 0 " + pathY + " l 0 " + timelineTitleHeight + " l " + (timelineTitleWidth - timelineTitleChamfer) + " 0 a " + timelineTitleChamfer + "," + timelineTitleChamfer + " 0 0,0 " + timelineTitleChamfer + ",-" + timelineTitleChamfer + " l 0 -" + (timelineTitleHeight - timelineTitleChamfer) + "z";
        var labelText = paper.text((infographicWidth / 2), textY, text).attr({
            "font-family": customizedFonts[1],
            "font-size": 35,
            "font-weight": "bold",
            fill: customizedColors[2],
            stroke: "none"
        });
    }
    //#######################
    //Draws experience timeline
    function drawExperienceTimeLine(expTimeLine, paper) {
        experienceStartY = 25; // HACK
        //time constraint
        var timeLineExp = paper.viz.applyConstraintsOnTimeLine(yearLimit, expTimeLine, vizData.counts.year_work_began, vizData.counts.year_work_ended);
        //Draw Experience Background   
        //drawTimeLineBackground(paper, experienceStartY, yearInterval, experienceTimeLineHeight);
        //Draw Experience Label
        var graphSet = paper.set();

        if (timeLineExp && timeLineExp.length > 0) {
            //Calculating years
            var lastExp = getMaxEndDate(timeLineExp);
            var firstExp = getMinStartDate(timeLineExp, yearLimit, lastExp.getFullYear()); // timeLineExp[timeLineExp.length - 1];
            // timeLineExp[0];
            var timelineStartYear = firstExp.getFullYear();
            var timelineEndYear = lastExp.getFullYear();
            //var timelineStartYear = getDateFromString(firstExp.start_date).getFullYear();
            //var timelineEndYear = getDateFromString(lastExp.end_date).getFullYear();
            var timelineYears = (timelineEndYear - timelineStartYear) + 1;
            //Draw Experience Years       
            var yearHeight = 25;
            var yearLabel = "";
            var yearWidth = timelineWidth / timelineYears;
            var color;
			var i;
            for (i = 0; i < timelineYears; i++) {
                color = style.timeline.year_color;
                if (i % 2) {
                    color = style.timeline.year_color_alt;
				}

                var yearRect = paper.rect((i * yearWidth), experienceTimeLineHeight + experienceStartY, yearWidth, 3).attr({
                    fill: customizedColors[2], 
					stroke: "none"
                });
                graphSet.push(yearRect);
                //add year label

                yearLabel = (timelineYears > 12) ? ("'" + (timelineStartYear + i).toString().substr(2)) : (timelineStartYear + i);
                var yearLine = paper.rect((i * yearWidth), experienceTimeLineHeight + experienceStartY + 3, 3, 5).attr({
                    fill: customizedColors[2], 
					stroke: "none"
                });
                graphSet.push(yearLine);
                var yearText = paper.text((i * yearWidth) + (yearWidth / 2), experienceTimeLineHeight + experienceStartY + (yearHeight / 2) + 5, yearLabel).attr({
                    "font-family": customizedFonts[2], 
					fill: customizedColors[2],
					"font-size": 16
                });
                graphSet.push(yearText);
            }

            //Calculate days for each exp
            for (i = 0; i < timeLineExp.length; i++) {
                var start = getDateFromString(timeLineExp[i].start_date);
                if (start < firstExp) {
                    start = firstExp;
				}
                var end = getDateFromString(timeLineExp[i].end_date);
                timeLineExp[i].range = ((end.getTime() - start.getTime()) / 86400000); //convert from ms to days
                //adjusting timeline for very short times
                if (timeLineExp[i].range < 30) {
                    timeLineExp[i].range = 30;
				}
            }
            //Set Block Heights
            var maxBlockHeight = setBlocksHeight(timeLineExp);

            //TODO: Readjust block height if maxBlockHeight is less than or greater than certain ideal height
            //        var idealBlockHeightDiff = 100 - maxBlockHeight;
            //        $.each(timeLineExp, function (index, value) {
            //          value.height= value.height+idealBlockHeightDiff;
            //        });

            var dayWidth = (yearWidth / 365); //approx.

            timeLineExp.sort(sortByRange);
            timeLineExp.reverse();

            var experienceBottom = experienceTimeLineHeight + experienceStartY;
            var experienceRadius = 0;
            var experienceWidth = 0;
            var timelineStartDate = new Date(timelineStartYear, 0, 1);
            var experienceStartX = 0;
            var currentExperienceHeight;
            var c = 3;
            for (i = 0; i < timeLineExp.length; i++) {
                var thisStartDate = getDateFromString(timeLineExp[i].start_date);
                if (thisStartDate < firstExp) {
                    thisStartDate = firstExp;
				}
                experienceStartX = ((thisStartDate.getTime() - timelineStartDate.getTime()) / 86400000) * dayWidth;
                //draw it!
                experienceWidth = ((timeLineExp[i].range / 365) * yearWidth);
                currentExperienceHeight = timeLineExp[i].height;
                timeLineExp[i].title = timeLineExp[i].position;
                timeLineExp[i].desc = timeLineExp[i].company;
                timeLineExp[i].width = experienceWidth;
                timeLineExp[i].center = experienceStartX + (experienceWidth / 2);
                timeLineExp[i].apex = (experienceBottom - currentExperienceHeight) + 8;
                var experienceGraphicPath;
                if (timeLineType && timeLineType === "c") {
                //experienceGraphicPath = "M " + experienceStartX + " " + experienceBottom + " a" + (experienceWidth / 2) + " " + (currentExperienceHeight) + " 1 0 1 " + (experienceWidth) + " " + "0" + " z";
                    experienceGraphicPath = ["M", experienceStartX, experienceBottom, "a", (experienceWidth / 2), (currentExperienceHeight), 0, 0, 1, (experienceWidth), 0, "z"];
                } else if (timeLineType && timeLineType === "t") {
                    experienceGraphicPath = "M " + experienceStartX + " " + experienceBottom + " l " + (experienceWidth / 2) + " -" + currentExperienceHeight + " " + (experienceWidth / 2) + " " + currentExperienceHeight + "z";
                } else {
                    experienceGraphicPath = " M " + experienceStartX + " " + experienceBottom + " l 0 -" + (currentExperienceHeight - experienceRadius) + " a 0 0 1 0 1 0 0 l " + (experienceWidth - (experienceRadius * 2)) + " 0  a 0 0 1 0 1 0 0 l 0 " + (currentExperienceHeight - experienceRadius) + "z";
				}
                var strokeWidth = 0;
                var strokeColor = "#fff";
                //                if (timeLineExp[i].isInPast || timeLineExp[i].is_current) {
                //                    strokeWidth = 2;
                //                    strokeColor = "#000";
                //                }
                var experienceItem = paper.path(experienceGraphicPath).attr({
                    fill: customizedColors[c],
                    stroke: strokeColor,
                    "stroke-width": strokeWidth,
                    opacity: "0.8"
                });
                graphSet.push(experienceItem);
                //tooltip                
                var tipText = getExperienceToolTip(timeLineExp[i]);
                drawTooltip(experienceItem.node, tipText);
                c++;
                if (c >= customizedColors.length) {
                    c = 3;
				}

            }
            var downShift = paper.viz.scatterLabels(100, 10, timeLineExp, { spacing: 10, horz_spacing: 10 });
            paper.setSize(paper.width, paper.height + downShift);
            graphSet.translate(0, downShift);
        }
    }

    //#######################
    //Draws education timeline
    function drawEducationTimeLine(timeLineEducation, paper) {
        //constraints
        //var timeLineEducation = paper.viz.applyConstraintsOnTimeLine(yearLimit, eduTimeLine, vizData.counts.year_education_began, vizData.counts.year_education_ended);

        educationStartY = 25; // HACK
        var graphSet = paper.set();

        //Draw Experience Background   
        //drawTimeLineBackground(paper, educationStartY, yearInterval, educationTimeLineHeight);
        //Draw Education Label
        if (timeLineEducation && timeLineEducation.length > 0) {
            var lastEdu = getMaxEndDate(timeLineEducation);
            var firstEdu = getMinStartDate(timeLineEducation, yearLimit, lastEdu.getFullYear());

            var minEduYear = firstEdu.getFullYear();
            var maxEduYear = lastEdu.getFullYear();
            var timelineTop = 25;
            var yearHeight = 25;
            var yearLabel = "";
            var educationBottom = educationStartY + educationTimeLineHeight;
            var realMinYear = getMinStartDate(timeLineEducation);
            var timelineStartYear = minEduYear;
            if (realMinYear >= firstEdu) {
                timelineStartYear -= 1;
			}
            var curr_year = (new Date()).getFullYear();
            var timelineEndYear = maxEduYear + ((maxEduYear === curr_year) ? 0 : 1);
            var timelineYears = (timelineEndYear - timelineStartYear) + 1;
            var yearWidth = timelineWidth / timelineYears;
            var color;
			var i;
            for (i = 0; i < timelineYears; i++) {
                color = style.timeline.year_color;
                if (i % 2) {
                    color = style.timeline.year_color_alt;
				}
                var yearRect = paper.rect((i * yearWidth), educationBottom, yearWidth, 3).attr({
                    fill: customizedColors[2],
                    stroke: "none"
                });
                //add year label
				yearLabel = (timelineYears > 12) ? ("'" + (timelineStartYear + i).toString().substr(2)) : (timelineStartYear + i);
                var yearLine = paper.rect((i * yearWidth), educationTimeLineHeight + educationStartY + 3, 3, 5).attr({
                    fill: customizedColors[2], 
					stroke: "none"
                });
                var yearText = paper.text((i * yearWidth) + (yearWidth / 2), (educationBottom + yearHeight / 2) + 3, yearLabel).attr({
                    "font-family": customizedFonts[2],
					fill: customizedColors[2],
                    "font-size": 16
                });
                graphSet.push(yearRect);
                graphSet.push(yearLine);
                graphSet.push(yearText);
            }

            //stack each graphic higher, if it overlaps another timerange
            for (i = 0; i < timeLineEducation.length; i++) {
                var start = getDateFromString(timeLineEducation[i].start_date);
                if (start < firstEdu) {
                    start = firstEdu;
				}
                var end = getDateFromString(timeLineEducation[i].end_date);
                timeLineEducation[i].range = ((end.getTime() - start.getTime()) / 86400000); //convert from ms to days
                if (timeLineEducation[i].range < 30) {
                    timeLineEducation[i].range = 30;
				}
            }
            var maxBlockHeight = setBlocksHeight(timeLineEducation);

            var dayWidth = (yearWidth / 365); //approx.

            timeLineEducation.sort(sortByRange);
            timeLineEducation.reverse();

            //draw the shapes
            // (timelineHeight * 0.55) + yearHeight;
            var educationRadius = 0;
            var educationWidth = 0;
            var timelineStartDate = new Date(timelineStartYear, 0, 1);
            var educationStartX = 0;
            var currentEducationHeight;
            //var eduStartPixelLabelX = 10;
            //var eduStartPixelLabelY = educationStartY + 100;
            var c = 3;
            for (i = 0; i < timeLineEducation.length; i++) {
                var thisStartDate = getDateFromString(timeLineEducation[i].start_date);
                if (thisStartDate < firstEdu) {
                    thisStartDate = firstEdu;
				}
                educationStartX = ((thisStartDate.getTime() - timelineStartDate.getTime()) / 86400000) * dayWidth;
                //draw it!
                educationWidth = ((timeLineEducation[i].range / 365) * yearWidth);

                currentEducationHeight = timeLineEducation[i].height;

                timeLineEducation[i].title = timeLineEducation[i].degree;
                timeLineEducation[i].desc = timeLineEducation[i].school;
                timeLineEducation[i].width = educationWidth;
                timeLineEducation[i].center = educationStartX + (educationWidth / 2);
                timeLineEducation[i].apex = (educationBottom - currentEducationHeight) + 8;

                var educationGraphicPath;
                if (timeLineType && timeLineType === "c") {
                //educationGraphicPath = "M " + educationStartX + " " + educationBottom + " a" + (educationWidth / 2) + " " + (currentEducationHeight) + " 1 0 1 " + (educationWidth) + " " + "0" + " z";
                    educationGraphicPath = ["M", educationStartX, educationBottom, "a", (educationWidth / 2), (currentEducationHeight), 0, 0, 1, (educationWidth), 0, "z"];
                } else if (timeLineType && timeLineType === "t") {
                    educationGraphicPath = "M " + educationStartX + " " + educationBottom + " l " + (educationWidth / 2) + " -" + currentEducationHeight + " " + (educationWidth / 2) + " " + currentEducationHeight + "z";
                } else {
                    educationGraphicPath = " M " + educationStartX + " " + educationBottom + " l 0 -" + (currentEducationHeight - educationRadius) + " a 0 0 1 0 1 0 0 l " + (educationWidth - (educationRadius * 2)) + " 0  a 0 0 1 0 1 0 0 l 0 " + (currentEducationHeight - educationRadius) + "z";
				}

                var strokeWidth = 0;
                var strokeColor = "#fff";
                //draw the shape
                var educationItem = paper.path(educationGraphicPath).attr({
                    fill: customizedColors[c],
                    stroke: strokeColor,
                    "stroke-width": strokeWidth,
                    opacity: "0.8"
                });
                graphSet.push(educationItem);
                c++;
                if (c >= customizedColors.length) {
                    c = 3;
				}
                //tooltip                
                var tipText = getEducationToolTip(timeLineEducation[i]);
                drawTooltip(educationItem.node, tipText);
            }
            //paper.viz.scatterLabels(100, eduStartPixelLabelY, timeLineEducation, { spacing: 5, horz_spacing: 10 });
            var downShift = paper.viz.scatterLabels(100, 10, timeLineEducation, { spacing: 10, horz_spacing: 10 });
            paper.setSize(paper.width, paper.height + downShift);
            graphSet.translate(0, downShift);
        }
    }

    //Draws the timeline Background
    function drawTimeLineBackground(paper, y, width, height) {
        var intervalRect;
		var i;
        for (i = 0; i < totalIntervals; i++) {
            color = style.timeline.bg_color;
            if (i % 2) {
                color = style.timeline.bg_color_alt;
            }
            intervalRect = paper.rect((i * yearIntervalWidth), y, yearIntervalWidth, height).attr({
                fill: color,
                stroke: "none"
            });
        }
    }

    //Calculates and sets blocks height to avoid any overlapping
    function setBlocksHeight(timeLine) {
        //we need to determine which graphics need to be drawn taller (and also behind) others
        //on first pass (Sm - Lg) do not render, set the height. if "this" range overlaps any previous, increment as required for each it overlaps
        //on second pass (Lg - Sm) render each
        var experienceHeight = 50;
        var experienceHeightInc = 15;
        var maxBlockHeight = experienceHeight;
        var currentStart, currentEnd, previousStart, previousEnd;
        timeLine.sort(sortByRange);
        //first pass
		var i;
		var j;
        for (i = 0; i < timeLine.length; i++) {
            timeLine[i].height = experienceHeight;
            currentStart = getDateFromString(timeLine[i].start_date).getTime();
            currentEnd = getDateFromString(timeLine[i].end_date).getTime();
            for (j = 0; j < i; j++) {
                previousStart = getDateFromString(timeLine[j].start_date).getTime();
                previousEnd = getDateFromString(timeLine[j].end_date).getTime();
                if ((previousStart > currentStart && previousStart < currentEnd) || (previousEnd > currentStart && previousEnd < currentEnd) ||
						(previousStart === currentStart && previousEnd === currentEnd)) {
                    //only increment if needed
                    if (timeLine[i].height === timeLine[j].height) {
                        timeLine[i].height = timeLine[i].height + experienceHeightInc;
                        if (timeLine[i].height > maxBlockHeight) {
                            maxBlockHeight = timeLine[i].height;
						}
                    }
                }
            }

        }
        return maxBlockHeight;
    }

})();                                                                                                         //NameSpace