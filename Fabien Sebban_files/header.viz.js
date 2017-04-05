Viz.widgets.header = function (element, userInfo, options) {
    var viz = Viz,
	    root = (typeof element === "string") ? document.getElementById(element) : element,
	    opt = options || {},
	    div = viz.createTag('div', '__header'),
		textAlign = opt.align || "center";

    root.appendChild(div);
    div.style.backgroundColor = customizedColors[2];
	div.style.padding = "12px 48px 24px 48px";
	div.style.textAlign = textAlign;
	
    //Name div
	var name = ((userInfo.first_name || "") + " " + (userInfo.last_name || "")).trim();
	var nameSize = opt.name.fontsize - (name.length >= 30 ? 8 : 0);	// HACK for super long names
    $(div).append('<div style="font-family:' + customizedFonts[0] + ';  font-size: ' + nameSize + 'px; color: ' + customizedColors[0] + '; text-align:' + textAlign + '; font-weight:' + opt.name.fontweight + '">' + name + '</div>');
    
	//Title Div
	var title = ((userInfo.title || "")).trim();
    $(div).append('<div style="font-family:' + customizedFonts[1] + ';  font-size: ' + opt.title.fontsize + 'px; color: ' + customizedColors[1] + '; text-align:' + textAlign + '; font-weight:' + opt.title.fontweight + '">' + title + '</div>');
    
	//Summray Div
    if (userInfo.summary && userInfo.summary.length > 0) {
        $(div).append('<span style="font-family:' + customizedFonts[2] + ';  font-size: ' + opt.summary.fontsize + 'px; color: ' + customizedColors[1] + '; text-align:left;"><p style="display: inline-block; padding: 18px 12px 0 12px;">' + userInfo.summary + '</p></span>');
	}
};
