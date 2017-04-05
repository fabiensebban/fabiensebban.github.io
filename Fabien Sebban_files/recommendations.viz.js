Viz.widgets.drawRecommendations = function (element, data, opt) {
    var viz = Viz,
	    element = (typeof element === "string") ? document.getElementById(element) : element,
	    opt = opt || {},
	    div = viz.createTag('div', '__recommendations'),
		showTitle = opt.showTitle || 'show',
		legendAlign = opt.legendAlign || 'center',
		margin = {horizontal: opt.marginHorizontal || 0, vertical: opt.marginVertical || 24};
		

    div.style.marginTop = margin.vertical + "px";
    div.style.marginBottom = margin.vertical + "px";
    //div.style.marginLeft = margin.horizontal + "px";	// HACK: Commented out since recommendations does not scale
    //div.style.marginRight = margin.horizontal + "px";	// HACK: Commented out since recommendations does not scale
	
	div.style.overflow="hidden";
    var recommendationLimit = 10;
	
	// Finds an object in DOM tree
	/*
	function find(array, key, needle) {
		for (var index in array) {
			//console.log(array[index][key]);
			if (array[index][key] != null && array[index][key].indexOf(needle) !== -1) {
				return array[index];
			}
		}
	}
	var styleSheets = document.styleSheets;
	//console.log(styleSheets);
	var newCustomize = find(styleSheets, 'href', 'newcustomize.css');
	console.log(newCustomize);
	
	var rBox = find(newCustomize.cssRules, 'selectorText', ".recommendation-square");
	console.log(rBox);
	var master = find(newCustomize.cssRules, 'selectorText', ".triangle-border::after");
	if (!master) {
		even = find(newCustomize.cssRules, 'selectorText', ".triangle-border:after");
	}
	//console.log(master);
	var odd = find(newCustomize.cssRules, 'selectorText', ".triangle-border.odd::after");
	if (!odd) {
		find(newCustomize.cssRules, 'selectorText', ".triangle-border.odd:after");	// Try again bitch
	}
	var even = find(newCustomize.cssRules, 'selectorText', ".triangle-border.even::after");
	if (!even) {
		even = find(newCustomize.cssRules, 'selectorText', ".triangle-border.even:after");
	}
	
	rBox.style.backgroundColor = customizedColors[2];
	master.style.borderColor = 'transparent ' + customizedColors[2];
	odd.style.borderColor = 'transparent ' + customizedColors[2];
	even.style.borderColor = 'transparent ' + customizedColors[2];
	
	*/
	
	// Set colors
    var labelColors = { "service-provider": customizedColors[2], "colleague": customizedColors[3], "business-partner": customizedColors[4], "education": customizedColors[5] };
    element.appendChild(div);
	
	// Title
	if (showTitle === 'show') {
		$(div).append('<div style="font-family:' + customizedFonts[1] + '; font-size:35px; font-weight:bold; text-align:center; text-transform:uppercase">Recommendations</div>');
	}
	
    var labelString = "<font color='" + labelColors["colleague"] + "'>colleague</font> &#8226; <font color='" + labelColors["business-partner"] + "'>business-partner</font> &#8226; <font color='" + labelColors["education"] + "'>fellow student/advisor</font> &#8226; <font color='" + labelColors["service-provider"] + "'>service-provider</font>";

	// Labels
	// HACK: Commented out since recommendations does not scale
    //$(div).append('<div style="font-family:' + customizedFonts[2] + '; font-size:16px; font-weight:bold; text-align:' + legendAlign + ';">' + labelString + '</div>');
	
    $(div).append('<div style="font-family:' + customizedFonts[2] + '; font-size:16px; font-weight:bold; text-align:' + legendAlign + '; margin-left: ' + margin.horizontal + 'px; margin-right: ' + margin.horizontal + 'px;">' + labelString + '</div>');

	//open quote
	//var openQuote = "<span style='font-size: 64px; padding: 0 12px 0 0; margin: -12px 0 -30px 0; font-weight: bold; display: inline; float: left; font-family:" + customizedFonts[0] + ";'>&ldquo; </span>";
	var openQuote = "<span style='line-height: 12px; font-size: 64px; font-weight: bold; font-family:" + customizedFonts[0] + ";'>&ldquo; </span>";
	
	//var closeQuote = "<span style='font-size: 64px; padding: 0 0 0 12px; margin: -12px 0 -30px 0; font-weight: bold; display: inline; float: right; font-family:" + customizedFonts[0] + ";'> &rdquo;</span>";
	var closeQuote = "<span style='line-height: 0px; font-size: 64px; font-weight: bold; font-family:" + customizedFonts[0] + ";'> &rdquo;</span>";
	
    if (data && data.length > 0) {
        $.each(data, function (i, rec) {
            if (i < recommendationLimit) {
                var orientation, styleFloat;
                if (i % 2 == 0) {
                    orientation = "even";
					styleFloat = "right";
                } else {
                    orientation = "odd";
					styleFloat = "left";
                };
				
				// Recommendation text
				// background: ' + customizedColors[6] + '
                //$(div).append('<div class="recommendation-wrapper"><span class="recommendation-square ' + rec.content.recommendationType.code + ' ' + orientation + '" style="font-family:' + customizedFonts[2] + ';">' + openQuote + rec.content.recommendationText + closeQuote + "</span>");
				var table = "<table border='0' style='width:auto;'><tr> <td style='vertical-align: top;'>" + openQuote + "</td> <td style='vertical-align: top;'><p style='text-align: justify;'>" + rec.content.recommendationText + "</p></td> <td style='vertical-align: bottom;'>" + closeQuote + "</td></tr></table>";
                //$(div).append('<div style="text-align: left;"><span class="' + rec.content.recommendationType.code + ' ' + orientation + '" style="font-family:' + customizedFonts[2] + ';">' + table + "</div>");
                $(div).append('<div class="recommendation-wrapper"><span class="recommendation-square ' + rec.content.recommendationType.code + ' ' + orientation + '" style="font-family:' + customizedFonts[2] + ';">' + table + "</span>");

				// Recommendator blocks
                /*
				$(div).append(
				'<span class="recommender-square ' + orientation + '" style="font-family:' + customizedFonts[2] + '; color: ' + labelColors[rec.content.recommendationType.code] + ' ;">' +
				rec.content.recommender.firstName + " " + rec.content.recommender.lastName + " (" + rec.content.recommendationType.code +
				")</span></div>");
				*/
				
				$(div).append(
				'<span class="recommender-square ' + orientation + '" style="font-family:' + customizedFonts[2] + '; color: ' + labelColors[rec.content.recommendationType.code] + ';">' +
				rec.content.recommender.firstName + " " + rec.content.recommender.lastName + "<span>" + rec.content.recommendationType.code +
				"</span></span></div>");

            }
        });

    }

}

