(function($) {
	
	'use strict';
	
	$.smoothScroll = function(options) {
		
		var target,scroll,
			defaults = {
				offset : 0,
				transition : '.6s ease',
				exclude : '', // dom selectors
				onScrollStart : null
			};
		
		var settings = $.extend({},defaults,options);
		
		$('a[href*="#"]:not([href="#"])').on('click', function(e) {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				settings.target = $(this.hash);
				settings.target = settings.target.length ? settings.target : $('[id="' + this.hash.slice(1) + '"]');
				if (settings.target.length) {
					e.preventDefault();
					var avail = $(document).height() - $(window).height(),
						scroll_amount = 0;
					settings.scroll = settings.target.offset().top;
					if (settings.scroll > avail) settings.scroll = avail;
					scroll_amount = ( $(window).scrollTop() - settings.scroll + settings.offset );
					$('html').css({
						'transform' : 'translate3d(0,' + scroll_amount + 'px,0)',
						'transition' : settings.transition
					}).data('transitioning', true);
					if (settings.exlude !== '') {
						$(settings.exclude).css({
							'transform' : 'translate3d(0,' + (-scroll_amount) + 'px,0)',
							'transition' : settings.transition
						});
					}
					if (typeof(settings.onScrollStart) === 'function') {
						settings.onScrollStart.call();
					}
				}
			}
		});
		
		$('html').on('transitionend webkitTransitionEnd msTransitionEnd oTransitionEnd', function (e) {
			if (e.target == e.currentTarget && $(this).data('transitioning') === true) {
				$(this).removeAttr('style').data('transitioning', false);
				if (settings.exlude !== '') {
					$(settings.exclude).removeAttr('style');
				}
				$('html, body').scrollTop(settings.scroll-settings.offset);
				return;
			}
		});		
	
	}
	
}(jQuery));