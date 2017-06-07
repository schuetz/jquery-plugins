/*
$(document).click(function(event) { 
	if(!$(event.target).closest('header').length) {
	    if($('.menu-wrap').is(':visible')) {
	        $('.menu-wrap').slideUp(300);
	    }
	}
});
*/


(function($) {
	
	$.fn.clickoutside = function(options) {
		
		var defaults = {
			callback : function() {}
		};
		
		var settings = $.extend({},defaults,options);
		
		$(document).click(function(event) {
			// to be continued
			options.callback.call(this);
		});
		
		return this;
	};
	
}(jQuery));