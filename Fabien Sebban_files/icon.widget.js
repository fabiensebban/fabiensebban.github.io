Viz.iconMap = {
	//"work circle": [null, 40, 40, {"fill": "#000000", "stroke": "none", "cx": "20", "type": "circle", "r": "20", "cy": "20"}]
	"work circle": [
		null, 42.283, 42.282,
		{
			"cy": 21.141,
			"r": 21.141,
			"type": "circle",
			"stroke": "none",
			"fill": "#111",
			"cx": 21.141
		},
		{
			"type": "path",
			"stroke": "none",
			"fill": "#FFFFFF",
			"path": "M33.282,13.781h-4v16h4c0.55,0,1-0.45,1-1v-14C34.282,14.231,33.832,13.781,33.282,13.781z"
		},
		{
			"type": "path",
			"stroke": "none",
			"fill": "#FFFFFF",
			"path": "M27.283,13.781L27.283,13.781v-0.125v-0.875c0-1.949-1.547-3-3-3h-6.001c-1.947,0-3,1.546-3,3v1v0h-2v16 h15v-16H27.283z M25.283,13.781L25.283,13.781l-8.001,0v0v-1c0,0,0-1,1-1s6.001,0,6.001,0s1,0,1,1S25.283,13.781,25.283,13.781z"
		},
		{
			"type": "path",
			"stroke": "none",
			"fill": "#FFFFFF",
			"path": "M12.282,13.781h-3c-0.55,0-1,0.45-1,1v14c0,0.55,0.45,1,1,1h3V13.781z"
		}]
};

Viz.widget.register("viz.icon", function (options) {
	var widget = Viz.createTag("span"),
		opt = options || {},
		iconId = opt.icon || "work circle",
		size = opt.size || {width: 32, height: 32},
		color = opt.fill || "#111";
	
	if (!Viz.iconMap.hasOwnProperty(iconId)) {
		throw "Icon '" + iconId + "' does not exist";
	}
	
	widget.path = Viz.clone(Viz.iconMap[iconId]);
	widget.path[0] = widget;
	widget.iconWidth = widget.path[1];
	widget.iconHeight = widget.path[2];

	$(widget).css({
		display: "inline-block",
		width: widget.iconWidth + "px",
		height: widget.iconHeight + "px"
	});
	var paper = new Raphael(widget.path);

	widget.raphael = paper;
	return widget;
});