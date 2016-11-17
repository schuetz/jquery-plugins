(function($) {
	
	'use strict';
	
	var touchsupport = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? true : false,
		clickevent = (touchsupport) ? 'touchstart' : 'click';

	$.fn.accordion = function(options) {
		
		var defaults = {
			headers : '> a',
			panels : '> div',
			activeClass : 'active',
			autoClose : false,
			active : false
		};
		
		return this.each(function() {
			
			var $this = $(this),
				data = $this.data('accordion') || {},
				settings = $.extend(defaults, options, data),
				$headers = $this.find(settings.headers),
				$panels = $this.find(settings.panels),
				activeClass = settings.activeClass;
			
			// open desired panel on init
			if (settings.active !== false) {
				$headers.eq(settings.active).addClass(activeClass);
				$panels.eq(settings.active).addClass(activeClass);
			}
			
			$headers.on(clickevent, function(e) {
				e.preventDefault();
				var $this = $(this),
					$target = $this.next();
				if ($target.hasClass(activeClass)) {
					$this.removeClass(activeClass);
					$target.removeClass(activeClass);
				} else {
					if (settings.autoClose) {
						$headers.removeClass(activeClass);
						$panels.removeClass(activeClass);
					}
					$this.addClass(activeClass);
					$target.addClass(activeClass);
				}
			});
			
		});
	
	};
	
}(jQuery));