var docs = (function($){
	"use strict";
	
	var self = {
		DOCS_COOKIE: "docs"
	};
	
	self.set_cookie = function(name, value){					
		var c_value = escape(value);			
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + 1); //1 day
		document.cookie = name + "=" + c_value + ";path=/; expires=" + exdate.toUTCString();	
	};
	
	self.get_cookie = function(c_name){
	
		var i, x, y, ARRcookies;
		ARRcookies = document.cookie.split(";");		
		for (i=0; i<ARRcookies.length; i++){

			x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);			
			x = x.replace(/^\s+|\s+$/g,"");

			if (x == c_name){
				return unescape(y);
			}

		}
	};
	
	var events = function(){
	
		//nav click
		self.nav.click(function(){
		
			var tab;
			var nav_tab = $(this).attr("data-tab");
			
			//show/hide
			for(var i=0; i<self.tabs.length; i++){
			
				//get tab
				tab = self.tabs.eq(i);
				
				if(tab.attr("data-tab") == nav_tab){
					tab.show();
				}
				else{
					tab.hide();
				}
			}
			
			//current nav class
			for(var i=0; i<self.nav.length; i++){
			
				//get tab
				tab = self.nav.eq(i);
				
				if(tab.attr("data-tab") == nav_tab){
					tab.addClass("active");
				}
				else{
					tab.removeClass("active");
				}
			}
					
			//update cookie
			self.set_cookie(self.DOCS_COOKIE, nav_tab);
		});
	};
	
	var restore_cookie = function(){
		
		var saved = self.get_cookie(self.DOCS_COOKIE);
		if($.trim(saved) != ""){
			self.nav.filter("[data-tab=" + saved + "]").trigger("click");
		}
		else{
			self.nav.eq(0).trigger("click");
		}
	};
	
	//constructor
	var init = (function(){
		$("document").ready(function(){
			
			//init vars
			self.nav = $("#tabs-nav li");
			self.tabs =  $("#tabs-content .tab");
			
			//init events
			events();
			
			//cookies
			restore_cookie();
			
			//google code prettifier
			prettyPrint();
		});
	})();
	
	return self;
})(jQuery);