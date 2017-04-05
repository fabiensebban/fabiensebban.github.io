//Template 2:Chris - Circle
var temp4 = (function () {
	var paper;
	var headerObj = {
		name: '',
		title: ''
	};

	var colors = ["#007eff", "#fff", "#313843", "#dd0083", "#313843", "#c1b79f", "#f9e5e4"];
	var fonts = ["museo-slab", "museo-sans", "museo-slab"];

	var style = {
		"fonts": {
			// http://new.myfonts.com/fonts/exljbris/museo-slab/500/
			"title": "museo-slab",
			// http://new.myfonts.com/fonts/cheapprofonts/familiar-pro/bold/
			"content": "museo-sans"
		},
		"header": {
			"header_bg": colors[2],
			"align": "left",
			"name": {
				"font": "",
				"fontsize": 50,
				"fontweight": "bold",
				"fontcolor": colors[0]
			},
			"title": {
				"font": "",
				"fontsize": 25,
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
        "interests": {
            "title_fontsize": 35,
            "title_fontcolor": "#000",
            "title_fontweight": "bold",
            "int_fontcolor": "#000",
            "int_fontsize": 22,
			'showTitle': 'hide',
			'marginVertical': 1
        },
		"languages": {
			"title_fontsize": 35,
			"title_fontcolor": "#000",
			"title_fontweight": "bold",
			"lang_fontcolor": "#000",
			"lang_fontsize": 12,
			"lang_font": "Verdana"

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

	//legends for jobs
	var jobLegends = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	var educationLegends = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "VIX", "XX", "XXI", "XXII", "XXIII", "XXIV", "XXV"];

	var xAxis;
	var busyGraphics = false; // variable used for clearing any existing graphics
	var arcPath = "M100,0C100,27.614,77.614,50,50,50S0,27.614,0,0";
	var wavePath = "M150,0C100,27.614,77.614,50,50,50S0,27.614,0,0";
	//infographic settings
	var infographicWidth = 960;
	var infographicHeight = 1700;
	var headerHeight = 160;
	var headerWidth = 960;
	var sectionSpace = 80;
	var timelineStartY = 730;
	var timelineEndY = 730;
	var eduArcMax = 200;
	var workArcMax = 200;
	var infographicMaxHeight;
	var timelineYears;

	return {
		getDefaultColors: function () {
			return clone(colors);
		},
		getDefaultFonts: function () {
			return clone(fonts);
		},
		//Generates the SVG
		generate: function () {
			if (!customizedColors) { customizedColors = clone(colors); }
			if (!customizedFonts) { customizedFonts = clone(fonts); }
			var infographicDiv = document.getElementById("infographic");
			var temp4Div = createDiv('temp4Div');
			infographicDiv.appendChild(temp4Div);

			//paper = Raphael(document.getElementById("temp4Div"), infographicWidth, infographicHeight);
			temp4Div.style.backgroundColor = customizedColors[6];
			//temp4Div.style.backgroundImage = "url(/media/img/texture.png)";
			//temp4Div.style.backgroundRepeat = "repeat";

			handleResponse(vizData);
		}
	};

	function createDiv(id) {
		newdiv = document.createElement('div');
		newdiv.setAttribute('id', id);
		return newdiv;
	}
	
	function drawHeaderDiv(id, json) {
		var div = createDiv('__header');
		document.getElementById(id).appendChild(div);
		
		var paper = new Raphael(div, arcStyle.positioning.header.w, arcStyle.positioning.header.h);
		var header = paper.rect(arcStyle.positioning.header.x, arcStyle.positioning.header.x, arcStyle.positioning.header.w, arcStyle.positioning.header.h).attr({ fill: customizedColors[2], stroke: "none" });

		// header content
		headerObj.name = paper.text(arcStyle.positioning.header.name.x, arcStyle.positioning.header.name.y, json.user_info.first_name + " " + json.user_info.last_name).attr({
			"font-size": arcStyle.positioning.header.name.font_size,
			fill: customizedColors[0],
			"text-anchor": "start",
			"font-family": customizedFonts[0]
		});
		headerObj.title = paper.text(arcStyle.positioning.header.title.x, arcStyle.positioning.header.title.y + 6, trucateText(json.user_info.title, 60)).attr({
			"font-size": arcStyle.positioning.header.title.font_size,
			fill: customizedColors[1],
			"text-anchor": "start",
			"font-family": customizedFonts[1]
		});
	}
	
	function drawWorkEducationDiv(id, json) {
		timelineStartY = 730;
		timelineEndY = arcStyle.gridLine.height + arcStyle.gridLine.marginTop + sectionSpace;
		var div = createDiv('__workedu');
		document.getElementById(id).appendChild(div);
		
		var timeline = createDiv('__timeline');
		div.appendChild(timeline);
		
		//var paper = Raphael(timeline, arcStyle.positioning.header.w, arcStyle.positioning.header.h);
		var paper = new Raphael(timeline, arcStyle.positioning.header.w, arcStyle.gridLine.height + arcStyle.gridLine.marginTop + sectionSpace);
		
		//timelineStartY -= arcStyle.positioning.header.h;	// HACK
		arcStyle.gridLine.marginTop = 25; // HACK
		
		paper.image("/media/img/suitcase.png", arcStyle.gridLine.marginLeft - 30, arcStyle.gridLine.marginTop, 24, 24).attr({opacity: 0.7});
		paper.text(arcStyle.gridLine.marginLeft + 10, arcStyle.gridLine.marginTop + 15, "EMPLOYMENT & EDUCATION").attr({fill: customizedColors[0], "text-anchor": "start", "font-size": 24, "font-family": customizedFonts[2]});

		var educationTimeline = json.timeline_education;
		var workTimeline = json.timeline_work;
		var timeline_counts = json.counts;
		var educationStart = 0;
		var educationEnd = 0;
		var workStart = 0;
		var workEnd = 0;
		var timelineStart;
		var timelineEnd;

		timelineStart = Math.min(timeline_counts.year_work_began, timeline_counts.year_education_began);
		timelineEnd = Math.max(timeline_counts.year_work_ended, timeline_counts.year_education_ended);
		
		// total years in timeline
		timelineYears =  timelineEnd - timelineStart + 2;

		// define gridline
		var canvasWidth = infographicWidth - 20;
		var yearWidth = canvasWidth / timelineYears;
		var dayWidth = yearWidth / 365;
		var timelineYearsArr = [];
		for (i = 0; i < timelineYears; i++) {
			paper.path(["M", (arcStyle.gridLine.marginLeft + yearWidth * i), (arcStyle.gridLine.height + arcStyle.gridLine.marginTop + sectionSpace), "L", (arcStyle.gridLine.marginLeft + yearWidth * i), (arcStyle.gridLine.marginTop + sectionSpace)]).attr(arcStyle.gridLine.verticalAxis);
			var cursorYearFull = timelineStart + i;
			var cursorYear = cursorYearFull.toString();
			cursorYear = "'" + cursorYear.substring(2, cursorYear.length);
			if ((timelineStart + i) < (timelineEnd + 1)) {
				paper.text((arcStyle.gridLine.marginLeft + 2 + yearWidth * i), (arcStyle.gridLine.height / 2 + 12 + arcStyle.gridLine.marginTop + sectionSpace), cursorYear).attr({"text-anchor": "start", "font-size": 16, fill: customizedColors[0]});
			}
			timelineYearsArr.push(cursorYearFull);
		}
		xAxis = paper.path(["M", arcStyle.gridLine.marginLeft, (arcStyle.gridLine.height / 2 + arcStyle.gridLine.marginTop + sectionSpace), "L", (arcStyle.gridLine.marginLeft + yearWidth * (timelineYears - 1)), (arcStyle.gridLine.height / 2 + arcStyle.gridLine.marginTop + sectionSpace)]).attr(arcStyle.gridLine.horizontalAxis);

		addWorkTimeline(dayWidth, yearWidth, timelineYearsArr, workTimeline, paper); // work timeline
		addEducationTimeline(dayWidth, yearWidth, timelineYearsArr, educationTimeline, paper); // education timeline
		
		paper.setSize(infographicWidth, timelineEndY);
		
		var legend = createDiv('__legend');
		div.appendChild(legend);
		paper = new Raphael(legend, arcStyle.positioning.header.w, arcStyle.positioning.header.h);
		timelineStartY = 40;
		timelineEndY = 0;
		var height = addLegends(workTimeline, educationTimeline, paper);
		paper.setSize(infographicWidth, height);
		
	}
	function drawSkillsDiv(id, json) {
		var div = createDiv('__skills');
		document.getElementById(id).appendChild(div);
		
		timelineEndY = 0;	// HACK
		var paper = new Raphael(div, arcStyle.positioning.header.w, 40 + 230 + 40);
		addSkills(json.skills, paper); // skills
	}
	function drawExtraDiv(id, json) {
		var div = createDiv('__extra');
		document.getElementById(id).appendChild(div);
		timelineEndY = 0;		
		var height = 0;
		var displayed = false;
		var paper;
		if (customizedSections.recommendations && vizData.recommendations && vizData.recommendations.length > 0) {
			height = (vizData.recommendations.length === 1) ? 300  : Math.min(vizData.recommendations.length, 3) * 120;
			height = Math.max(425, height);
			paper = new Raphael(div, arcStyle.positioning.header.w, height + 25);
			addRecommendations(json.recommendations, paper);
			displayed = true;
        } else if (customizedSections.languages && vizData.languages && vizData.languages.length > 0) {
			height = 120 + (Math.min(vizData.languages.length, 4) * 40);
			height = Math.max(425, height);
			paper = new Raphael(div, arcStyle.positioning.header.w, height + 25);
			addLanguages(json.languages, paper);
			displayed = true;
		} else if (customizedSections.interests && vizData.interests && vizData.interests.length > 0) {
			height = 90 + (Math.min(vizData.interests.length, 4) * 80);
			height = Math.max(425, height);
			paper = new Raphael(div, arcStyle.positioning.header.w, height + 25);
			addInterests(json.interests, paper);
			displayed = true;
		}
		if (displayed) { addConnections(json.counts.connections, paper); }
		
	}
	
	function isBetweenRange(value, rangeMin, rangeMax) {
		return (value >= rangeMin && value <= rangeMax);
	}
	function isOverlap(box1, box2) {
		return (isBetweenRange(box1.x, box2.x, box2.x + box2.width)
				|| isBetweenRange(box1.x + box1.width, box2.x, box2.x + box2.width))
			&& (isBetweenRange(box1.y, box2.y, box2.y + box2.height)
				|| isBetweenRange(box1.y + box1.height, box2.y, box2.y + box2.height));
	}
	function drawSkillTitle(el) {
		var titleDiv = Viz.createTag('div', 'title');
		root = (typeof el === "string") ? document.getElementById(el) : el;
		root.appendChild(titleDiv);

		timelineEndY = -40; // HACK
		var titlePaper = new Raphael(titleDiv, arcStyle.positioning.header.w, 30);
		var skillsTitleIcon = titlePaper.path("M26.834,14.693c1.816-2.088,2.181-4.938,1.193-7.334l-3.646,4.252l-3.594-0.699L19.596,7.45l3.637-4.242c-2.502-0.63-5.258,0.13-7.066,2.21c-1.907,2.193-2.219,5.229-1.039,7.693L5.624,24.04c-1.011,1.162-0.888,2.924,0.274,3.935c1.162,1.01,2.924,0.888,3.935-0.274l9.493-10.918C21.939,17.625,24.918,16.896,26.834,14.693z");
		skillsTitleIcon.attr({fill: arcStyle.positioning.skills.fill, opacity: arcStyle.positioning.skills.opacity});
		skillsTitleIcon.translate(arcStyle.gridLine.marginLeft - 36, timelineEndY + 40).scale(0.8, 0.8).rotate(300);
		var skillsTitle = titlePaper.text(arcStyle.gridLine.marginLeft, timelineEndY + 55, "SKILLS & SPECIALTIES").attr({"text-anchor": "start", fill: customizedColors[0], "font-size": 24, "font-family": customizedFonts[2]});
	}
	function drawRecommendationTitle(el) {
		var titleDiv = Viz.createTag('div', 'title');
		root = (typeof el === "string") ? document.getElementById(el) : el;
		root.appendChild(titleDiv);

		root.style.marginTop = '48px';
		//root.style.marginBottom = '24px';

		timelineEndY = -30; // HACK
		var titlePaper = new Raphael(titleDiv, arcStyle.positioning.header.w, 30);
		
		var recIconPath = "M15.985,5.972c-7.563,0-13.695,4.077-13.695,9.106c0,2.877,2.013,5.44,5.147,7.108c-0.446,1.479-1.336,3.117-3.056,4.566c0,0,4.015-0.266,6.851-3.143c0.163,0.04,0.332,0.07,0.497,0.107c-0.155-0.462-0.246-0.943-0.246-1.443c0-3.393,3.776-6.05,8.599-6.05c3.464,0,6.379,1.376,7.751,3.406c1.168-1.34,1.847-2.892,1.847-4.552C29.68,10.049,23.548,5.972,15.985,5.972zM27.68,22.274c0-2.79-3.401-5.053-7.599-5.053c-4.196,0-7.599,2.263-7.599,5.053c0,2.791,3.403,5.053,7.599,5.053c0.929,0,1.814-0.116,2.637-0.319c1.573,1.597,3.801,1.744,3.801,1.744c-0.954-0.804-1.447-1.713-1.695-2.534C26.562,25.293,27.68,23.871,27.68,22.274z";
		var recIcon = titlePaper.path(recIconPath).attr(arcStyle.recommendations.icon).scale(1, 1.2).translate(arcStyle.gridLine.marginLeft - 30, timelineEndY + 20 + 10);
		var recText = titlePaper.text(arcStyle.gridLine.marginLeft + 15, timelineEndY + 38 + 10, "RECOMMENDATIONS").attr({"font-size": 24, "font-family": customizedFonts[2], fill: customizedColors[0], "text-anchor": "start"});
	}
	function drawLanguageTitle(el) {
		var titleDiv = Viz.createTag('div', 'title');
		root = (typeof el === "string") ? document.getElementById(el) : el;
		root.appendChild(titleDiv);

		root.style.marginTop = '48px';
		//root.style.marginBottom = '24px';

		timelineEndY = -30; // HACK
		var titlePaper = new Raphael(titleDiv, arcStyle.positioning.header.w, 30);
		
		var recIconPath = "M15.985,5.972c-7.563,0-13.695,4.077-13.695,9.106c0,2.877,2.013,5.44,5.147,7.108c-0.446,1.479-1.336,3.117-3.056,4.566c0,0,4.015-0.266,6.851-3.143c0.163,0.04,0.332,0.07,0.497,0.107c-0.155-0.462-0.246-0.943-0.246-1.443c0-3.393,3.776-6.05,8.599-6.05c3.464,0,6.379,1.376,7.751,3.406c1.168-1.34,1.847-2.892,1.847-4.552C29.68,10.049,23.548,5.972,15.985,5.972zM27.68,22.274c0-2.79-3.401-5.053-7.599-5.053c-4.196,0-7.599,2.263-7.599,5.053c0,2.791,3.403,5.053,7.599,5.053c0.929,0,1.814-0.116,2.637-0.319c1.573,1.597,3.801,1.744,3.801,1.744c-0.954-0.804-1.447-1.713-1.695-2.534C26.562,25.293,27.68,23.871,27.68,22.274z";
		var recIcon = titlePaper.path(recIconPath).attr(arcStyle.recommendations.icon).scale(1, 1.2).translate(arcStyle.gridLine.marginLeft - 30, timelineEndY + 20 + 10);
		var recText = titlePaper.text(arcStyle.gridLine.marginLeft + 15, timelineEndY + 38 + 10, "LANGUAGES").attr({"font-size": 24, "font-family": customizedFonts[2], fill: customizedColors[0], "text-anchor": "start"});
	}
	function drawInterestTitle(el) {
		var titleDiv = Viz.createTag('div', 'title');
		root = (typeof el === "string") ? document.getElementById(el) : el;
		root.appendChild(titleDiv);

		root.style.marginTop = '48px';
		//root.style.marginBottom = '24px';

		timelineEndY = -30; // HACK
		var titlePaper = new Raphael(titleDiv, arcStyle.positioning.header.w, 30);
		
		var recIconPath = "M15.985,5.972c-7.563,0-13.695,4.077-13.695,9.106c0,2.877,2.013,5.44,5.147,7.108c-0.446,1.479-1.336,3.117-3.056,4.566c0,0,4.015-0.266,6.851-3.143c0.163,0.04,0.332,0.07,0.497,0.107c-0.155-0.462-0.246-0.943-0.246-1.443c0-3.393,3.776-6.05,8.599-6.05c3.464,0,6.379,1.376,7.751,3.406c1.168-1.34,1.847-2.892,1.847-4.552C29.68,10.049,23.548,5.972,15.985,5.972zM27.68,22.274c0-2.79-3.401-5.053-7.599-5.053c-4.196,0-7.599,2.263-7.599,5.053c0,2.791,3.403,5.053,7.599,5.053c0.929,0,1.814-0.116,2.637-0.319c1.573,1.597,3.801,1.744,3.801,1.744c-0.954-0.804-1.447-1.713-1.695-2.534C26.562,25.293,27.68,23.871,27.68,22.274z";
		var recIcon = titlePaper.path(recIconPath).attr(arcStyle.recommendations.icon).scale(1, 1.2).translate(arcStyle.gridLine.marginLeft - 30, timelineEndY + 20 + 10);
		var recText = titlePaper.text(arcStyle.gridLine.marginLeft + 15, timelineEndY + 38 + 10, "INTERESTS").attr({ "font-size": 24, "font-family": customizedFonts[2], fill: customizedColors[0], "text-anchor": "start" });
	}
	
	function handleResponse(json) {
		var timelineEndY = 730;
		//drawHeaderDiv('temp4Div', json);
		var userInfo = json.user_info;
		Viz.widgets.header("temp4Div", userInfo, style.header);
		drawWorkEducationDiv('temp4Div', json);
		
		if (customizedSections.skills) {
			var skillDiv = Viz.createTag('div', '__skills');
			
			document.getElementById('temp4Div').appendChild(skillDiv);
			skillDiv.style.marginTop = '48px';
			//div.style.marginBottom = '24px';

			var skillStyle = {
				'titleStyle': {'fill': customizedColors[0], 'font-family': customizedFonts[0]},
				'textStyle': {'fill': Viz.isTooLight(customizedColors[6]) ? 'black' : customizedColors[1], 'font-family': customizedFonts[1]},
				'labelStyle': {'fill': 'black', 'font-family': customizedFonts[1]},
				'legendStyle': {'fill': 'black'},
				'circleStyle': {'fill': customizedColors[3]},
				'backgroundStyle': {'fill': 'none'},
				'newId': 'chart',
				'type': 'lola',
				'legendPosition': 'right',
				'marginVertical': 12,
				'paddingVertical': 12,
				'showTitle': 'hide'
			};
			drawSkillTitle(skillDiv);
			Viz.widgets.skillChart(skillDiv, vizData.skills, skillStyle);
		}
		//drawExtraDiv('temp4Div', json);
		if (customizedSections.interests && vizData.interests && vizData.interests.length > 0) {
			var interestDiv = Viz.createTag('div', '__interest');
			document.getElementById('temp4Div').appendChild(interestDiv);
			drawInterestTitle(interestDiv);
		    Viz.widgets.drawInterests(interestDiv, Viz.stripHidden(vizData.interests), style.interests);
		}
		if (customizedSections.languages && vizData.languages && vizData.languages.length > 0) {
			var langDiv = Viz.createTag('div', '__language');
			document.getElementById('temp4Div').appendChild(langDiv);
			var langStyle = {
				showTitle: 'hide',
				legendAlign: 'left',
				marginVertical: 1,
				marginHorizontal: 24
			};
			drawLanguageTitle(langDiv);
		    Viz.widgets.languageChart(langDiv, Viz.stripHidden(vizData.languages), langStyle);
		}
		if (customizedSections.awards && vizData.awards && vizData.awards.length > 0) {
			var awardDiv = Viz.createTag('div', '__award');
			document.getElementById('temp4Div').appendChild(awardDiv);
		    Viz.widgets.drawAwards(awardDiv, Viz.stripHidden(vizData.awards), style.awards);
		}
		if (customizedSections.myStats && vizData.mystats && vizData.mystats.length > 0) {
			var statDiv = Viz.createTag('div', '__mystat');
			document.getElementById('temp4Div').appendChild(statDiv);
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
		    Viz.widgets.myStatChart(statDiv, Viz.stripHidden(vizData.mystats), vizData.counts, statStyle);
		}
		if (customizedSections.recommendations && vizData.recommendations && vizData.recommendations.length > 0) {
			var recDiv = Viz.createTag('div', '__recommendation');
			document.getElementById('temp4Div').appendChild(recDiv);
			var recStyle = {
				showTitle: 'hide',
				legendAlign: 'left',
				'marginVertical': 1,
				'paddingVertical': 1,
				marginHorizontal: 24
			};
			drawRecommendationTitle(recDiv);
		    Viz.widgets.drawRecommendations(recDiv, Viz.stripHidden(vizData.recommendations), recStyle);
		}

	}

	// add education timeline function
	function addEducationTimeline(dayWidth, yearWidth, timelineYearsArr, workTimeline, paper) {
		var educationLegendPositions = [];
		var workTimelineYearsCount = workTimeline.length;
		var workTimeline2 = clone(workTimeline);
		var reversedWork = workTimeline2.reverse();// reverse jobs
		var orderedJobs = []; // ordered jobs by length
		var jobStartDate,
			jobEndDate,
			maxHeight = (arcStyle.gridLine.height / 2 + arcStyle.gridLine.marginTop + sectionSpace);	// HACK
		var i = 0;
		for (i = 0; i < workTimelineYearsCount; i++) {
			jobStartDate = getDateFromString(reversedWork[i].start_date);
			jobEndDate = getDateFromString(reversedWork[i].end_date);
			var jobDays = days_between(jobStartDate, jobEndDate);
			orderedJobs.push({'id': i, 'count': jobDays});
		}
		orderedJobs.sort(sortTimeline);
		var workPaths = paper.set();

		var jobYears;

		for (i = 0; i < workTimelineYearsCount; i++) {
			jobStartDate = getDateFromString(reversedWork[i].start_date);
			var jobStartYear = jobStartDate.getFullYear();
			jobEndDate = getDateFromString(reversedWork[i].end_date);
			var jobEndYear = jobEndDate.getFullYear();
			jobYears = jobEndYear - jobStartYear;

			var dateRefStart1 = new Date();
			dateRefStart1.setFullYear(jobStartYear, 0, 1);
			var dateRefEnd1 = new Date();
			dateRefEnd1.setFullYear((jobStartYear + 1), 0, 1);
			var coundDaysInStartYear = days_between(dateRefStart1, dateRefEnd1);

			var dateRefStart2 = new Date();
			dateRefStart2.setFullYear(jobEndYear, 0, 1);
			var dateRefEnd2 = new Date();
			dateRefEnd2.setFullYear((jobEndYear + 1), 0, 1);
			var coundDaysInEndYear = days_between(dateRefStart2, dateRefEnd2);
			var countJobDays = days_between(jobStartDate, jobEndDate);
			var cursorStart, cursorEnd;
			for (j = 0; j < timelineYearsArr.length; j++) {
				if (jobStartYear === timelineYearsArr[j]) {
					cursorStart = yearWidth * j;
				}
			}
			for (j = 0; j < timelineYearsArr.length; j++) {
				if (jobEndYear === timelineYearsArr[j]) {
					cursorEnd = yearWidth * j;
				}
			}
			var daysBeforeStart = days_between(dateRefStart1, jobStartDate);
			var timePast = Math.round(100 / (coundDaysInStartYear / daysBeforeStart)) * 0.01;
			var randRGB = "#" + Math.round(0xdddddd * Math.random()).toString(16);

			var thePath,
				pathX,
				pathY,
				maxPathWidth,
				scaleTest,
				newPathX,
				newPathY,
				newPathH;
				
			if (timelineYears / jobYears > 2) {
				thePath = paper.path(arcPath).attr({stroke: "none"}).translate(50 + cursorStart, arcStyle.gridLine.height / 2).scale(1, 1);
				thePath.translate(timePast * yearWidth, arcStyle.gridLine.height / 2 + arcStyle.gridLine.marginTop - thePath.getBBox().y - thePath.getBBox().width / 2 + sectionSpace);
				pathX = thePath.getBBox().x;
				pathY = thePath.getBBox().y;
				thePath.scale(0.01, 0.01);
				maxPathWidth = countJobDays * dayWidth;
				if (countJobDays * dayWidth < 100) {
					maxPathWidth += 30;
				}
				scaleTest = 0;
				while (thePath.getBBox().width < maxPathWidth) {
					thePath.scale(0.01 + scaleTest, 0.01 + scaleTest);
					scaleTest = scaleTest + 0.03;
				}
				newPathX = thePath.getBBox().x;
				newPathY = thePath.getBBox().y;
				newPathH = thePath.getBBox().height;
				thePath.attr({translation: (pathX - newPathX) + ',' + (newPathY - pathY + newPathH + 22)});
			} else {
				thePath = paper.path(wavePath).attr({stroke: "none"}).translate(50 + cursorStart, arcStyle.gridLine.height / 2).scale(1, 1);
				thePath.translate(timePast * yearWidth, arcStyle.gridLine.height / 2 + arcStyle.gridLine.marginTop - thePath.getBBox().y - thePath.getBBox().width / 2 + sectionSpace + 25);
				pathX = thePath.getBBox().x;
				pathY = thePath.getBBox().y;
				thePath.scale(0.01, 0.01);
				maxPathWidth = countJobDays * dayWidth;
				scaleTest = 0;
				while (thePath.getBBox().width < maxPathWidth) {
					thePath.scale(0.01 + scaleTest, 0.01 + scaleTest);
					scaleTest = scaleTest + 0.03;
				}
				newPathX = thePath.getBBox().x;
				newPathY = thePath.getBBox().y;
				newPathH = thePath.getBBox().height;
				thePath.attr({translation: (pathX - newPathX) + ',' + (newPathY - pathY + newPathH + 22)});
			}

			workPaths.push(thePath);

			//tooltip
			var tipText = getEducationToolTip(reversedWork[i]);
			drawTooltip(thePath.node, tipText, 'bottom center');


			//add roman letters for each arc
			var educationTitleX = thePath.getBBox().x + (thePath.getBBox().width / 2) - 4;
			var educationTitleY = thePath.getBBox().y + (thePath.getBBox().height / 2);
			var pos = { "x": educationTitleX, "y": educationTitleY};
			educationLegendPositions.push(pos);
			
			maxHeight = Math.max(maxHeight, thePath.getBBox().y + thePath.getBBox().height);	// HACK
		}
		
		var countWorkPaths = workPaths.length;
		if (countWorkPaths === 1) {
			workPaths[orderedJobs[0].id].attr({fill: customizedColors[5], opacity: 0.7});
		}
		if (countWorkPaths === 2) {
			workPaths[orderedJobs[0].id].attr({fill: customizedColors[5], opacity: 0.7});
			workPaths[orderedJobs[1].id].attr({fill: customizedColors[3], opacity: 0.7});
		}
		if (countWorkPaths > 2) {
			for (i = 0; i < countWorkPaths; i++) {
				if (i < countWorkPaths / 3) {
					workPaths[orderedJobs[i].id].attr({fill: customizedColors[5], opacity: 0.7});
				} else if (i <= countWorkPaths / 1.5) {
					workPaths[orderedJobs[i].id].attr({fill: customizedColors[3], opacity: 0.7}).toFront();
				} else {
					workPaths[orderedJobs[i].id].attr({fill: customizedColors[4], opacity: 0.7}).toFront();
				}
			}
		}

		//Draw the education legends
		for (i = 0; i < countWorkPaths; i++) {
			paper.text(educationLegendPositions[i].x, educationLegendPositions[i].y, educationLegends[countWorkPaths - i - 1]).attr({fill: "#fff", "text-anchor": "start", "font-size": 16, "font-family": customizedFonts[2]});
		}
		
		timelineEndY = maxHeight + 26;	// HACK
	}

	// add work timeline function
	function addWorkTimeline(dayWidth, yearWidth, timelineYearsArr, workTimeline, paper) {
		var deadReckoning = 25;
		//joblegend positions
		var jobLegendPositions = [];

		var workTimelineYearsCount = workTimeline.length;
		var workTimeline2 = clone(workTimeline);
		var reversedWork = workTimeline2.reverse();	// reverse jobs
		var orderedJobs = [];	// ordered jobs by length
		var conjoint = [];	// joint labels
		var conjointTip = [];	// joint Tips
		var conjointPath = [];	// joint Paths
		var jobStartDate,
			jobEndDate;
		var i = 0;
		var j = 0;
		for (i = 0; i < workTimelineYearsCount; i++) {
			jobStartDate = getDateFromString(reversedWork[i].start_date);
			jobEndDate = getDateFromString(reversedWork[i].end_date);
			var jobDays = days_between(jobStartDate, jobEndDate);
			orderedJobs.push({'id': i, 'count': jobDays});
		}
		var jobYears;
		orderedJobs.sort(sortTimeline);
		var workPaths = paper.set();
		var tipTexts = [];
		for (i = 0; i < workTimelineYearsCount; i++) {
			jobStartDate = getDateFromString(reversedWork[i].start_date);
			var jobStartYear = jobStartDate.getFullYear();
			jobEndDate = getDateFromString(reversedWork[i].end_date);
			var jobEndYear = jobEndDate.getFullYear();
			jobYears = jobEndYear - jobStartYear;

			var dateRefStart1 = new Date();
			dateRefStart1.setFullYear(jobStartYear, 0, 1);
			var dateRefEnd1 = new Date();
			dateRefEnd1.setFullYear((jobStartYear + 1), 0, 1);
			var coundDaysInStartYear = days_between(dateRefStart1, dateRefEnd1);

			var dateRefStart2 = new Date();
			dateRefStart2.setFullYear(jobEndYear, 0, 1);
			var dateRefEnd2 = new Date();
			dateRefEnd2.setFullYear((jobEndYear + 1), 0, 1);
			var coundDaysInEndYear = days_between(dateRefStart2, dateRefEnd2);
			var countJobDays = days_between(jobStartDate, jobEndDate);
			var cursorStart, cursorEnd;
			for (j = 0; j < timelineYearsArr.length; j++) {
				if (jobStartYear === timelineYearsArr[j]) {
					cursorStart = yearWidth * j;
				}
			}
			for (j = 0; j < timelineYearsArr.length; j++) {
				if (jobEndYear === timelineYearsArr[j]) {
					cursorEnd = yearWidth * j;
				}
			}
			var daysBeforeStart = days_between(dateRefStart1, jobStartDate);
			var timePast = Math.round(100 / (coundDaysInStartYear / daysBeforeStart)) * 0.01;

			var thePath,
				pathX,
				pathY,
				maxPathWidth,
				scaleTest,
				newPathX,
				newPathY;
				
			//Draws an arc if the arch does not cover more than half the years, else draws a wave
			if (timelineYears / jobYears > 2) {
				thePath = paper.path(arcPath).attr({stroke: "none"}).translate(50 + cursorStart, arcStyle.gridLine.height / 2).rotate(180).scale(1, 1);
				thePath.translate(timePast * yearWidth, arcStyle.gridLine.height / 2 + arcStyle.gridLine.marginTop - thePath.getBBox().y - thePath.getBBox().width / 2 + sectionSpace);
				pathX = thePath.getBBox().x;
				pathY = thePath.getBBox().y;
				thePath.scale(0.01, 0.01);
				maxPathWidth = countJobDays * dayWidth;
				if (countJobDays * dayWidth < 100) {
					maxPathWidth += 30;
				}
				scaleTest = 0;
				while (thePath.getBBox().width < maxPathWidth) {
					thePath.scale(0.01 + scaleTest, 0.01 + scaleTest);
					scaleTest = scaleTest + 0.03;
				}
				newPathX = thePath.getBBox().x;
				newPathY = thePath.getBBox().y;
				thePath.attr({translation: (pathX - newPathX) + ',' + (newPathY - pathY)});
			} else {
				thePath = paper.path(wavePath).attr({stroke: "none"}).translate(50 + cursorStart, arcStyle.gridLine.height / 2).rotate(180).scale(1, 1);
				thePath.translate(timePast * yearWidth, arcStyle.gridLine.height / 2 + arcStyle.gridLine.marginTop - thePath.getBBox().y - thePath.getBBox().width / 2 + sectionSpace - 20);
				pathX = thePath.getBBox().x;
				pathY = thePath.getBBox().y;
				thePath.scale(0.01, 0.01);
				maxPathWidth = countJobDays * dayWidth;
				scaleTest = 0;
				while (thePath.getBBox().width < maxPathWidth) {
					thePath.scale(0.01 + scaleTest, 0.01 + scaleTest);
					scaleTest = scaleTest + 0.03;
				}
				newPathX = thePath.getBBox().x;
				newPathY = thePath.getBBox().y;
				thePath.attr({translation: (pathX - newPathX) + ',' + (newPathY - pathY + 45)});
			}
			
			//tooltip
			var tipText = getExperienceToolTip(reversedWork[i]);
			//drawTooltip(thePath.node, tipText, 'top center');
			workPaths.push(thePath);
			tipTexts.push(tipText);
	
			//Resize the section if the arc is too big
			/* if (thePath.getBBox().width/2 > workArcMax ) {
				var ddiff = (thePath.getBBox().width/2) - workArcMax;
				timelineStartY = timelineStartY + ddiff;
				workArcMax = thePath.getBBox().width/2 ;
				alert("TimelineStary Y:" + timelineStartY);
			}
			*/
			
			//add letters for each arc
			//var jobTitleX = thePath.getBBox().x + (thePath.getBBox().width / 2) - 4;
			var jobTitleX = thePath.getBBox().x + (thePath.getBBox().width / 2);
			var jobTitleY = thePath.getBBox().y + (thePath.getBBox().height / 2);
			var pos = {"x": jobTitleX, "y": jobTitleY};
			jobLegendPositions.push(pos);	
	
			// the code below helps to add content add the beginning of the arcs
			//var jobTitle = workTimeline[i].title;
			//var jobTitleX = thePath.getBBox().x;
			//var jobStartDot = r.circle(jobTitleX,xAxis.getBBox().y-2-2,4).attr({stroke:'darkGrey',fill:"#FFF"});
			//var jobTitleText = r.text(jobTitleX,64,jobTitle).attr({"text-anchor":"start","font-family":customizedFonts[2],"font-size":16,fill:"#fff"});
			//r.rect(jobTitleX-4,54,jobTitleText.getBBox().width*1.2+8,22,4).attr({stroke:"none",fill:"darkGrey",opacity:.8}).toBack()
			//jobTitleText.translate(-jobTitleText.getBBox().width/2,0)
		}
		var countWorkPaths = workPaths.length;
		if (countWorkPaths === 1) {
			workPaths[orderedJobs[0].id].attr({fill: customizedColors[5]});
		}
		if (countWorkPaths === 2) {
			workPaths[orderedJobs[0].id].attr({fill: customizedColors[5]});
			workPaths[orderedJobs[1].id].attr({fill: customizedColors[3]});
		}
		if (countWorkPaths > 2) {
			for (i = 0; i < countWorkPaths; i++) {
				var newFill;
				if (i < countWorkPaths / 3) {
					newFill = customizedColors[5];
				} else if (i <= countWorkPaths / 1.5) {
					newFill = customizedColors[3];
				} else {
					newFill = customizedColors[4];
				}
				workPaths[orderedJobs[i].id].attr({fill: newFill, opacity: 0.7, stroke: "none"}).toFront();
			}
		}

		//Draw the labels
		for (i = 0; i < countWorkPaths; i++) {
			var placeQTip = true;
			// Center
			var workLabel = paper.text(jobLegendPositions[i].x, jobLegendPositions[i].y, jobLegends[countWorkPaths - i - 1]).attr({fill: "#fff", "text-anchor": "middle", "font-size": 16, "font-family": customizedFonts[2]});
			
			//alert("Label:" + jobLegends[countWorkPaths - i - 1] + "\nX: " + label.getBBox().x + "\nWidth: " + label.getBBox().width);
			for (j = 0; j < countWorkPaths; j++) {
				if (j !== i) {
					if (isOverlap(workLabel.getBBox(), workPaths[j].getBBox())) {
						// The text overlaps other boxes, trigger algorithm to move text around
						//alert(workPaths[i].getBBox().x + " " + workPaths[j].getBBox().x);
						//alert(workPaths[i].getBBox().width + " " + workPaths[j].getBBox().width);
						if (isBetweenRange(workPaths[i].getBBox().x, workPaths[j].getBBox().x - deadReckoning, workPaths[j].getBBox().x + deadReckoning)
								&& isBetweenRange(workPaths[i].getBBox().width, workPaths[j].getBBox().width - deadReckoning, workPaths[j].getBBox().width + deadReckoning)) {
							// Overlaps enough to conjoin
							if (conjoint[j]) {
								conjoint[j].push(jobLegends[countWorkPaths - i - 1]);
								conjointTip[j].push(tipTexts[i]);
								conjointPath[j].push(workPaths[i]);
							} else {
								conjoint[i] = [jobLegends[countWorkPaths - i - 1]];
								conjointTip[i] = [tipTexts[i]];
								conjointPath[i] = [workPaths[i]];
							}
							workLabel.remove();
							//placeQTip = false;
						//} else if () {
						}
					}
				}
			}
			if (placeQTip) {
				drawTooltip(workPaths[i].node, tipTexts[i], 'top center');
			}
		}
		for (i in conjoint) {
			if (conjoint.hasOwnProperty(i)) {
				var text = conjoint[i].join('');
				var tip = conjointTip[i].join('<br /><br />');
				
				var label = paper.text(jobLegendPositions[i].x, jobLegendPositions[i].y, text).attr({fill: "#fff", "text-anchor": "middle", "font-size": 16, "font-family": customizedFonts[2]});
				//alert(tip);
				drawTooltip(label.node, tip, 'top center');
				for (j in conjointPath)	{
					if (conjointPath.hasOwnProperty(j)) {
						drawTooltip(conjointPath[j].node, tip, 'top center');
					}
				}
			}
		}
		/*
		//Draw the work legends
		for (i = 0; i < countWorkPaths; i++) {
			paper.text(jobLegendPositions[i].x, jobLegendPositions[i].y, jobLegends[countWorkPaths - i - 1]).attr({fill: "#fff", "text-anchor": "start", "font-size": 16, "font-family": customizedFonts[2]});
		}
		*/
	}

	function addLegends(workTimeline, educationTimeline, paper) {
		var workTimelineYearsCount = workTimeline.length;
		var eduTimelineYearsCount = educationTimeline.length;
		var height;
		var title;
		
		var k = 0;
		for (i = workTimelineYearsCount; i > 0; i--) {
			var workTitle = (workTimeline[workTimelineYearsCount - i].position ? workTimeline[workTimelineYearsCount - i].position : '') + (workTimeline[workTimelineYearsCount - i].company ? " @ " + workTimeline[workTimelineYearsCount - i].company : '');
			
			paper.text(arcStyle.gridLine.marginLeft, timelineStartY + (k * 25), jobLegends[workTimelineYearsCount - i] + ". ").attr({fill: "#000", "text-anchor": "start", "font-size": 18, "font-family": customizedFonts[2]}).toFront();

			if (workTitle.length > 50) {
				var workLines = Math.ceil(workTitle.length / 50);
				title = paper.text(arcStyle.gridLine.marginLeft + 20, timelineStartY + 10 + (k * 25), workTitle.wordWrap(40, "\n", 1)).attr({fill: "#000", "text-anchor": "start", "font-size": 18, "font-family": customizedFonts[2]}).toFront();
				k = k + workLines;
			} else {
				title = paper.text(arcStyle.gridLine.marginLeft + 20, timelineStartY + (k * 25), workTitle).attr({fill: "#000", "text-anchor": "start", "font-size": 18, "font-family": customizedFonts[2]}).toFront();
				k++;
			}
		}
	
		var j = 0;
		for (i = eduTimelineYearsCount; i > 0; i--) {
			var eduTitle = (educationTimeline[eduTimelineYearsCount - i].degree ? educationTimeline[eduTimelineYearsCount - i].degree : '') + (educationTimeline[eduTimelineYearsCount - i].school ? ' @ ' + educationTimeline[eduTimelineYearsCount - i].school : '');
			
			paper.text(arcStyle.gridLine.marginLeft + 500, timelineStartY + (j * 25), educationLegends[eduTimelineYearsCount - i] + ". ").attr({fill: "#000", "text-anchor": "start", "font-size": 18, "font-family": customizedFonts[2]}).toFront();

			if (eduTitle.length > 40) {
				var eduLines = Math.ceil(eduTitle.length / 40);
				title = paper.text(arcStyle.gridLine.marginLeft + 530, timelineStartY + 10 + (j * 25), eduTitle.wordWrap(40, "\n", 1)).attr({fill: "#000", "text-anchor": "start", "font-size": 18, "font-family": customizedFonts[2]}).toFront();
				j = j + eduLines;
			} else {
				title = paper.text(arcStyle.gridLine.marginLeft + 530, timelineStartY + (j * 25), eduTitle).attr({fill: "#000", "text-anchor": "start", "font-size": 18, "font-family": customizedFonts[2]}).toFront();
				j++;
			}		
		}
	
		if (k > j) {
			height = k * 25 + 50;
		} else {
			height = j * 25 + 50;
		}

		paper.rect(arcStyle.positioning.timeline.legend.x, timelineStartY - 40, arcStyle.positioning.timeline.legend.w, height).attr({fill: customizedColors[5], stroke: "none"}).toBack();
		
		timelineEndY = timelineStartY - 40 + height;
		return height;
	}

	function addSkills(skills, paper) {

		var countSkills = skills.length;

		if (countSkills > 0) {

			var skillsTitleIcon = paper.path("M26.834,14.693c1.816-2.088,2.181-4.938,1.193-7.334l-3.646,4.252l-3.594-0.699L19.596,7.45l3.637-4.242c-2.502-0.63-5.258,0.13-7.066,2.21c-1.907,2.193-2.219,5.229-1.039,7.693L5.624,24.04c-1.011,1.162-0.888,2.924,0.274,3.935c1.162,1.01,2.924,0.888,3.935-0.274l9.493-10.918C21.939,17.625,24.918,16.896,26.834,14.693z");
			skillsTitleIcon.attr({fill: arcStyle.positioning.skills.fill, opacity: arcStyle.positioning.skills.opacity});
			skillsTitleIcon.translate(arcStyle.gridLine.marginLeft - 36, timelineEndY + 40).scale(0.8, 0.8).rotate(300);
			var skillsTitle = paper.text(arcStyle.gridLine.marginLeft, timelineEndY + 55, "SKILLS & SPECIALTIES").attr({"text-anchor": "start", fill: customizedColors[0], "font-size": 24, "font-family": customizedFonts[2]});

			countSkills = Math.min(countSkills, 6);
			
			for (i = 0; i < countSkills; i++) {
				var skillBack = paper.circle(100 + i * 135, timelineEndY + 40 + 140, 65);
				skillBack.attr({"fill": customizedColors[2],
									"stroke": "none",
									"opacity": 0.9
								});
				drawTooltip(skillBack.node, getSkillsTooltip(skills[i]));
				var skillName = skills[i].name;
				if (skillName.length > 12) {
					var skillArr = [];
					skillArr = skillName.split(' ');
					var newSkillName = '';
					for (j = 0; j < skillArr.length; j++) {
						newSkillName = newSkillName + skillArr[j] + '\n';
					}
					skillName = newSkillName;
				}

				var skillYears = (skills[i].years) ? (skills[i].years + "+ years") : "";
				var skillText = paper.text(100 + i * 135, timelineEndY + 40 + 140, skillName).attr({"font-size": 15, "font-family": customizedFonts[2], fill: customizedColors[1], stroke: "none"});
				drawTooltip(skillText.node, getSkillsTooltip(skills[i]));
				var skillPro = paper.text(100 + i * 135, timelineEndY + 40 + 230, (skills[i].proficiency || " ") + "\n" + skillYears).attr({"font-size": 15, "font-family": customizedFonts[2], fill: customizedColors[3], stroke: "none", "opacity": 0.9});
			}

			timelineEndY = timelineEndY + 40 + 230 + 40;

		}
	}

	function addRecommendations(rec, paper) {
		var countRecs = rec.length;
		if (countRecs > 0) {
			var recIconPath = "M15.985,5.972c-7.563,0-13.695,4.077-13.695,9.106c0,2.877,2.013,5.44,5.147,7.108c-0.446,1.479-1.336,3.117-3.056,4.566c0,0,4.015-0.266,6.851-3.143c0.163,0.04,0.332,0.07,0.497,0.107c-0.155-0.462-0.246-0.943-0.246-1.443c0-3.393,3.776-6.05,8.599-6.05c3.464,0,6.379,1.376,7.751,3.406c1.168-1.34,1.847-2.892,1.847-4.552C29.68,10.049,23.548,5.972,15.985,5.972zM27.68,22.274c0-2.79-3.401-5.053-7.599-5.053c-4.196,0-7.599,2.263-7.599,5.053c0,2.791,3.403,5.053,7.599,5.053c0.929,0,1.814-0.116,2.637-0.319c1.573,1.597,3.801,1.744,3.801,1.744c-0.954-0.804-1.447-1.713-1.695-2.534C26.562,25.293,27.68,23.871,27.68,22.274z";
			var recIcon = paper.path(recIconPath).attr(arcStyle.recommendations.icon).scale(1, 1.2).translate(arcStyle.gridLine.marginLeft - 30, timelineEndY + 20 + 10);
			var recText = paper.text(arcStyle.gridLine.marginLeft + 15, timelineEndY + 38 + 10, "RECOMMENDATIONS").attr({"font-size": 24, "font-family": customizedFonts[2], fill: customizedColors[0], "text-anchor": "start"});
			var recBackPath = "M576.667,46.208c0,4.12-5.372,7.459-12,7.459H12c-6.627,0-12-3.34-12-7.459V7.459C0,3.339,5.373,0,12,0h552.667c6.628,0,12,3.339,12,7.459V46.208z M28.135,53.667l24.631,22.259l-6.961-22.259";
			countRecs = Math.min(countRecs, 3);

			for (i = 0; i < countRecs; i++) {
				var recBack = paper.path(recBackPath).attr({"fill": customizedColors[2],
															"stroke": customizedColors[2],
															"stroke-width": 3,
															"stroke-opacity": 0.5}).scale(1, 0.7).translate(40, timelineEndY + 60 + i * 100 + 10);
				//tooltip
				drawTooltip(recBack.node, rec[i].content.recommendationText);
				var recBackShadow = paper.path(recBackPath).attr(arcStyle.recommendations.bubbleShadow).scale(1, 0.7).translate(44, timelineEndY + 64 + i * 100 + 10);
				drawTooltip(recBackShadow.node, rec[i].content.recommendationText);

				var rectTextString = rec[i].content.recommendationText;
				if (rectTextString.length > 85) {
					rectTextString = rectTextString.substring(0, 85) + '\n' + (rectTextString.substring(85, 160) + '...').replace(
						// Replace out the new line character.
						new RegExp("\\n", "g"), 
						" "
					);
				}
				var displayText = getWrappedText(clone(rec[i].content.recommendationText), 200, 80, 2);
				var displayRecText = paper.text(50, timelineEndY + 100 + i * 100, displayText).attr({fill: customizedColors[1],
						"text-anchor": "start",
						"font-size": 13,
						"font-family": customizedFonts[2]});
				drawTooltip(displayRecText.node, rec[i].content.recommendationText);
				if (typeof (rec[i].content.recommender) === 'object') {
					var recAuthor = rec[i].content.recommender.firstName + ' ' + rec[i].content.recommender.lastName;
					var recAuthorText = paper.text(105, timelineEndY + 140 + i * 100, recAuthor).attr({fill: customizedColors[3],
						"text-anchor": "start",
						"font-size": 16,
						"font-family": customizedFonts[2]});

				}
			}
		}
		infographicMaxHeight = timelineEndY + 140 + 200;
	}

	function addLanguages(languages, paper) {
		var countLang = languages.length;

		if (countLang > 0) {
			var recIconPath = "M15.985,5.972c-7.563,0-13.695,4.077-13.695,9.106c0,2.877,2.013,5.44,5.147,7.108c-0.446,1.479-1.336,3.117-3.056,4.566c0,0,4.015-0.266,6.851-3.143c0.163,0.04,0.332,0.07,0.497,0.107c-0.155-0.462-0.246-0.943-0.246-1.443c0-3.393,3.776-6.05,8.599-6.05c3.464,0,6.379,1.376,7.751,3.406c1.168-1.34,1.847-2.892,1.847-4.552C29.68,10.049,23.548,5.972,15.985,5.972zM27.68,22.274c0-2.79-3.401-5.053-7.599-5.053c-4.196,0-7.599,2.263-7.599,5.053c0,2.791,3.403,5.053,7.599,5.053c0.929,0,1.814-0.116,2.637-0.319c1.573,1.597,3.801,1.744,3.801,1.744c-0.954-0.804-1.447-1.713-1.695-2.534C26.562,25.293,27.68,23.871,27.68,22.274z";
			var recIcon = paper.path(recIconPath).attr(arcStyle.recommendations.icon).scale(1, 1.2).translate(arcStyle.gridLine.marginLeft - 30, timelineEndY + 20 + 10);
			var recText = paper.text(arcStyle.gridLine.marginLeft + 15, timelineEndY + 38 + 10, "LANGUAGES").attr({"font-size": 24, "font-family": customizedFonts[2], fill: customizedColors[0], "text-anchor": "start"});
			var recBackPath = "M499,51.44c0,4.971-4.889,9-10.92,9H91.24c-6.031,0-10.92-4.029-10.92-9V0.209c0-4.971,4.889-9,10.92-9h396.84c6.031,0,10.92,4.029,10.92,9V51.44z";
			countLang = Math.min(countLang, 4);
			for (i = 0; i < countLang; i++) {
				var recBack = paper.path(recBackPath).attr({"fill": customizedColors[2],
														"stroke": customizedColors[2],
														"stroke-width": 3,
														"stroke-opacity": 0.5}).scale(1, 0.7).translate(40, timelineEndY + 80 + i * 80 + 10);
				// var recBackShadow = paper.path(recBackPath).attr(arcStyle.recommendations.bubbleShadow).scale(1,.7).translate(44,timelineEndY + 64+i*100 + 10)


				var langTextString = languages[i].name;
				if (langTextString.length > 35) {
					langTextString = langTextString.substring(0, 35) + ' ...';
				}

				paper.text(320, timelineEndY + 115 + i * 80, langTextString).attr({fill: customizedColors[1],
																								"text-anchor": "middle",
																								"font-size": 18,
																								"font-family": customizedFonts[2]});
			}

			infographicMaxHeight = timelineEndY + 140 + 200;

		}
	}

	function addInterests(interests, paper) {

		var countLang = interests.length;

		var recIconPath = "M15.985,5.972c-7.563,0-13.695,4.077-13.695,9.106c0,2.877,2.013,5.44,5.147,7.108c-0.446,1.479-1.336,3.117-3.056,4.566c0,0,4.015-0.266,6.851-3.143c0.163,0.04,0.332,0.07,0.497,0.107c-0.155-0.462-0.246-0.943-0.246-1.443c0-3.393,3.776-6.05,8.599-6.05c3.464,0,6.379,1.376,7.751,3.406c1.168-1.34,1.847-2.892,1.847-4.552C29.68,10.049,23.548,5.972,15.985,5.972zM27.68,22.274c0-2.79-3.401-5.053-7.599-5.053c-4.196,0-7.599,2.263-7.599,5.053c0,2.791,3.403,5.053,7.599,5.053c0.929,0,1.814-0.116,2.637-0.319c1.573,1.597,3.801,1.744,3.801,1.744c-0.954-0.804-1.447-1.713-1.695-2.534C26.562,25.293,27.68,23.871,27.68,22.274z";
		var recIcon = paper.path(recIconPath).attr(arcStyle.recommendations.icon).scale(1, 1.2).translate(arcStyle.gridLine.marginLeft - 30, timelineEndY + 20 + 10);
		var recText = paper.text(arcStyle.gridLine.marginLeft + 15, timelineEndY + 38 + 10, "INTERESTS").attr({ "font-size": 24, "font-family": customizedFonts[2], fill: customizedColors[0], "text-anchor": "start" });

		if (countLang > 0) {
			var recBackPath = "M499,51.44c0,4.971-4.889,9-10.92,9H91.24c-6.031,0-10.92-4.029-10.92-9V0.209c0-4.971,4.889-9,10.92-9h396.84c6.031,0,10.92,4.029,10.92,9V51.44z";
			countLang = Math.min(countLang, 4);
			for (i = 0; i < countLang; i++) {
				if (interests[i]) {
					var recBack = paper.path(recBackPath).attr({ "fill": customizedColors[2],
								"stroke": customizedColors[2],
								"stroke-width": 3,
								"stroke-opacity": 0.5
							}).scale(1, 0.7).translate(40, timelineEndY + 80 + i * 80 + 10);
					// var recBackShadow = paper.path(recBackPath).attr(arcStyle.recommendations.bubbleShadow).scale(1,.7).translate(44,timelineEndY + 64+i*100 + 10)

					var langTextString = interests[i].name;
					if (langTextString.length > 35) {
						langTextString = langTextString.substring(0, 35) + ' ...';
					}
					paper.text(320, timelineEndY + 115 + i * 80, langTextString).attr({ fill: customizedColors[1],
								"text-anchor": "middle",
								"font-size": 18,
								"font-family": customizedFonts[2]
							});
				}
			}
			infographicMaxHeight = timelineEndY + 140 + 200;
		}
	}



	function addConnections(count, paper) {
		var countBackPath = "M26,51.875c-1.103,0-2.085-1.22-3.035-2.4c-0.864-1.073-1.68-2.086-2.63-2.34c-0.186-0.05-0.393-0.075-0.613-0.075c-0.886,0-1.938,0.404-2.954,0.795c-0.983,0.378-2,0.769-2.819,0.769c-0.352,0-0.643-0.07-0.891-0.213c-0.924-0.535-1.163-2.062-1.393-3.539c-0.206-1.322-0.419-2.689-1.134-3.404c-0.716-0.716-2.084-0.929-3.408-1.136c-1.476-0.23-3.001-0.468-3.535-1.391c-0.523-0.903,0.025-2.33,0.556-3.709c0.486-1.263,0.988-2.568,0.72-3.567c-0.254-0.951-1.268-1.768-2.342-2.633C1.344,28.083,0.125,27.101,0.125,26s1.219-2.083,2.398-3.032c1.074-0.865,2.088-1.682,2.342-2.633c0.268-0.999-0.234-2.304-0.72-3.567c-0.53-1.379-1.079-2.806-0.556-3.709c0.534-0.923,2.06-1.161,3.535-1.391c1.323-0.207,2.692-0.42,3.408-1.136s0.929-2.084,1.136-3.407c0.23-1.476,0.468-3.001,1.391-3.536c0.248-0.144,0.539-0.213,0.891-0.213c0.818,0,1.835,0.391,2.818,0.769c1.017,0.391,2.069,0.795,2.955,0.795c0.22,0,0.427-0.025,0.613-0.075c0.951-0.254,1.768-1.268,2.633-2.342C23.917,1.344,24.899,0.125,26,0.125s2.083,1.219,3.032,2.398c0.865,1.074,1.682,2.088,2.633,2.342c0.187,0.05,0.393,0.075,0.613,0.075c0.886,0,1.938-0.404,2.955-0.795c0.983-0.378,2-0.769,2.819-0.769c0.351,0,0.642,0.07,0.89,0.213c0.922,0.534,1.161,2.061,1.391,3.536c0.206,1.323,0.42,2.692,1.136,3.407c0.715,0.716,2.083,0.929,3.405,1.136c1.476,0.231,3.002,0.469,3.536,1.393c0.523,0.903-0.025,2.33-0.555,3.708c-0.485,1.262-0.987,2.567-0.719,3.566c0.254,0.951,1.268,1.768,2.341,2.633c1.178,0.949,2.397,1.931,2.397,3.032s-1.219,2.083-2.398,3.033c-1.073,0.864-2.087,1.681-2.341,2.632c-0.267,0.999,0.235,2.303,0.72,3.565c0.53,1.38,1.079,2.807,0.556,3.711c-0.534,0.923-2.06,1.161-3.535,1.391c-1.323,0.207-2.692,0.42-3.408,1.136c-0.714,0.715-0.928,2.083-1.134,3.404c-0.23,1.477-0.469,3.004-1.393,3.539c-0.248,0.144-0.539,0.213-0.891,0.213c-0.819,0-1.835-0.391-2.819-0.77c-1.017-0.391-2.067-0.795-2.953-0.795c-0.22,0-0.426,0.025-0.612,0.075c-0.951,0.254-1.768,1.268-2.633,2.342C28.083,50.656,27.101,51.875,26,51.875L26,51.875z";
		var countBack = paper.path(countBackPath);
		countBack.attr({"fill": customizedColors[2],
					"stroke": "none"}).translate(780, timelineEndY + 150).scale(4, 4);
		countText = paper.text(812, timelineEndY + 150 + 15, count + "+").attr({fill: customizedColors[0],
																				"font-size": 58,
																				"font-family": customizedFonts[2]});
		var countTitle = paper.text(812, timelineEndY + 150 + 15 + 40, "CONNECTIONS").attr({fill: customizedColors[1],
																							"font-size": 18,
																							"font-family": customizedFonts[2]});
	}

	function resizeCanvas() {
		paper.setSize(infographicWidth, infographicMaxHeight + 100);
		paper.rect(0, 0, 960, infographicMaxHeight + 100).attr({stroke: "none", fill: customizedColors[6]}).toBack();
	}

	function days_between(a, b) {
		var c = a.getTime(), 
			d = b.getTime();
		return Math.round(Math.abs(c - d) / 864E5);
	}
	function sortTimeline(a, b) {
		return b.count - a.count;
	}
}());       //NameSpace

String.prototype.wordWrap = function (m, b, c) {
	var i, j, l, s, r;
	if (m < 1) { return this; }
	for (i = -1, l = (r = this.split("\n")).length; ++i < l; r[i] += s) {
		for (s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : "")) {
			j = c === 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length
				|| (c === 1 && m) || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
		}
	}
	return r.join("\n");
};


var temp4Style = {
    "fonts": {
        // http://new.myfonts.com/fonts/exljbris/museo-slab-slab/500/
        "title": "museo-slab",
        // http://new.myfonts.com/fonts/cheapprofonts/familiar-pro/bold/
        "content": "Familar Pro Bold"
    },
    "colors": {
        // these colors will be the only ones used throughout the template
        "title": "#007eff", //blue
        "content": "#fff", //white
        "arc_pink": "#dd0083", //magenta
        "arc_dimGray": "#313843", //dark grey
        "arc_beige": "#c1b79f" //beige
    },
    "positioning": {
        "header": {
            "x": 0, //positioning in pixels
            "y": 0,
            "w": 960,
            "h": 134,
            // user name ex. bob
            "name": {
                "x": 34,
                "y": 48,
                "w": 864,
                "h": 40,
                "font_size": 56 //56pt
            },
            // user title ex. designer
            "title": {
                "x": 34,
                "y": 88,
                "w": 864,
                "h": 20,
                "font_size": 27
            }
        },
        "timeline": {
            "icon": {
                "x": 34,
                "y": 208,
                "w": 40,
                "h": 40
            },
            "title": {
                "x": 80,
                "y": 214,
                "w": 816,
                "h": 22,
                "font_size": 30
            },
            // Where the job titles go
            "legend": {
                // background fill = beige
                "x": 0,
                "y": 768, // TODO: set equal to timeline.y + timeline.h
                "w": 960,
                "h": 240,
                "font_size": 18, // may have to go 16pt. grey and magenta, fonts.title

                "work": {
                    "x": 80,
                    "y": 800, // TODO: set equal to timeline.legend.y + 32px
                    "w": 505,
                    "h": 166,
                    "text_align": "left"
                },

                "education": {
                    "x": 616,
                    "y": 800, // TODO: set equal to timeline.legend.y + 32px
                    "w": 282,
                    "h": 166,
                    "text_align": "right"
                }
            }
        },
        "skills": {
            "fill": "#313843",
            "opacity": 0.8,
            "back": {
                "fill": "#313843",
                "stroke": "none",
                "opacity": 0.9
            },
            "textStyle": {
                "fill": "#FFF",
                "font-family": "museo-slab",
                "font-size": 15
            },
            "proficiency": {
                "fill": "#dd0083",
                "font-family": "museo-slab",
                "font-size": 15
            }
        },
        "icon": {
            "x": 34,
            "y": 1056, // TODO: set equal to skills.y + 44
            "w": 40,
            "h": 40
        },
        "title": {
            "x": 80,
            "y": 1062, // TODO: set equal to skills.y + 50
            "w": 816,
            "h": 22,
            "font_size": 30
        }
    },
    "vanity": {
        // background fill = beige
        "x": 0,
        "y": 1344, // TODO: set equal to skills.y + skills.h
        "w": 960,
        "h": 528,
        "recommendations": {
            "comment_font_size": 18,
            "recommender_font_size": 24
        },
        "conections": {
            "num_font_size": 88,
            "connections_font_size": 24
        }
    },
    "footer": {
        // background fill = grey
        "x": 0,
        "y": 1872, // TODO: set equal to vanity.y + vanity.h
        "w": 960,
        "h": 128,
        "font_size": 16, // blue - fonts.title ; white - fonts.content
        "logo": {
            "x": 768,
            "y": 1952 // TODO: set equal to footer.y + 80px
        }
    },
    gridLine: {
        marginTop: 80,
        marginLeft: 50,
        height: 400,
        horizontalAxis: { stroke: "#000", "stroke-width": 2, opacity: 0.5 },
        verticalAxis: { stroke: "#FFF" }
    },
    recommendations: {
        "title": {
            "fill": "#007eff",
            "text-anchor": "start",
            "font-size": 16,
            "font-family": "museo-slab"
        },
        "icon": {
            "fill": "#313843",
            "stroke": "none",
            "opacity": 0.8
        },
        "bubbleBack": {
            "fill": "#313843",
            "stroke": "#313843",
            "stroke-width": 3,
            "stroke-opacity": 0.5
        },
        "bubbleShadow": {
            "fill": "#313843",
            "stroke": "#313843",
            "stroke-width": 3,
            "stroke-opacity": 0.5,
            "opacity": 0.3
        },
        "commentStyle": {
            fill: "#FFF",
            "text-anchor": "start",
            "font-size": 13,
            "font-family": "museo-slab"
        },
        "author": {
            "fill": "#dd0083",
            "text-anchor": "start",
            "font-size": 16,
            "font-family": "museo-slab"
        }
    },
    connections: {
        "title": {
            "fill": "#fff",
            "font-size": 18,
            "font-family": "museo-slab"
        },
        "countText": {
            "fill": "#007eff",
            "font-size": 58,
            "font-family": "museo-slab"
        },
        "countBack": {
            "fill": "#313843",
            "stroke": "none"
        }
    }
};

var arcStyle = {
    "fonts" : {
        // http://new.myfonts.com/fonts/exljbris/museo-slab/500/
        "title" : "museo-slab",
        // http://new.myfonts.com/fonts/cheapprofonts/familiar-pro/bold/
        "content" : "Familar Pro Bold"
    },
    "colors" : {
        // these colors will be the only ones used throughout the template
        "title" : "#007eff", //blue
        "content" : "#fff", //white
        "arc_pink" : "#dd0083", //magenta
        "arc_dimGray" : "#313843", //dark grey
        "arc_beige" : "#c1b79f" //beige
    },
    "positioning" : {
        "header" : {
            "x" : 0, //positioning in pixels
            "y" : 0,
            "w" : 960,
            "h" : 120,
            // user name ex. bob
            "name": {
                "x" : 34,
                "y" : 48,
                "w" : 864,
                "h" : 40,
                "font_size": 56 //56pt
            },
            // user title ex. designer
            "title" : {
                "x" : 34,
                "y" : 88,
                "w" : 864,
                "h" : 20,
                "font_size" : 27
            }
        },
        "timeline" : {

            "icon" : {
                "x" : 34,
                "y" : 208,
                "w" : 40,
                "h" : 40
            },
            "title" : {
                "x" : 80,
                "y" : 214,
                "w" : 816,
                "h" : 22,
                "font_size": 30
            },
            // Where the job titles go
            "legend" : {
                // background fill = beige
                "x" : 0,
                "y" : 730, // TODO: set equal to timeline.y + timeline.h
                "w" : 960,
                "h" : 240,
                "font_size" : 18, // may have to go 16pt. grey and magenta, fonts.title

                "work" : {
                    "x" : 80,
                    "y" : 800, // TODO: set equal to timeline.legend.y + 32px
                    "w" : 505,
                    "h" : 166,
                    "text_align" : "left"
                },

                "education" : {
                    "x" : 616,
                    "y" : 800, // TODO: set equal to timeline.legend.y + 32px
                    "w" : 282,
                    "h" : 166,
                    "text_align" : "right"
                }
            }
        },
        "skills" : {
            "fill": "#313843",
			"opacity": 0.8,
			"back": {
				"fill": "#313843",
				"stroke": "none",
				"opacity": 0.9
			},
			"textStyle": {
				"fill": "#FFF",
				"font-family": "museo-slab",
				"font-size": 15
			},
			"proficiency": {
				"fill": "#dd0083",
				"font-family": "museo-slab",
				"font-size": 15			
			},
            "icon" : {
                "x" : 34,
                "y" : 900, // TODO: set equal to skills.y + 44
                "w" : 40,
                "h" : 40
            },
            "title" : {
                "x" : 80,
                "y" : 1062, // TODO: set equal to skills.y + 50
                "w" : 816,
                "h" : 22,
                "font_size": 30
            }
        },
        "vanity" : {
            // background fill = beige
            "x" : 0,
            "y" : 1344, // TODO: set equal to skills.y + skills.h
            "w" : 960,
            "h" : 528,
            "recommendations" : {
                "comment_font_size" : 18,
                "recommender_font_size" : 24
            },
            "conections" : {
                "num_font_size" : 88,
                "connections_font_size" : 24
			}
        },
        "footer" : {
            // background fill = grey
            "x" : 0,
            "y" : 1872, // TODO: set equal to vanity.y + vanity.h
            "w" : 960,
            "h" : 128,
            "font_size": 16, // blue - fonts.title ; white - fonts.content
            "logo" : {
                "x" : 768,
                "y" : 1952 // TODO: set equal to footer.y + 80px
            }
        }
    },
	gridLine : {
		marginTop: 160,
		marginLeft: 50,			
		height: 400,
		horizontalAxis: {stroke: "#000", "stroke-width": 2, opacity: 0.5},
		verticalAxis: {stroke: "#FFF"}
	},
	recommendations: {
		"title": {
			"fill": "#007eff",
			"text-anchor": "start",
			"font-size": 24,
			"font-family": "museo-slab",
			"text_align" : "left"
		},
		"icon": {
			"fill": "#313843",
			"stroke": "none",
			"opacity": 0.8			
		},
		"bubbleBack": {
			"fill": "#313843",
			"stroke": "#313843",
			"stroke-width": 3,
			"stroke-opacity": 0.5
		},
		"bubbleShadow": {
			"fill": "#313843",
			"stroke": "#313843",
			"stroke-width": 3,
			"stroke-opacity": 0.5,
			"opacity": 0.3
		},
		"commentStyle": {
			fill: "#FFF",
			"text-anchor": "start",
			"font-size": 13,
			"font-family": "museo-slab"
		},
		"author": {
			"fill": "#dd0083",
			"text-anchor": "start",
			"font-size": 16,
			"font-family": "museo-slab"
		}
	},
	connections: {
		"title": {
			"fill": "#fff",
			"font-size": 18,
			"font-family": "museo-slab"
		},
		"countText": {
			"fill": "#007eff",
			"font-size": 58,
			"font-family": "museo-slab"
		},
		"countBack": {
			"fill": "#313843",
			"stroke": "none"
		}
	}
};