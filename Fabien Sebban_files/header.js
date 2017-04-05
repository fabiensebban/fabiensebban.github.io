$(document).ready(function () {
	$(".sharing").append('<div class="share-section addthis_toolbox addthis_default_style addthis_32x32_style" addthis:title="My Infographic Resume" addthis:description="Check out my infographic resume created via Vizualize.me. Create yours with one click."><h2>Share on social networks</h2><a class="addthis_button_twitter"></a><a class="addthis_button_facebook"></a><a class="addthis_button_linkedin"></a><a class="addthis_button_email"></a><a class="addthis_button_compact"></a><a class="addthis_button_google_plusone" g:plusone:count="false" href="#"></a></div>');

    $("nav span.btn1").click(function () {
		var currentLink = $(this).children(':first');
		var menu = $(this).next();
		
		if (!currentLink.hasClass('active')) {
			if (menu.is(':visible')) {
				menu.css('display', 'none');
				currentLink.removeClass('active');
				$(this).parent().removeClass('active');
			} else {
				menu.fadeIn(1000);
				menu.css('display', 'block');
				currentLink.addClass('active');
				$(this).parent().addClass('active');
			}
		} else {
			menu.css('display', 'none');
			currentLink.removeClass('active');
			$(this).parent().removeClass('active');
		};
		
    });

    function track(event, value) {
		var _gaq = _gaq || [];
		_gaq.push(['_trackEvent', event, value]);
    }

    $('#want_print').click(function (e) {
		e.preventDefault();
		track('print', 'name');
		$('#want_print_msg').html("<p class='small'>Thanks for your interest, we'll let you know when this feature is available.</p>");
		$(this).removeClass('pink');
		$(this).addClass('grey');
		$(this).html("Coming Soon");
	});
});