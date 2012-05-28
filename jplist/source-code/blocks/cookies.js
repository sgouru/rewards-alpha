(function($){
	"use strict";	
	
	var set_cookie = function(self, name, value){
		var c_value = escape(value);			
		var exdate = new Date();
		
		if(self.options.expiration == -1){
			document.cookie = name + "=" + c_value + ";path=/;";
		}
		else{
			var expiration = parseInt(self.options.expiration, 10);	
			exdate.setDate(exdate.getDate() + expiration); 
			document.cookie = name + "=" + c_value + ";path=/; expires=" + exdate.toUTCString();
		}		
	};
	
	//save all cookies
	var set_cookies = function(self){
		
		//var filter_dd_name, panel;		
		//var filter_val, filter_class_name;
		var sort_val = self.sort.sort_name;
		var items_on_page_val = self.paging.items_on_page;
		var cpage_val = self.paging.cpage;
		var order_val = self.sort.order;
		var sort_type_val = self.sort.type;
		
		/*
		//drop down filteres
		self.filter.filter_dd_pathes.each(function(){
			
			//get filter name
			panel = $(this).find(".panel");
			filter_dd_name = panel.attr("data-name");
		});
		*/
		
		/*
		//filter vals
		filter.input_fields.each(function(){										
			filter_val = filter.format($(this).val());
			filter_class_name = $(this).attr("class");
			self.set_cookie("f-" + filter_class_name, filter_val); //filter
		});
		*/
						
		//self.set_cookie("f", filter_val); //filter
		set_cookie(self, "s", sort_val); //sort
		set_cookie(self, "iop", items_on_page_val);
		set_cookie(self, "c", cpage_val);	//cpage			
		set_cookie(self, "o", order_val); //asc/desc
		set_cookie(self, "sn", sort_type_val); //is sort numerical/abc/date
		set_cookie(self, "id", self.data.url); //page url
	};
	
	//restore values from saved cookies
	var get_cookies = function(self){
	
		var sort_val = self.get_cookie("s"); //current sort name
		var items_on_page_val = self.get_cookie("iop"); //items number on page 
		var cpage_val = self.get_cookie("c"); //current page number
		var order_val = self.get_cookie("o"); //order
		var sort_type_val = self.get_cookie("sn"); //sort type
		var id = self.get_cookie("id");
		var temp;
		
		//current page exception
		if(id != self.data.url){
			self.paging.cpage = 0;
		}
		else{				
			if(cpage_val != undefined && 
			   cpage_val != ""){
			   
				//update current page
				self.paging.cpage = cpage_val;
			}
		}			
		
		if(items_on_page_val != undefined && 
		   items_on_page_val != ""){
		   
			//update items on page value
			self.paging.items_on_page = items_on_page_val;
		}			
						
		if(self.sort.sort_name_exists(sort_val)){
		
			if(sort_val != undefined 
			   && sort_val != ""){
			   
				//update current sort name value
				self.sort.sort_name = sort_val;
			}				
							
			if(order_val != undefined && 
			   order_val != ""){	

				//update current sort order: asc/desc
				self.sort.order = order_val;
			}
			
			if(sort_type_val != undefined && 
			   sort_type_val != ""){	

				//update current sort order: asc/desc
				self.sort.type = sort_type_val;
			}
		}
	};
	
	var get_cookie = function(c_name){
	
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
	
	/** @constructor */
	var init = function(options, helper, data, filter, sort, paging, drop_down){
	
		var self = {};
		
		//constructor
		self.options = options; 
		self.helper = helper; //static
		self.data = data;
		self.filter = filter;
		self.sort = sort;
		self.paging = paging;
		self.drop_down = drop_down;
		
		return $.extend(this, self);
	};
	
	//api -------------------
	init.prototype.set_cookie = function(name, value){	
		set_cookie(this, name, value);
	};
	
	init.prototype.get_cookie = function(c_name){
		return get_cookie(c_name);
	};
	
	//save all cookies
	init.prototype.set_cookies = function(){		
		set_cookies(this);
	};
	
	//restore values from saved cookies
	init.prototype.get_cookies = function(){
		get_cookies(this);
	};
		
	/** @constructor */
	$.fn.jplist.cookies = function(options, helper, data, filter, sort, paging, drop_down){
		
		return new init(options, helper, data, filter, sort, paging, drop_down);
	};
	
})(jQuery);
