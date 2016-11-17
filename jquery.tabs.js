(function($) {
	
	'use strict';
	
	var touchsupport = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? true : false,
		clickevent = (touchsupport) ? 'touchstart' : 'click';

	$.fn.tabs = function(options) {
		
		var defaults = {
			nav : '.tabnav a',
			panels : '.tabcontent [data-tab]',
			activeClass : 'active',
			activeIndex : 0,
			activeTab : 0
		};
		
		return this.each(function() {
			
			var $this = $(this),
				data = $this.data('tabs') || {},
				settings = $.extend(defaults, options, data),
				$nav = $(settings.nav),
				$panels = $(settings.panels),
				activeIndex = settings.activeIndex,
				activeTab = $nav.eq(activeIndex).data('target'),
				activeClass = settings.activeClass;
			
			$nav.filter('[data-target='+activeTab+']').addClass(activeClass);
			$panels.filter('[data-tab='+activeTab+']').addClass(activeClass);
			
			$nav.on(clickevent, function(e) {
				e.preventDefault();
				var $this = $(this),
					activeTab = $this.data('target'),
					$target = $panels.filter('[data-tab='+activeTab+']');
				$nav.removeClass(activeClass);
				$panels.removeClass(activeClass);
				$this.addClass(activeClass);
				$target.addClass(activeClass);
			});
			
		});
	
	};
	
}(jQuery));