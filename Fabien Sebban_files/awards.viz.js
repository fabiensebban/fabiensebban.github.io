Viz.widgets.drawAwards = function (element, rawData, opt) {
    var viz = Viz,
	    element = (typeof element === "string") ? document.getElementById(element) : element,
	    opt = opt || {},
	    div = viz.createTag('div', '__awards'),
		showTitle = opt.showTitle || 'show',
		margin = { horizontal: opt.marginHorizontal || 0, vertical: opt.marginVertical || 24 },
		awardLimit = 6,
		data = clone(rawData);

    data.sort(function (a, b) { return (b.awarded_date - a.awarded_date) });

    element.appendChild(div);
    div.style.marginTop = margin.vertical + "px";
    div.style.marginBottom = margin.vertical + "px";
    div.setAttribute('class', "awardContainer");
    if (showTitle === 'show') {
        $(div).append('<div style="font-family:' + customizedFonts[1] + '; font-size:' + opt.title_fontsize + 'px; font-weight:' + opt.title_fontweight + '; text-align:center">AWARDS & HONORS</div>');
    };

    //clear the thing
    $(div).append('<div class="clear" />');

    //center the thing
    $(div).append('<div id="awardCenter" />');
    $.each(data, function (i, award) {
        var awardYear = "";
        if (award.awarded_date) {
            awardYear = getDateFromString(award.awarded_date).getFullYear();
        }
        award.year = awardYear;
    });
    //award block
    var col = 0;
    $.each(data, function (i, award) {
        // if year does not exist
		
        if (i == 0 || data[i - 1].year != award.year || award.year == "") {
            col++;
            var awardYear = award.year || "";
            var id = "award" + awardYear;

            $('#awardCenter').append('<div id ="' + id + '" class="yblock" style="font-family:' + customizedFonts[2] + '; color: ' + customizedColors[3] + '"><div class="awardyearblock" style="color:' + customizedColors[3] + '; border-bottom: 10px solid ' + customizedColors[3] + '";>' + awardYear + '</div></div>');

            if (col % 5 == 0) {
                //clear the thing
                $('#awardCenter').append('<div class="clear" />');
            };
        };

        $('.yblock').last().append('<div class="awardblock" id="award' + i + '">' + stripComma(award.name) + '</div>');

        var fontSize = (award.weight || 5) * 1.5 + 10;
        $('#award' + i + '').css({ 'color': customizedColors[1], 'font-size': fontSize })

    });

    // calc width of element
    $('.yblock').css('width', 960 / ((col > 5) ? 5 : col));
    $('.awardblock').css('background-color', customizedColors[2]);

    // snap second row to left if more than 5 years
    if (col > 5) {
        $('#awardCenter').css('text-align', 'left');
    }

    //    viz.normalize(data, "weight");
    //    data.sort(sortInterests);
    function sortAwards(a, b) { return (b.year - a.year); }

    function stripComma(str) {
        if (str.charAt(str.length - 1) == ",") {
            return str.slice(0, -1);
        };
        return str;
    };
}

