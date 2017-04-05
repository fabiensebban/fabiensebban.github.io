Viz.widget.register("viz.hr", function (options) {
	var widget = Viz.createTag("div"),
		opt = options || {},
		line = opt.line || "1px solid #666";
		
	$(widget).css('margin-top', "8px");
	$(widget).css('margin-bottom', "8px");
	$(widget).css('border-bottom', line);
	
	return widget;
});