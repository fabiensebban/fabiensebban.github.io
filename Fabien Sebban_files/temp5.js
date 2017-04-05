//Template 5: Vahn der Rohe
var temp5 = (function () {

    var paper;
    var headerObj = {
        name: '',
        title: ''
    };

    var colors = ["#ffffff", "#ffffff", "#B0C087", "#FAAF40", "#775961", "#559FC7", "#000"];
    var fonts = ["proxima-nova", "museo-slab", "proxima-nova"];

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
        "awards": {
            "title_fontsize": 35,
            "title_fontcolor": "#000",
            "title_fontweight": "bold",
            "int_fontcolor": "#000",
            "int_fontsize": 22

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
    //viz data is loaded in this variable
    var timelineTitleHeight = 35;
    var timelineTitleWidth = 155;
    var timelineTitleChamfer = 15;
    //infographic settings
    var infographicWidth = 960;
    var infographicHeight = 1700;
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
    var experienceStartY = headerHeight + headerAndBottomDiff;
    var experienceTimeLineHeight = 240;
    var timeLineDifference = 60;
    var educationStartY = experienceTimeLineHeight + timeLineDifference + experienceStartY;
    var educationTimeLineHeight = 240;
    var timelineHeight = experienceTimeLineHeight + educationTimeLineHeight + timeLineDifference;
    var skillsHeight = 200;
    var skillsStartY = timelineHeight + timeLineDifference + experienceStartY;
    var groupsHeight = 300;
    var groupsStartY = skillsStartY + skillsHeight + timeLineDifference;

    return {
        getDefaultColors: function () {
            return clone(colors);
        },
        getDefaultFonts: function () {
            return clone(fonts);
        },

        //Generates the SVG
        generate: function (timeLineShape) {
            function addLegends(paper, dimension, educationTimeline, isEducation, funcGetText) {
                var educationTimelineYearsCount = educationTimeline.length;
                var ypos = dimension.y + 193;
                var title;
				educationTimeline.sort(function(a, b) { return b.end_date - a.end_date; });
                for (i = 0; i < Math.min(educationTimelineYearsCount, 6); i++) {
                    try {
                        var text = funcGetText(educationTimeline[i])
                        var startYear = "";
                        if (educationTimeline[i].start_date)
                            startYear = getDateFromString(educationTimeline[i].start_date).getFullYear();
                        var endYear = "";
                        if (educationTimeline[i].end_date)
                            endYear = getDateFromString(educationTimeline[i].end_date).getFullYear();
                        var title = text.title || "";
                        var desc = text.desc || "";
                        var years = "";
                        if (startYear)
                            years = startYear + "-" + endYear;
                        var educationTitle = years + "\n" + text.desc + "\n " + title;

                        title = paper.text(dimension.x + dimension.middle, ypos, educationTitle.wordWrap(35, "\n", 1)).attr({ fill: customizedColors[6], "text-anchor": "middle", "font-size": 18, "font-family": customizedFonts[2] }).toFront();
                        ypos = ypos + 105;
                        if (isEducation)
                            tipText = getEducationToolTip(educationTimeline[i]);
                        else
                            tipText = getExperienceToolTip(educationTimeline[i]);
                        drawTooltip(title.node, tipText);
                    }
                    catch (err) { }
                }
            }
            function pentagonPath(dimension, pointHeight) {
                return ["M", dimension.x, dimension.y, "l", dimension.width, 0, 0, 102.942, -dimension.middle, pointHeight, -dimension.middle, -pointHeight, "z"];
            }
            function drawTitle(paper, dimension, title) {
                var shadow = paper.text(dimension.x + dimension.middle, dimension.y + 76, title).attr({ "font-size": 36, "font-family": customizedFonts[0], fill: "#000000", opacity: .5, "text-anchor": "middle" });
                var text = paper.text(dimension.x + dimension.middle, dimension.y + 73, title).attr({ "font-size": 36, "font-family": customizedFonts[0], fill: customizedColors[1] });
                return { "text": text, "shadow": shadow }
            }
            function createDiv(id) {
                newdiv = document.createElement('div');
                newdiv.setAttribute('id', id);
                return newdiv;
            }

            if (!customizedColors)
                customizedColors = clone(colors);
            if (!customizedFonts)
                customizedFonts = clone(fonts);

            var userInfo = vizData.user_info;
            var workTimeline = vizData.timeline_work;
            var educationTimeline = vizData.timeline_education;
            var reduceHeight = 0;

            String.prototype.wordWrap = function (m, b, c) {
                var i, j, l, s, r;
                if (m < 1)
                    return this;
                for (i = -1, l = (r = this.split("\n")).length; ++i < l; r[i] += s)
                    for (s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : ""))
                        j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length
            || c == 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
                return r.join("\n");

            }

            //initialize canvas (this is where everything is drawn)
            //var paper = Raphael(document.getElementById("infographic"), infographicWidth, infographicHeight);

            var displaySkills = customizedSections.skills && vizData.skills && vizData.skills.length > 0;

            function drawHeaderDiv(id) {
                var header = createDiv('__header');
                document.getElementById(id).appendChild(header);

                var paper = Raphael(header, infographicWidth, 256);

                var headerbg = "M0 0L0 219.321 0 219.321 0 219.321 0 219.402 0.08 219.402 13.058 232.869 26.038 219.402 26.197 219.402 39.175 232.869 52.154 219.402 52.313 219.402 65.292 232.869 78.271 219.402 78.43 219.402 91.41 232.869 104.389 219.402 104.548 219.402 117.527 232.869 130.506 219.402 130.665 219.402 143.643 232.869 156.623 219.402 156.782 219.402 169.762 232.869 182.739 219.402 182.899 219.402 195.878 232.869 208.856 219.402 209.016 219.402 221.995 232.869 234.974 219.402 235.133 219.402 248.113 232.869 261.092 219.402 261.25 219.402 274.23 232.869 287.208 219.402 287.367 219.402 300.347 232.869 313.325 219.402 313.484 219.402 326.463 232.869 339.443 219.402 339.603 219.402 352.581 232.869 365.56 219.402 365.719 219.402 378.697 232.869 391.677 219.402 391.836 219.402 404.814 232.869 417.794 219.402 417.953 219.402 430.932 232.869 443.911 219.402 444.07 219.402 457.049 232.869 470.028 219.402 470.187 219.402 483.167 232.869 496.147 219.402 496.307 219.402 509.285 232.869 522.263 219.402 522.423 219.402 535.4 232.869 548.381 219.402 548.54 219.402 561.519 232.869 574.497 219.402 574.656 219.402 587.633 232.869 600.613 219.402 600.771 219.402 613.752 232.869 626.731 219.402 626.889 219.402 639.868 232.869 652.849 219.402 653.008 219.402 665.986 232.869 678.966 219.402 679.124 219.402 692.105 232.869 705.083 219.402 705.242 219.402 718.221 232.869 731.198 219.402 731.357 219.402 744.338 232.869 757.316 219.402 757.477 219.402 770.455 232.869 783.433 219.402 783.592 219.402 796.571 232.869 809.552 219.402 809.711 219.402 822.689 232.869 835.669 219.402 835.829 219.402 848.807 232.869 861.785 219.402 861.945 219.402 874.924 232.869 887.902 219.402 888.062 219.402 901.04 232.869 914.019 219.402 914.178 219.402 927.156 232.869 940.137 219.402 940.295 219.402 953.273 232.869 966.255 219.402 966.334 219.402 966.334 0z";
                paper.path(headerbg).attr({ fill: customizedColors[2], stroke: "none" });
                var headertextshadow = paper.text(paper.width / 2, 55, userInfo.first_name + " " + userInfo.last_name).attr({ "font-size": 70, "font-family": customizedFonts[0], fill: "#000000", opacity: .5 });
                var headertext = paper.text(paper.width / 2, 50, userInfo.first_name + " " + userInfo.last_name).attr({ "font-size": 70, "font-family": customizedFonts[0], fill: customizedColors[0] });
                var headline = paper.text(paper.width / 2, 150, trucateText(userInfo.title, 35)).attr({ "font-size": 48, "font-family": customizedFonts[1], fill: customizedColors[1] });
            }

            //EDUCATION COLUMN ##################
            function drawEducationDiv(id) {
                var div = createDiv('__workedu');
                document.getElementById(id).appendChild(div);

                var div = createDiv('__edu');
                document.getElementById(id).appendChild(div);

                var education = { "x": 0, "y": 0, "width": 286.302, "height": 858.216, "middle": 143.151 }

                if (!displaySkills) {
                    var education = { "x": 0, "y": 0, "width": 433.507, "height": 858.216, "middle": 216.753 }
                }
                var paper = Raphael(div, education.width, education.height);
                paper.rect(education.x, education.y, education.width, education.height).attr({ fill: "#FFFFFF", stroke: "none" });
                var EDpent = pentagonPath(education, 34.560);
                paper.path(EDpent).attr({ fill: customizedColors[3], stroke: "none" });
                var educationText = drawTitle(paper, education, "Education");
                addLegends(paper, education, educationTimeline, true, function (item) { return { "title": item.degree, "desc": item.school, "summary": ""} });
            }

            //WORK COLUMN #######################
            function drawWorkDiv(id) {
                var div = createDiv('__work');
                document.getElementById(id).appendChild(div);

                var work = { "x": 0, "y": 0, "width": 286.302, "height": 858.216, "middle": 143.151 }

                if (!displaySkills) {
                    var work = { "x": 0, "y": 0, "width": 433.507, "height": 858.216, "middle": 216.753 }
                }
                var paper = Raphael(div, work.width, work.height);
                paper.rect(work.x, work.y, work.width, work.height).attr({ fill: "#FFFFFF", stroke: "none" });
                var WORKpent = pentagonPath(work, 34.560);
                paper.path(WORKpent).attr({ fill: customizedColors[4], stroke: "none" });
                var workText = drawTitle(paper, work, "Employment");
                //WORK TIMELINE
                addLegends(paper, work, workTimeline, false, function (item) { return { "title": item.position, "desc": item.company, "summary": item.summary} });
            }

            //SKILLS COLUMN ########################################
            function drawSkillsDiv(id) {
                var div = createDiv('__skills');
                document.getElementById(id).appendChild(div);

                if (displaySkills) {
                    var skills = { "x": 0, "y": 0, "width": 286.302, "height": 858.216, "middle": 143.151 };
                    var paper = Raphael(div, skills.width, skills.height);

                    paper.rect(skills.x, skills.y, skills.width, skills.height).attr({ fill: "#FFFFFF", stroke: "none" });
                    var SKILLpent = pentagonPath(skills, 34.560);
                    paper.path(SKILLpent).attr({ fill: customizedColors[5], stroke: "none" });
                    //TEXT AND TEXT SHADOW
                    var workText = drawTitle(paper, skills, "Skills");
                    //STARS SYSTEM
                    (function addSkills(dimension, skills) {
                        var countSkills = skills.length;
                        var ypos = dimension.y + 163;
                        for (i = 0; i < Math.min(countSkills, 6); i++) {
                            //var xpos = 0
                            if (skills[i].proficiency == "Beginner") { var stars = 1; }
                            if (skills[i].proficiency == "Intermediate") { var stars = 2; }
                            if (skills[i].proficiency == "Advanced") { var stars = 3; }
                            if (skills[i].proficiency == "Expert") { var stars = 4; }
                            var xpos = dimension.x + dimension.middle - ((stars / 2) * 50) + 25;
                            var skillText = paper.text(dimension.x + dimension.middle, ypos, skills[i].name.wordWrap(35, "\n", 1)).attr({ fill: customizedColors[6], "text-anchor": "middle", "font-size": 18, "font-family": customizedFonts[2] }).toFront();

                            drawTooltip(skillText.node, getSkillsTooltip(skills[i]));
                            for (s = 0; s < stars; s++) {
                                paper.g.star(xpos, 40 + ypos, 25, 10, 5).attr({ fill: customizedColors[6], stroke: "none" });
                                xpos = xpos + 50;
                            }
                            ypos = ypos + 105;
                        }
                    })(skills, vizData.skills);
                }
            }

            function drawExtraDiv(id) {
                var div = createDiv('__extra');
                document.getElementById(id).appendChild(div);
                div.style.marginBottom = '35px';

                
                    var displayed = false;
                    //DETAILS COLUMN #########################
                    var details = { "x": 33.183, "y": 0, "width": 433.507, "height": 477.518, "middle": 216.753 };

                    if (customizedSections.recommendations && vizData.recommendations && vizData.recommendations.length > 0) {
                        var paper = Raphael(div, infographicWidth, details.height);
                        paper.rect(details.x, details.y, details.width, details.height).attr({ fill: "#FFFFFF", stroke: "none" });
                        var AWARDpent = pentagonPath(details, 55.359);
                        paper.path(AWARDpent).attr({ fill: customizedColors[3], stroke: "none" });
                        var rectextshadow = drawTitle(paper, details, "Recommendations");
                        displayed = true;
                        (function addrecs(dimension, recommendations) {
                            var Recs = recommendations.length;
                            var ypos = dimension.y + 210
                            var title;
                            if (Recs > 3) { Recs = 3; }
                            for (i = 0; i < Recs; i++) {
                                //var recsTitle = "\"" + recommendations[i ].recommendationText.substring(0, 70) + "...\"\n" + recommendations[i].recommender.firstName;
                                var displayText = getWrappedText(clone(recommendations[i].content.recommendationText), 150, 40, 3);
                                displayText = displayText + "\n" + recommendations[i].content.recommender.firstName;
                                title = paper.text(dimension.x + dimension.middle, ypos, displayText).attr({ fill: customizedColors[6], "text-anchor": "middle", "font-size": 18, "font-family": customizedFonts[2], "font-weight": "italic" }).toFront();
                                ypos = ypos + 100;

                                drawTooltip(title.node, recommendations[i].content.recommendationText);

                                //var textRecomm = paper.text(275, yPositionText, displayText)
                            }
                        })(details, vizData.recommendations);
                        paper.setSize(infographicWidth, details.height);
                    }
                    else if (customizedSections.interests && vizData.interests && vizData.interests.length > 0) {
                        var paper = Raphael(div, infographicWidth, details.height);
                        paper.rect(details.x, details.y, details.width, details.height).attr({ fill: "#FFFFFF", stroke: "none" });
                        var AWARDpent = pentagonPath(details, 55.359);
                        paper.path(AWARDpent).attr({ fill: customizedColors[3], stroke: "none" });
                        var rectextshadow = drawTitle(paper, details, "Interests");
                        displayed = true;

                        (function addInterests(dimension, interests) {
                            if (interests && interests.length > 0) {
                                /*
                                if (interests.length > 6) {
                                var extra = interests.length - 6;
                                var extraHeight = extra * 40;
                                paper.rect(dimension.x, dimension.y + dimension.height, dimension.width, extraHeight).attr({ fill: "#FFFFFF", stroke: "none" });
                                dimension.height += extraHeight;
                                reduceHeight -= extraHeight;
                                }
                                */
                                var yPositionText = (dimension.y + 210);
                                for (var i = 0; i < Math.min(interests.length, 6); i++) {
                                    var textLanguage = paper.text(dimension.x + dimension.middle, yPositionText, interests[i].name)
								.attr({ fill: customizedColors[6], "text-anchor": "middle", 'font-size': 18, 'font-family': customizedFonts[2], "font-weight": "italic" });
                                    yPositionText += 40;
                                }
                            }
                        })(details, vizData.interests);
                        paper.setSize(infographicWidth, details.height);
                    }
                    else if (customizedSections.languages && vizData.languages && vizData.languages.length > 0) {
                        var paper = Raphael(div, infographicWidth, details.height);
                        paper.rect(details.x, details.y, details.width, details.height).attr({ fill: "#FFFFFF", stroke: "none" });
                        var AWARDpent = pentagonPath(details, 55.359);
                        paper.path(AWARDpent).attr({ fill: customizedColors[3], stroke: "none" });
                        var rectextshadow = drawTitle(paper, details, "Languages");
                        displayed = true;
                        (function addlanguage(dimension, language) {
                            var languageCount = language.length;
                            var yPositionText = (dimension.y + 210);
                            var title;
                            if (languageCount > 5) { languageCount = 5; }
                            for (var i = 0; i < languageCount; i++) {
                                var languageTitle = language[i].name;
                                title = paper.text(dimension.x + dimension.middle, yPositionText, language[i].name).attr({ fill: customizedColors[6], "text-anchor": "middle", "font-size": 36, "font-family": customizedFonts[2] }).toFront();
                                yPositionText += 40;
                            }
                        })(details, vizData.languages);
                        paper.setSize(infographicWidth, details.height);
                    }
                    if (displayed) {
                        //URLS
                        //CONNECTIONS COLUMN  ##############################################
                        var style = {
                            "connections": {
                                "title_fontsize": 35,
                                "title_fontcolor": "#000",
                                "title_fontweight": "bold",
                                "bg_color": "#000",
                                "conn_fontcolor": "#fef200",
                                "conn_fontsize": 140,
                                "conn_fontweight": "normal",
                                "conn_text_fontcolor": "#000",
                                "conn_text_fontsize": 35,
                                "conn_text_fontweight": "bold"
                            }
                        }
                        var connections = { "x": 496.939, "y": 0, "width": 433.507, "height": details.height, "middle": 216.753 }
                        paper.rect(connections.x, connections.y, connections.width, connections.height).attr({ fill: "#FFFFFF", stroke: "none" });
                        var CONNECTIONSpent = pentagonPath(connections, 55.359);
                        paper.path(CONNECTIONSpent).attr({ fill: customizedColors[5], stroke: "none" });
                        //TEXT AND TEXT SHADOW
                        var latextshadow = drawTitle(paper, connections, "Connections");
                        (function drawConnections(dimensions, connections, paper) {
                            var textNoOfConn = connections;
                            var fontSize = style.connections.conn_fontsize;

                            if (textNoOfConn == 500) {
                                textNoOfConn = textNoOfConn + "+";
                                fontSize = fontSize - 30;
                            }
                            var text = paper.text(dimensions.x + dimensions.middle, dimensions.y + (dimensions.height / 2) + 55.359, textNoOfConn)
									.attr({ 'font-size': fontSize, fill: "black", "font-weight": style.connections.conn_fontweight, "font-family": customizedFonts[2] });
                        })(connections, vizData.counts.connections, paper);
                    }
                    else
                        reduceHeight += 480;
                

            }
            //FOOTER BACKGROUND ############################
            function drawFooterDiv(id) {
                var div = createDiv('__footer');
                document.getElementById(id).appendChild(div);
                div.style.marginBottom = '-3px'; // HACK


                var paper = Raphael(div, infographicWidth, 15);

                var footerDimension = { "startX": 966.253, "startY": 13 };
                var footer = "m " + footerDimension.startX + " " + footerDimension.startY + " l -12.979,-13.466 -12.977,13.466 -0.16,0 -12.981,-13.466 -12.976,13.466 -0.162,0 -12.978,-13.466 -12.977,13.466 -0.159,0 -12.98,-13.466 -12.979,13.466 -0.161,0 -12.977,-13.466 -12.978,13.466 -0.162,0 -12.978,-13.466 -12.978,13.466 -0.16,0 -12.98,-13.466 -12.978,13.466 -0.16,0 -12.978,-13.466 -12.978,13.466 -0.162,0 -12.977,-13.466 -12.979,13.466 -0.161,0 -12.977,-13.466 -12.978,13.466 -0.161,0 -12.978,-13.466 -12.979,13.466 -0.16,0 -12.979,-13.466 -12.976,13.466 -0.161,0 -12.981,-13.466 -12.978,13.466 -0.161,0 -12.977,-13.466 -12.979,13.466 -0.16,0 -12.98,-13.466 -12.977,13.466 -0.159,0 -12.978,-13.466 -12.98,13.466 -0.161,0 -12.978,-13.466 -12.976,13.466 -0.162,0 -12.977,-13.466 -12.979,13.466 -0.162,0 -12.977,-13.466 -12.98,13.466 -0.16,0 -12.978,-13.466 -12.979,13.466 -0.159,0 -12.979,-13.466 -12.979,13.466 -0.159,0 -12.98,-13.466 -12.978,13.466 -0.16,0 -12.978,-13.466 -12.979,13.466 -0.16,0 -12.977,-13.466 -12.979,13.466 -0.16,0 -12.979,-13.466 -12.978,13.466 -0.161,0 -12.978,-13.466 -12.98,13.466 -0.159,0 -12.978,-13.466 -12.979,13.466 -0.159,0 -12.979,-13.466 -12.979,13.466 -0.159,0 -12.98,-13.466 -12.977,13.466 -0.161,0 -12.979,-13.466 -12.977,13.466 -0.161,0 -12.978,-13.466 -12.98,13.466 -0.16,0 -12.978,-13.466 -12.979,13.466 -0.16,0 -12.978,-13.466 -12.979,13.466 -0.16,0 -12.977,-13.466 -12.98,13.466 -0.16,0 -12.979,-13.466 -12.978,13.466 -0.16,0 -12.978,-13.466 -12.978,13.466 -0.16,0 -12.979,-13.466 -12.979,13.466 -0.08,0 0,77.61996 966.334,0 0,-77.61996 z";
                //var footer = "M966.253 1637.794L953.274 1624.328 940.297 1637.794 940.137 1637.794 927.156 1624.328 914.18 1637.794 914.018 1637.794 901.04 1624.328 888.063 1637.794 887.904 1637.794 874.924 1624.328 861.945 1637.794 861.784 1637.794 848.807 1624.328 835.829 1637.794 835.667 1637.794 822.689 1624.328 809.711 1637.794 809.551 1637.794 796.571 1624.328 783.593 1637.794 783.433 1637.794 770.455 1624.328 757.477 1637.794 757.315 1637.794 744.338 1624.328 731.359 1637.794 731.198 1637.794 718.221 1624.328 705.243 1637.794 705.082 1637.794 692.104 1624.328 679.125 1637.794 678.965 1637.794 665.986 1624.328 653.01 1637.794 652.849 1637.794 639.868 1624.328 626.89 1637.794 626.729 1637.794 613.752 1624.328 600.773 1637.794 600.613 1637.794 587.633 1624.328 574.656 1637.794 574.497 1637.794 561.519 1624.328 548.539 1637.794 548.378 1637.794 535.4 1624.328 522.424 1637.794 522.262 1637.794 509.285 1624.328 496.306 1637.794 496.144 1637.794 483.167 1624.328 470.187 1637.794 470.027 1637.794 457.049 1624.328 444.07 1637.794 443.911 1637.794 430.932 1624.328 417.953 1637.794 417.794 1637.794 404.814 1624.328 391.836 1637.794 391.676 1637.794 378.698 1624.328 365.719 1637.794 365.559 1637.794 352.582 1624.328 339.603 1637.794 339.443 1637.794 326.464 1624.328 313.486 1637.794 313.325 1637.794 300.347 1624.328 287.367 1637.794 287.208 1637.794 274.23 1624.328 261.251 1637.794 261.092 1637.794 248.113 1624.328 235.134 1637.794 234.975 1637.794 221.995 1624.328 209.018 1637.794 208.857 1637.794 195.878 1624.328 182.901 1637.794 182.74 1637.794 169.762 1624.328 156.782 1637.794 156.622 1637.794 143.644 1624.328 130.665 1637.794 130.505 1637.794 117.527 1624.328 104.548 1637.794 104.388 1637.794 91.411 1624.328 78.431 1637.794 78.271 1637.794 65.292 1624.328 52.314 1637.794 52.154 1637.794 39.176 1624.328 26.198 1637.794 26.038 1637.794 13.059 1624.328 0.08 1637.794 0 1637.794 0 1715.414 966.334 1715.414 966.334 1637.794z";
                paper.path(footer).attr({ fill: customizedColors[2], stroke: "none" });
            }
            var wrapperDiv = createDiv('__wrapper');
            wrapperDiv.style.backgroundColor = "#E6E7E8";
            document.getElementById('infographic').appendChild(wrapperDiv);

            drawHeaderDiv('__wrapper');
            var tableDiv = createDiv('__table');

            if (displaySkills) {
                tableDiv.innerHTML = "<table style='margin-bottom: 26px'><tr><td id='_1'></td><td id='_2'></td><td id='_3'></td></tr></table>"; // HACK
            } else {
                tableDiv.innerHTML = "<table style='margin-bottom: 26px'><tr><td id='_1'></td><td id='_2'></td></tr></table>"; // HACK
            }
            wrapperDiv.appendChild(tableDiv);
            drawEducationDiv('_1');
            drawWorkDiv('_2');
			if (displaySkills) {
				drawSkillsDiv('_3');
			}

            //drawExtraDiv('__wrapper');
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
            //drawFooterDiv('__wrapper');

            //paper.setSize(infographicWidth, infographicHeight - reduceHeight)
            //Background Color
            //var background = paper.rect(0, 0, infographicWidth, infographicHeight - reduceHeight).attr({ fill: "#E6E7E8", stroke: "none" });
            //background.toBack();

        }
    }
})();