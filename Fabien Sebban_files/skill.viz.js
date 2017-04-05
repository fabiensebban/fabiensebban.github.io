Viz.widgets.skillChart = function (el, skillData, options) {
	function skillSort(a, b) { return (b.years - a.years); }	// Descending years
	function drawCircle(set, paper, circleX, circleY, radius, type, circleStyle) {
		set.push(paper.circle(circleX, circleY, radius).attr(circleStyle));
		if (type === 1) {
			set.push(paper.circle(circleX, circleY, radius - 5).attr(circleStyle));
		} else if (type === 2) {
			set.push(paper.circle(circleX, circleY, radius).attr(circleStyle).attr({'stroke-width': '4px'}));
		} else if (type === 3) {
			set.push(paper.circle(circleX, circleY, radius - 6).attr(circleStyle).attr({'stroke-width': '5px'}));
		}
	}
	function drawLegend(legendSet, cardboard, legendX, legendY, legendRadius, legendFontSize, legendTextSpace, legend, circleStyle, legendStyle) {
		var i;
		for (i in legend) {
			if (legend.hasOwnProperty(i)) {
				legendX += legendRadius;
				drawCircle(legendSet, cardboard, legendX, legendY, 12, legend[i].value, circleStyle);
				legendSet.push(cardboard.text(legendX, legendY + legendRadius + (legendFontSize / 2) + legendTextSpace, legend[i].key).attr(legendStyle).attr({'font-size': legendFontSize + "px"}));
				legendX += legendRadius + legendSpacing;
			}
		}
		legendX += legendRadius;
		legendSet.push(cardboard.text(legendX, legendY, '#').attr(titleStyle).attr({'font-size': "36px"}));	
		legendSet.push(cardboard.text(legendX, legendY + legendRadius + (legendFontSize / 2) + legendTextSpace, 'no. of years').attr(legendStyle).attr({'font-size': legendFontSize + "px"}));
	}
	function drawLolaCircle(set, paper, circleX, circleY, radius, type, circleStyle) {
		var opacity = 0.4;
		if (type === 1) {
			opacity = 0.55;
		} else if (type === 2) {
			opacity = 0.75;
		} else if (type === 3) {
			opacity = 1.0;
		}
		set.push(paper.circle(circleX, circleY, radius).attr(circleStyle).attr({'stroke': 'none', 'opacity': opacity}).attr({'font-family': 'ff-dagny-web-pro'}));
	}
	function drawLolaLegend(legendSet, cardboard, legendX, legendY, legendRadius, legendFontSize, legendTextSpace, legend, circleStyle, legendStyle) {
		legendX += legendRadius;
		legendSet.push(cardboard.text(legendX, legendY, '#').attr(legendStyle).attr({'font-size': "36px"}));	
		legendSet.push(cardboard.text(legendX, legendY + legendRadius + (legendFontSize / 2) + legendTextSpace, 'no. of years').attr(legendStyle).attr({'font-size': legendFontSize + "px"}));
		legendX += legendRadius + legendSpacing;
		var i;
		for (i in legend) {
			if (legend.hasOwnProperty(i)) {
				legendX += legendRadius;
				drawLolaCircle(legendSet, cardboard, legendX, legendY, 12, legend[i].value, circleStyle);
				legendSet.push(cardboard.text(legendX, legendY + legendRadius + (legendFontSize / 2) + legendTextSpace, legend[i].key).attr(legendStyle).attr({'font-size': legendFontSize + "px"}).attr({'font-family': 'ff-dagny-web-pro'}));
				legendX += legendRadius + legendSpacing;
			}
		}
	}
	
	var v = Viz,
		root = (typeof el === "string") ? document.getElementById(el) : el,
		opt = options || {},
		newId = opt.newId || '__skills',
		div = v.createTag('div', newId),
		
	// Options and defaults
		key = opt.key || 'years',
		defaults = {width: opt.width || 960, height: opt.height || 500},
		limit = opt.limit || 5,
		showTitle = opt.showTitle || 'show',
		titleFontSize = opt.titleFontSize || 35,
		sizeLimit = {radius: {min: opt.radiusMin || 50, max: opt.radiusMax || 140.5}, font: {min: opt.fontMin || 40, max: opt.fontMax || 84} },
		margin = {
			horizontal: opt.marginHorizontal || 0, 
			vertical: (!isNaN(opt.marginVertical) && opt.marginVertical >= 0) ? opt.marginVertical : 25
		},
		padding = {horizontal: opt.paddingHorizontal || 36, vertical: opt.paddingVertical || 36},
		skillMargin = {horizontal: opt.skillMarginHorizontal || 5, vertical: opt.skillMarginVertical || 0},
		backgroundStyle = opt.backgroundStyle || {'fill': 'black'},
		//blankStyle = {'fill': 'white', 'stroke': 'none', 'opacity': 0.000001},
		circleStyle = opt.circleStyle || {'fill': '#111', 'stroke': '#DDD', 'stroke-width': '1.5px'},
		titleStyle = opt.titleStyle || {},
		nameStyle = opt.nameStyle || {},
		textStyle = opt.textStyle || {},	// Center of circles

	// Initialization
		skills = v.clone(skillData),
		cardboard = new Raphael(div, defaults.width, defaults.height),
		newspaper = cardboard.set(),
		legendSet = cardboard.set(),
		labelSet = cardboard.set(),
		width_adj = defaults.width - (padding.horizontal * 2),
		circleX = 0,
		//circleY = (defaults.height / 2) - 30,
		circleY = 0,
		circleWidthSum = 0,
		maxRadius = 0,
		textHeightMax = 0,
		
	// Legend Stuff
		legend = [
			{key: 'beginner', value: 0},
			{key: 'intermediate', value: 1},
			{key: 'advanced', value: 2},
			{key: 'expert', value: 3}
		],
		fontXFactor = 1.142857142857143,
		legendMarginX = padding.horizontal,
		legendMarginY = padding.vertical,
		legendRadius = 12,
		legendTextSpace = 8,
		legendFontSize = 11,
		legendStyle = opt.legendStyle || {},
		legendPosition = opt.legendPosition || 'left',
		legendSpacing = 48,
		legendHeight = (legendRadius * 2) + legendTextSpace + legendFontSize;

		
	//console.log(opt.marginVertical);
	//console.log(margin.vertical);
	// Margins
	div.style.marginTop = margin.vertical + 'px';
	margin.vertical = 0; // To fix the odd space at bottom of page when there's nothing after skills
	div.style.marginBottom = (margin.vertical - 3) + 'px';
	div.style.marginLeft = margin.horizontal + 'px';
	div.style.marginRight = margin.horizontal + 'px';
	
	root.appendChild(div);
	
	// Fix styles
	titleStyle = $.extend({'font-family': 'museo-slab', 'font-size': titleFontSize + 'px', 'fill': 'white', 'font-weight': 'bold'}, titleStyle);
	nameStyle = $.extend({'font-size': titleFontSize + 'px', 'fill': 'white', 'font-weight': 'bold'}, nameStyle);
	textStyle = $.extend({'font-family': 'ff-dagny-web-pro', 'fill': 'white'}, textStyle);
	legendStyle = $.extend({'font-family': 'ff-dagny-web-pro', 'fill': 'white'}, legendStyle);

	// Prepare data
	skills.sort(skillSort);
	v.limit(skills, limit);
	v.abnormalize(skills, key);
	v.normalize(skills, key);
	
	// Recalculate adjusted weight
	width_adj = defaults.width - (padding.horizontal * 2) - (((sizeLimit.radius.min + skillMargin.horizontal) * 2) * skills.length - (2 * skillMargin.horizontal));
	
	// Title
	if (showTitle === 'show') {
		cardboard.text(defaults.width / 2, padding.vertical + (35 / 2), "SKILLS").attr({'text-anchor': 'middle'}).attr(nameStyle);
	}

	// Circles
	newspaper.push(labelSet);
	var i;
	for (i in skills) {
		if (skills.hasOwnProperty(i)) {
			var fontSize = Math.max(sizeLimit.font.min, skills[i].abnorm * sizeLimit.font.max),
				radius = 0;
			
			if (skills.length > 3) {
				radius = skills[i].norm * (width_adj / 2) + sizeLimit.radius.min;
			} else {
				radius = Math.max(sizeLimit.radius.min, skills[i].abnorm * sizeLimit.radius.max);
			}
			
			maxRadius = Math.max(maxRadius, radius);
				
			skills[i].years = skills[i].years || "<1";
			skills[i].years = (skills[i].years >= 20) ? "20+" : skills[i].years;
			//console.log( skills[i].name + "(" + skills[i].norm + "): " + (skills[i].norm * width_adj) + "," + radius)
			// Position update
			circleX += radius + skillMargin.horizontal;
			//console.log(skills[i].name + "(" + skills[i].years + "): " + fontSize + "px, " + radius + "(" + circleX + ", " + circleY + ")");
			
			// Circles
			if (opt.type === 'lola') {
				drawLolaCircle(newspaper, cardboard, circleX, circleY, radius, skills[i].proficiency_id, circleStyle);
			} else {
				drawCircle(newspaper, cardboard, circleX, circleY, radius, skills[i].proficiency_id, circleStyle);
			}
			
			// Label
			newspaper.push(cardboard.text(circleX, circleY, skills[i].years).attr(titleStyle).attr({'font-size': fontSize + "px"}));
			labelSet.push(cardboard.text(circleX, circleY, getWrappedText(skills[i].name, 100, 5, 3)).attr(textStyle).attr({'text-anchor': 'middle', 'font-size': (18 + fontSize/5) + "px"}));
			//textHeightMax = Math.max(textHeightMax, labelSet[labelSet.length-1].getBBox().height);
			var label = labelSet[labelSet.length - 1];
			//label.translate(-label.getBBox().width/2, label.getBBox().height/2);
			label.translate(0, label.getBBox().height / 2);
			textHeightMax = Math.max(textHeightMax, label.getBBox().height);
			
			// Tooltip hack
			//newspaper.push(cardboard.circle(circleX, circleY, radius).attr(blankStyle));	// HACK
			//drawTooltip(newspaper[newspaper.length-1].node, getSkillsTooltip(skills[i]));
			
			// Position update
			circleX += radius + skillMargin.horizontal;
			circleWidthSum += (radius + skillMargin.horizontal) * 2;
		}
	}
	var titleAreaHeight = padding.vertical + titleFontSize + maxRadius + 46;
	if (showTitle === 'hide') {
		titleAreaHeight = maxRadius + padding.vertical;
	}
	newspaper.translate((defaults.width - circleWidthSum) / 2, titleAreaHeight);
	//newspaper.translate((defaults.width - circleWidthSum)/2, 0);
	labelSet.translate(0, maxRadius + 12);

	// Resize
	defaults.height = titleAreaHeight + maxRadius + (textHeightMax + 12) + 36 + legendHeight + legendMarginY;
	cardboard.setSize(defaults.width, defaults.height);
	
	// Legend
	var legendX = (legendFontSize * fontXFactor) + legendMarginX,
		legendY = defaults.height - legendHeight + legendRadius - legendMarginY;
	
	if (opt.type === 'lola') {
		drawLolaLegend(legendSet, cardboard, legendX, legendY, legendRadius, legendFontSize, legendTextSpace, legend, circleStyle, textStyle);
	} else {
		drawLegend(legendSet, cardboard, legendX, legendY, legendRadius, legendFontSize, legendTextSpace, legend, circleStyle, textStyle);
	}
	
	if (legendPosition === 'right') {
		legendSet.translate(defaults.width - legendMarginX - legendSet.getBBox().width - 36, 0);
	}
	
	cardboard.rect(0, 0, defaults.width, defaults.height).attr(backgroundStyle).attr({'stroke': 'none'}).toBack();
};