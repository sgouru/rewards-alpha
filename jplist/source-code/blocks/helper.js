(function($){
	"use strict";

	var self = {};
	
	//outer html (IE fix for jquery clone method)
	self.get_outer_html = function(el){
	
		var html = "";
		var attr = el[0].attributes;
		var inner = el.html();
		var name = el[0].tagName.toString().toLowerCase();
		
		html += "<" + name + " ";
		
		for(var i=0; i<attr.length; i++){
		
			if(attr[i].nodeValue != null && 
			   attr[i].nodeValue != ''){
			
				html += attr[i].nodeName + "=";
				html += "'" + attr[i].nodeValue + "' ";
			}
		}
		
		html += ">";
		html += inner;
		html += "</" + name + ">";
		
		return html;
	};
	
	self.log = function(msg){
		if (window.console && typeof console.log != "undefined")
			console.log(msg);
	}
		
	/** @constructor */
	$.fn.jplist.helper = function(){	
	
		//return api
		return self;
	};
})(jQuery);