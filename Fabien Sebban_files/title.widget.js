Viz.widget.register("viz.title", function (options) {
	var widget = Viz.createTag("div"),
		opt = options || {},
		style = opt.style || {},
		textStyle = opt.textStyle || {},
		icon = opt.icon || "work circle",
		iconSize = opt.iconSize || null,
		color = opt.color || null,
		text = opt.text || "Title";
		
	widget.dom = {
		"icon": Viz.widget.create("viz.icon", {icon: icon, size: iconSize, fill: color}),
		"text": Viz.createTag("span")
	};

	$(widget).css({
		'text-align': "left",
		'color': color
	});
	$(widget).css(style);
	
	$(widget.dom.text).html(text);
	$(widget.dom.text).css(textStyle);
	$(widget.dom.text).css({
		display: "inline-block",
		'vertical-align': "top",
		'line-height': widget.dom.icon.style.height,
		'margin-left': "4px"
	});
	
	if (iconSize) {
		widget.dom.icon.scale(iconSize.width, iconSize.height);
	}
	
	widget.appendChild(widget.dom.icon);
	widget.appendChild(widget.dom.text);
	
	return widget;
});