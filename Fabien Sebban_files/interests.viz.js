Viz.widgets.drawInterests = function (element, rawData, opt) {
    var viz = Viz,
	    element = (typeof element === "string") ? document.getElementById(element) : element,
	    opt = opt || {},
	    div = viz.createTag('div', '__interests'),
		showTitle = opt.showTitle || 'show',
		margin = {horizontal: opt.marginHorizontal || 0, vertical: opt.marginVertical || 24};
		
    var interestLimit = 6;
    element.appendChild(div);
    div.style.marginTop = margin.vertical + "px";
    div.style.marginBottom = margin.vertical + "px";
	if (showTitle === 'show') {
		$(div).append('<div style="font-family:' + customizedFonts[1] + '; font-size:' + opt.title_fontsize + 'px; font-weight:' + opt.title_fontweight + '; text-align:center">INTERESTS</div>');
	}
    var data = clone(rawData);
    $.each(data, function (i, interest) {
        if (!interest.weight)
            interest.weight = 5;
    });
    viz.normalize(data, "weight");
    data.sort(sortInterests);
    var html = "";
    if (data && data.length > 0) {
        html = '<table>';
        //Block
        html = html + '<tr style="height:172px">';
        var c = 3;
        $.each(data, function (i, interest) {
            if (i < interestLimit) {
                var width = interest.norm * 100;
                var weightDisplay = interest.weight || "";
                html = html + '<td style="border:solid 10px #fff; background:' + customizedColors[c] + '; width:' + width + '%; font-family:' + customizedFonts[2] + '; font-size:14px; text-align:left;vertical-align:text-top;"></td>';

                c++;
                if (c >= customizedColors.length)
                    c = 3;
            }
        });
        html = html + "</tr>";
        //Text
        html = html + '<tr>';
        viz.abnormalize(data, "weight");
        $.each(data, function (i, interest) {
            if (i < interestLimit) {
                var size = interest.abnorm * 24;
                if (size < 12)
                    size = 12;
                html = html + '<td style="font-family:' + customizedFonts[2] + '; font-size:' + size + 'px; text-align:left;vertical-align:text-top;width:' + interest.norm * 100 + '%;">' + interest.name + '</td>';
            }
        });
        html = html + "</tr>";
        html += "</table>";
    }
    $(div).append(html);

    function sortInterests(a, b) { return (b.weight - a.weight); }
}

