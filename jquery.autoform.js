/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function(e){var n=false;if(typeof define==="function"&&define.amd){define(e);n=true}if(typeof exports==="object"){module.exports=e();n=true}if(!n){var t=window.Cookies;var r=window.Cookies=e();r.noConflict=function(){window.Cookies=t;return r}}})(function(){function e(){var e=0;var n={};for(;e<arguments.length;e++){var t=arguments[e];for(var r in t){n[r]=t[r]}}return n}function n(t){function r(n,o,i){var a;if(typeof document==="undefined"){return}if(arguments.length>1){i=e({path:"/"},r.defaults,i);if(typeof i.expires==="number"){var c=new Date;c.setMilliseconds(c.getMilliseconds()+i.expires*864e5);i.expires=c}try{a=JSON.stringify(o);if(/^[\{\[]/.test(a)){o=a}}catch(e){}if(!t.write){o=encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent)}else{o=t.write(o,n)}n=encodeURIComponent(String(n));n=n.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent);n=n.replace(/[\(\)]/g,escape);return document.cookie=[n,"=",o,i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}if(!n){a={}}var f=document.cookie?document.cookie.split("; "):[];var s=/(%[0-9A-Z]{2})+/g;var u=0;for(;u<f.length;u++){var p=f[u].split("=");var d=p.slice(1).join("=");if(d.charAt(0)==='"'){d=d.slice(1,-1)}try{var l=p[0].replace(s,decodeURIComponent);d=t.read?t.read(d,l):t(d,l)||d.replace(s,decodeURIComponent);if(this.json){try{d=JSON.parse(d)}catch(e){}}if(n===l){a=d;break}if(!n){a[l]=d}}catch(e){}}return a}r.set=r;r.get=function(e){return r.call(r,e)};r.getJSON=function(){return r.apply({json:true},[].slice.call(arguments))};r.defaults={};r.remove=function(n,t){r(n,"",e(t,{expires:-1}))};r.withConverter=n;return r}return n(function(){})});


(function($) {
	
	'use strict';
	
	var
	
	touchsupport = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? true : false,
	clickevent = (touchsupport) ? 'touchstart' : 'click',
	
	getFormdata = function($inputs) {
		
		var data = [],
			i = 0;
			
		$inputs.each(function() {
			
			var $this = $(this),
				name = $this.attr('name'),
				type = $this.attr('type'),
				skip = false;
			
			data.forEach(function(obj, index) {
				if (obj.key === name) {
					skip = true;
				}
			});
			
			if (skip) return true;
			
			data[i] = {};
			data[i]['key'] = name;

			if (type == 'radio' || type == 'checkbox') {
				data[i]['value'] = $inputs.filter('[name="'+name+'"]:checked').val();
			} else if ($this.has('option').length > 0) {
				data[i]['value'] = $this.children().filter(':selected').val();
			} else if (type !== 'submit') {
				data[i]['value'] = $this.val();
			}
			
			i++;
		});
		
		return data;
		
	},
	
	fillForm = function($inputs, data) {
		
		data.forEach(function(obj) {
			var $input = $inputs.filter('[name="'+obj.key+'"]'),
				type = $input.attr('type');
			if (type == 'radio' || type == 'checkbox') {
				$input.filter('[value="'+obj.value+'"]').prop('checked', true);
			} else if ($input.has('option').length > 0) {
				$input.filter('[value="'+obj.value+'"]').prop('selected', true);
			} else if (type !== 'submit') {
				$input.val(obj.value);
			}
		});
		
	};
	

	$.fn.autoform = function(options) {
		
		var defaults = {
			cookieprefix : 'azgrautoform_',
			idAttr : 'id',
			expires : 365 // int days
		};
		
		return this.each(function() {
			
			var $form = $(this),
				settings = $.extend(defaults, options),
				cookiedata = Cookies.getJSON(settings.cookieprefix + settings.idAttr),
				$inputs = $form.find('input').not(':hidden');
			
			if (cookiedata !== undefined) {
				fillForm($inputs, cookiedata);
			}
			
			$form.on('submit', function(e) {
				var data = getFormdata($inputs);
				if (cookiedata !== undefined) {
					Cookies.remove(settings.cookieprefix + settings.idAttr);
				}
				Cookies.set('azgrautoform_'+settings.idAttr, data, { expires: settings.expires });
				return;
				//e.preventDefault();
			});
			
		});
	
	};
	
}(jQuery));