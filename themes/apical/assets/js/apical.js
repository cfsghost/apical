
$(function() {
	$('.menu .item').tab();
	$('.ui.accordion.mainmenu').accordion({
		exclusive: false
	});

	function scrollByHash(hash) {

		var target = $(hash);
		target = target.length ? target : $('[name=' + hash.slice(1) +']');

		if (target.length) {
			history.pushState({}, hash, hash);

			$('html, body').stop().animate({
				scrollTop: target.offset().top
			}, 400);

			return false;
		}
	}

	// scroll to specific place where is the point of hash
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') &&
			location.hostname == this.hostname) {

			$('.mainmenu.item').removeClass('active');;
			var $obj = $(this).addClass('active');

			var items = $('.ui.accordion.mainmenu .item .title');
			for (var index in items) {
				if ($.contains(items[index].parentNode, this)) {
					$('.ui.accordion.mainmenu').accordion('open', parseInt(index));
					break;
				}
			}

			return scrollByHash(this.hash);
		}
	  });

	var $mainmenuItem = $('a[href*="' + location.hash + '"]:not([href="#"])');
	$mainmenuItem.click();
});
