
// Default Header
Viz.widget.register("viz.header", function (options) {
	var widget = Viz.createTag("div"),
		opt = options || {},
		style = opt.style || {},
		nameStyle = opt.nameStyle || {},
		titleStyle = opt.titleStyle || {},
		summaryStyle = opt.summaryStyle || {};
		
	widget.dom = {
		"name": Viz.createTag("div"),
		"title": Viz.createTag("div"),
		"summary": Viz.createTag("div")
	};

	// TODO fetch user info dynamically
	// Viz.dataStream.request(widget, "viz", null, function (source, isSuccess, data) {
		// console.log(isSuccess);
		// console.log(data);
		// $(widget.dom.name).html();
		// $(widget.dom.title).html();
		// $(widget.dom.summary).html();
	// });
	if (vizData && vizData.user_info && vizData.user_info.first_name) {
		$(widget.dom.name).html(vizData.user_info.first_name + " " + vizData.user_info.last_name);
		$(widget.dom.title).html(vizData.user_info.title);
		$(widget.dom.summary).html(vizData.user_info.summary);
	}
	
	$(widget).css(style);
	$(widget.dom.name).css(nameStyle);
	$(widget.dom.title).css(titleStyle);
	$(widget.dom.summary).css(summaryStyle);
	
	widget.appendChild(widget.dom.name);
	widget.appendChild(widget.dom.title);
	widget.appendChild(widget.dom.summary);
	
	return widget;
});


// Template7 Header
Viz.widget.register("template7.header", function (options) {
	var widget = Viz.createTag("div"),
		opt = options || {},
		style = opt.style || {},
		nameStyle = opt.nameStyle || {},
		titleStyle = opt.titleStyle || {},
		summaryStyle = opt.summaryStyle || {};
		
	widget.dom = {
		"container": Viz.createTag("div"),
		"name": Viz.createTag("div"),
		"title": Viz.createTag("div"),
		"summary": Viz.createTag("div")
	};

	// TODO fetch user info dynamically
	if (vizData && vizData.user_info && vizData.user_info.first_name) {
		$(widget.dom.name).html(vizData.user_info.first_name + " " + vizData.user_info.last_name);
		$(widget.dom.title).html(vizData.user_info.title);
		$(widget.dom.summary).html(vizData.user_info.summary);
	}
	
	$(widget.dom.container).css(style);
	$(widget.dom.name).css(nameStyle);
	$(widget.dom.title).css(titleStyle);
	$(widget.dom.summary).css(summaryStyle);
	
	widget.appendChild(widget.dom.container);
	widget.dom.container.appendChild(widget.dom.name);
	widget.dom.container.appendChild(widget.dom.title);
	widget.appendChild(widget.dom.summary);
	
	return widget;
});