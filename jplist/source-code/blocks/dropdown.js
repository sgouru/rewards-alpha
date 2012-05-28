(function($){
	"use strict";
		
	// events ---------------------------------------------
	var init_doc_events = function(self){
		$(document).click(function(){
			self.dd_ul_list.hide();
		});
	};
	
	var init_dd_show_hide = function(self){
				
		self.dd_panel_list.bind("click", function(e){
		
			var ul, counter = 0;
			
			//stop propagation
			e.stopPropagation();
			
			ul = $(this).parent().find("ul");
			if(ul.is(":visible")){
				
				//hide all ul's
				self.dd_ul_list.hide(0);
			}
			else{
				//hide all ul's and open only current ul
				self.dd_ul_list.hide(0, function(){
					
					//update counter
					counter++;
					
					if(counter >= self.dd_ul_list.length){	
						ul.show();
					}
				});
			}				
		});
	};
	
	var dd_li_click = function(li){
		var ul = li.parent("ul");
		var panel = ul.prev(".panel");
		panel.html(li.text());
	};
	
	var dd_filter_li_click = function(li){
		var ul = li.parent("ul");
		var panel = ul.prev(".panel");	
		var span = li.find("span");
		
		panel.html(span.text());
		panel.attr("data-name", span.attr("data-name"));
	};
	
	var init_li_events = function(self){
		
		var dd, li_list, panel, span;
		
		for(var i=0; i<self.sort_dd.length; i++){
		
			//get dd
			dd = self.sort_dd.eq(i);
			
			//get panel
			li_list = dd.find("ul li");
			
			li_list.click(function(e){
				dd_li_click($(this));
			});
		}
		
		for(var i=0; i<self.paging_dd.length; i++){
		
			//get dd
			dd = self.paging_dd.eq(i);
			
			//get panel
			li_list = dd.find("ul li");
			
			li_list.click(function(e){
				dd_li_click($(this));
			});
		}
		
		for(var i=0; i<self.filter_dd.length; i++){
		
			//get dd
			dd = self.filter_dd.eq(i);
			
			//get panel
			li_list = dd.find("ul li");
			
			li_list.click(function(e){
				dd_filter_li_click($(this));
			});
		}
	};
	
	var init_panel = function(self, dd){
	
		var val, span, data_name;	

		span = dd.find("li span:eq(0)");
		
		//find first item value
		val = span.text();
		data_name = span.attr("data-name");
		
		//init panel
		if(data_name != ""){
			dd.prepend("<div class='panel' data-name='" + data_name + "'>" + val + "</div>");	
		}
		else{
			dd.prepend("<div class='panel'>" + val + "</div>");	
		}			
	};
	
	var init_panels = function(self){
	
		var dd, val;
		
		for(var i=0; i<self.sort_dd.length; i++){
		
			//get dd
			dd = self.sort_dd.eq(i);				
			init_panel(self, dd);
		}
		
		for(var i=0; i<self.paging_dd.length; i++){
		
			//get dd
			dd = self.paging_dd.eq(i);
			init_panel(self, dd);
		}
		
		for(var i=0; i<self.filter_dd.length; i++){
		
			//get dd
			dd = self.filter_dd.eq(i);
			init_panel(self, dd);
		}
	};

	//restore drop down values from cookies
	var restore_dd = function(self){
		
		var pspan, dd, panel, sort_span_list, flag;
		var items_on_page_val = self.paging.items_on_page;
		var sort_val = self.sort.sort_name;
		var order_val = self.sort.order;
		var sort_type_val = self.sort.type;
		
		//pager drop down
		for(var i=0; i<self.paging_dd.length; i++){
		
			//get drop down
			dd = self.paging_dd.eq(i);
			
			//get panel span and panel
			pspan = dd.find("span[data-number='" + items_on_page_val + "']");
			panel = dd.find(".panel");
			
			//if span not found -> all
			if(pspan.length <= 0){					
				pspan = dd.find("span[data-number='all']");
			}
			
			//update current dd value
			panel.html(pspan.text());
		}
		
		//sort drop down
		for(var i=0; i<self.sort_dd.length; i++){
		
			//get drop down
			dd = self.sort_dd.eq(i);
			
			//get sort span list and panel
			sort_span_list = dd.find("ul li span");
			panel = dd.find(".panel");
			
			for(var j=0; j<sort_span_list.length; j++){
			
				//get span
				pspan = sort_span_list.eq(j);
				
				flag = (pspan.attr("data-sort") == sort_val) &&
					   (pspan.attr("data-order") == order_val) &&
					   (pspan.attr("data-type") == sort_type_val);
				
				if(flag){
					panel.html(pspan.text());
				}
			}
		}
	};
	
	//update paging on click
	var update_paging_on_click = function(self, callback){
		self.paging_dd.find("li").click(function(){
			var val = $(this).find("span").attr("data-number");
			
			if($.isFunction(callback)){
				callback(val); //self.update_paging(val);
			}
		});
	};
	
	//update sort on click
	var update_sort_on_click = function(self, callback){
	
		var type, sort, order;
		
		self.sort_dd.find("li").click(function(){
			
			type = $(this).find("span").attr("data-type");
			sort = $(this).find("span").attr("data-sort");
			order = $(this).find("span").attr("data-order");
			
			if($.isFunction(callback)){
				callback(sort, order, type);
			}				
		});
	};
	
	//update sort on click
	var update_filter_on_click = function(self, callback){
	
		self.filter_dd.find("li").click(function(){
			
			var type = $(this).find("span").attr("data-name");
			
			if($.isFunction(callback)){
				callback(type);
			}				
		});
	};
	
	var if_paging_all = function(self, num){
	
		var is_all = true;
		
		self.paging_dd.find("li span").each(function(){
			var c_class = $(this).attr("data-number");					
			if(c_class == num){
				is_all = false;
			}
		});
		
		return is_all;
	};
	
	/** @constructor */
	var init = function(options, helper, box, paging, sort){
		
		var self = {
			dd_ul_list: "" //drop downs ul list
			,dd_panel_list: ""			
			,sort_dd_panel: "" //sort panel
			,paging_dd_panel: "" //pager panel
			,filter_dd_panel: "" //filter panel
		};
		
		//init self
		self.options = options;
		self.helper = helper;
		self.box = box;
		self.paging = paging;
		self.sort = sort;
		
		self.dd_list = self.box.find(".drop-down");
		self.sort_dd = self.box.find(self.options.sort_dd_path);
		self.paging_dd = self.box.find(self.options.paging_dd_path);
		self.filter_dd = self.box.find(self.options.filter_dd_path);
		
		//init drop downs
		init_panels(self);
		
		//init common vars
		self.dd_ul_list = self.dd_list.find("ul");
		self.dd_panel_list = self.dd_list.find(".panel");
		
		self.sort_dd_panel = self.sort_dd.find(".panel");
		self.paging_dd_panel = self.paging_dd.find(".panel");
		self.filter_dd_panel = self.filter_dd.find(".panel");
		
		return $.extend(this, self);
	};
	
	// api ------------------------------------------------		
		
	//restore drop down values from cookies
	init.prototype.restore_dd = function(){
		restore_dd(this);		
	};
	
	//update paging on click
	init.prototype.update_paging_on_click = function(callback){
		update_paging_on_click(this, callback);
	};
	
	//update sort on click
	init.prototype.update_sort_on_click = function(callback){
		update_sort_on_click(this, callback);
	};
	
	//update sort on click
	init.prototype.update_filter_on_click = function(callback){
		update_filter_on_click(this, callback);
	};
	
	init.prototype.if_paging_all = function(num){
		return if_paging_all(this, num);
	};
		
	/** @constructor */
	$.fn.jplist.dropdown = function(options, helper, box, paging, sort){
	
		var self = new init(options, helper, box, paging, sort);
		
		//init events
		init_dd_show_hide(self);
		init_doc_events(self);
		init_li_events(self);
		
		//constructor call
		return self;
	};
})(jQuery);