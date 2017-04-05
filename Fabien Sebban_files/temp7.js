var temp7 = {
	default_colors: ["#ffffff", "#ffffff", "#B0C087", "#FAAF40", "#775961", "#559FC7", "#000"],
	default_fonts: ["Arial", "museo-slab", "Arial"],
	getDefaultColors: function () {
		return Viz.clone(temp7.default_colors);
	},
	getDefaultFonts: function () {
		return Viz.clone(temp7.default_fonts);
	},
	generate: function () {
		// TODO: Depreciate. Why do we call these when we have getDefault function calls already?
		if (!customizedColors) {
			customizedColors = Viz.clone(temp7.default_colors);
		}
		if (!customizedFonts) {
			console.log("Is there a problem officer?");
			customizedFonts = Viz.clone(temp7.default_fonts);
		}
		var drawTitle = function (icon, text) {
			var titleOptions = {
				className: "icon", 
				color: Viz.isTooLight(customizedColors[2]) ? "black" : customizedColors[2], 
				style: {
					'padding': "12px 48px 24px 35px"
				}, 
				textStyle: {
					"font-size": "24px",
					"font-weight": "bold",
					"font-family": customizedFonts[1]
				}
			};
			$.extend(titleOptions, {icon: icon, text: text});
			$("#infographic").append(Viz.widget.create("viz.title", titleOptions));
		};
		var headerStyle = {
			style: {
				'background-color': customizedColors[2],
				'padding': "24px 48px 24px 48px",
				'text-align': "center"
			},
			nameStyle: {
				//'font-family': 'Helvetica',
				'font-size': "50px",
				'color': customizedColors[0],
				'text-align': "left",
				'font-weight': "bold",
				'font-family': customizedFonts[0],
			},
			titleStyle: {
				'font-family': customizedFonts[1],
				'font-size': "24px",
				'color': customizedColors[1],
				'text-align': "left",
				'font-weight': "bold"
			},
			summaryStyle: {
				'display': "block",
				'font-family': customizedFonts[1],
				'font-size': "16px",
				'color': Viz.isTooLight(customizedColors[2]) ? "black" : customizedColors[2],
				'text-align': "left",
				'padding': "12px 48px 24px 35px",
				'width': "600px"
			}
        };

		
		var hrStyle = {
			line: "2px dashed " + customizedColors[2]
		};
		
		$("#infographic").append(Viz.widget.create("template7.header", headerStyle));
		//Viz.widgets.header("infographic", vizData.user_info, headerStyle);

		drawTitle("work circle", "Experience");
		var timeline = Viz.widget.create("template7.timeline", {marginVertical: 0, colors: customizedColors})
		//var timeline = Viz.widget.create("template7.timeline");
		$("#infographic").append(timeline);
		timeline.drawLabels();
		drawTitle("work circle", "Education");
		
		if (customizedSections.skills && vizData.skills && vizData.skills.length > 0) {
			var skillStyle = {
				'titleStyle': {'fill': customizedColors[0], 'font-family': customizedFonts[0]},
				'textStyle': {'fill': customizedColors[1], 'font-family': customizedFonts[1]},
				//'circleStyle':{'fill': customizedColors[2]},
				'backgroundStyle': {'fill': customizedColors[2]},
				'marginVertical': 0,
				'showTitle': 'hide'
			};
			$("#infographic").append(Viz.widget.create("viz.hr", {line: "2px dashed #999"}));
			drawTitle("work circle", "Skills");
			Viz.widgets.skillChart("infographic", vizData.skills, skillStyle);
		}
		if (customizedSections.interests && vizData.interests && vizData.interests.length > 0) {
			var interestStyle = {
				"title_fontsize": 35,
				"title_fontcolor": "#000",
				"title_fontweight": "bold",
				"int_fontcolor": "#000",
				"int_fontsize": 22,
				'marginVertical': 0,
				'showTitle': 'hide'
			};
			$("#infographic").append(Viz.widget.create("viz.hr", {line: "2px dashed #999"}));
			drawTitle("work circle", "Interests");
			Viz.widgets.drawInterests("infographic", Viz.stripHidden(vizData.interests), interestStyle);
		}
		if (customizedSections.languages && vizData.languages && vizData.languages.length > 0) {
			$("#infographic").append(Viz.widget.create("viz.hr", {line: "2px dashed #999"}));
			drawTitle("work circle", "Languages");
			Viz.widgets.languageChart("infographic", Viz.stripHidden(vizData.languages), {'marginVertical': 0, 'showTitle': 'hide'});
		}
		if (customizedSections.awards && vizData.awards && vizData.awards.length > 0) {
			var awardStyle = {
				"title_fontsize": 35,
				"title_fontcolor": "#000",
				"title_fontweight": "bold",
				"int_fontcolor": "#000",
				"int_fontsize": 22,
				'showTitle': 'hide'

			};
			$("#infographic").append(Viz.widget.create("viz.hr", {line: "2px dashed #999"}));
			drawTitle("work circle", "Awards");
			Viz.widgets.drawAwards("infographic", Viz.stripHidden(vizData.awards), awardStyle);
		}
		if (customizedSections.myStats && vizData.mystats && vizData.mystats.length > 0) {
			var statStyle = {
				'titleFont': customizedFonts[1],
				'titleColor': 'black',
				'textFont': customizedFonts[2],
				'textColor': 'black',
				'numberFont': customizedFonts[2],
				'numberColor': customizedColors[3],
				'iconColor': customizedColors[2],
				//'iconFadedColor': customizedColors[3],
				'showTitle': 'hide'
			};
			$("#infographic").append(Viz.widget.create("viz.hr", {line: "2px dashed #999"}));
			drawTitle("work circle", "My Stats");
			Viz.widgets.myStatChart("infographic", Viz.stripHidden(vizData.mystats), vizData.counts, statStyle);
		}
	   
		if (customizedSections.recommendations && vizData.recommendations && vizData.recommendations.length > 0) {
			$("#infographic").append(Viz.widget.create("viz.hr", {line: "2px dashed #999"}));
			drawTitle("work circle", "Recommendations");
			Viz.widgets.drawRecommendations("infographic", Viz.stripHidden(vizData.recommendations), {'showTitle': 'hide'});
		}
		
		$("circle", ".icon").attr("fill", Viz.isTooLight(customizedColors[2]) ? "black" : customizedColors[2]);
	}
};