(function($){
	"use strict";
		
		var drop_down_filter = function(self, filter_name){
			self.drop_down.filter_dd.find("li span").each(function(){
				var span = $(this);
				if(span.attr("data-name") == filter_name){
					span.trigger("click");
				}
			});
		};
		
		var jump_to_page = function(self, page){
			self.paging.pagingmid.find("span").each(function(){
				var span = $(this);				
				if(span.text() == page){
					span.trigger("click");
				}
			});
		};
		
		var api_search = function(self, filter_name, value){
			var input_field;
			for(var i=0; i<self.filter.input_fields.length; i++){
				input_field = self.filter.input_fields.eq(i);
				
				if((input_field).attr("data-name") == filter_name){
					input_field.val(value);
					update_view(self);
				}				
			}
		};
		
		var api_pages_per_page = function(self, items_on_page){
			self.paging.items_on_page = items_on_page;
			update_view(self);
			self.drop_down.restore_dd();
		};
		
		var api_sort = function(self, sort_name, order, sort_type){
			self.sort.order = order;
			self.sort.sort_name = sort_name;
			self.sort.type = sort_type;
			update_view(self);
			self.drop_down.restore_dd();	
		};
		
		var print = function(self, dataObj){
		    
			var html = "", item;

			//var filter_val = filter.filter_field.val();
			var sort_val = self.sort.sort_name;
			var items_on_page_val = self.paging.items_on_page;
			var cpage_val = self.paging.cpage;
			var order_val = self.sort.order;
			var sort_type_val = self.sort.type;
					
			for(var i=0; i<dataObj.length; i++){
			
				//get item
				item = dataObj[i];
				html += item[self.data.attributes.HTML];
			}
		
			self.box.html(html);
			
			if(self.options.cookies){
				self.cookies.set_cookies();
			}
			
			if($.isFunction(self.options.redraw_callback)){
				self.options.redraw_callback(sort_val, items_on_page_val, cpage_val, order_val, sort_type_val);
			}						
		};
		
		var update_view = function(self){
			
			//filter view
			self.view_data = self.filter.filter_data(self.data); 	

			//filter drop down
			self.view_data = self.filter.filter_dd_data(self.data, self.view_data); 
			
			//sort view				
			self.view_data = self.sort.sort_data(self.view_data);
				
			//set paging
			self.view_data = self.paging.set_paging(self.view_data);
							
			//print html
			print(self, self.view_data); 
			
			//no results found
			if(self.view_data.length <=0){
				self.no_results_el.show();
				self.box.hide();
			}
			else{
				self.no_results_el.hide();
				self.box.show();
			}
		};
		
		var update_sorting = function(self, sort_name, order, sort_type){
				
			self.paging.cpage = 0;
			self.sort.sort_name = sort_name;
			self.sort.order = order;
			self.sort.type = sort_type;
			
			update_view(self);
		};
		
		var update_paging = function(self, items_on_page){
			
			if(items_on_page == "all"){
				self.paging.items_on_page = self.paging.all_items_num;
			}
			else{
				self.paging.items_on_page = items_on_page;
			}
			
			self.paging.cpage = 0;
			update_view(self);
		};
		
		//input field filter
		var update_filter = function(filter_input_path, val){
			
			$(filter_input_path).val(val);
			$(filter_input_path).trigger("keyup");
		};
		
		//frop down filter
		var update_dd_filter = function(self, filter_type){
		
			self.paging.cpage = 0;
			update_view(self);
		};
		
		var init_events = function(self){
			
			//init filter event
			self.filter.input_fields.keyup(function(){	

				//set page to 0
				self.paging.cpage = 0;
				
				//update view array
				update_view(self);
			});
			
			//paging drop down event
			self.drop_down.update_paging_on_click(function(val){
				update_paging(self, val);
			});
			
			//sort drop down event
			self.drop_down.update_sort_on_click(function(sort_name, order, sort_type){
				update_sorting(self, sort_name, order, sort_type);
			});
			
			//sort drop down event
			self.drop_down.update_filter_on_click(function(filter_type){
				update_dd_filter(self, filter_type);
			});
		};	
			
		/** @constructor */		
		var init = function(user_options, $this){
		
			var self = {
				view_data: new Array()
				,no_results_el: ""
			};
			
			//var opts = $.extend({}, $.fn.hilight.defaults, options);
			self.options = $.extend({	
		
				//main options
				items_box: ".list"
				,item_path: ".list-item"	
				,redraw_callback: ""			
				,css_prefix: "jplist"
				,no_results: ".jplist-no-results"
				
				//cookies
				,cookies: true
				,expiration: -1 //cookies expiration in days (-1 = cookies expire when browser is closed)
				
				//pagination
				,pagingbox: ".buttons"
				,pageinfo: ".info"
				,paging_length: 7
				,show_one_page: false
				,items_on_page: 5	
				
				//arrows
				,prev_arrow: "&lt;"
				,next_arrow: "&gt;"
				,first_arrow: "&lt;&lt;"
				,last_arrow: "&gt;&gt;"
				
				//filter (input fields)
				,filter: {}
				,filter_path: ".filter"
				
				//sort
				,sort: {}
				,sort_order: "asc" //"desc"
				,sort_type: "text"
				,sort_name: ""
				
				//drop down
				,sort_dd_path: ".sort-drop-down"
				,paging_dd_path: ".page-by"
				
				//drop down filters
				,filter_dd_path: ".filter-drop-down"
			}, user_options);
			
			//init vars
			self.container = $this;
			self.box = self.container.find(self.options.items_box);
			self.items = self.container.find(self.options.item_path);
			self.helper = new $.fn.jplist.helper();
			self.data = new $.fn.jplist.data(self.options, self.helper, self.container, self.items);
			self.sort = new $.fn.jplist.sort(self.options, self.helper, self.data);
			self.paging = new $.fn.jplist.paging(self.options, self.helper, self.container, self.items, function(data_obj){
				print(self, data_obj);
			});	
			self.filter = new $.fn.jplist.filter(self.options, self.helper, self.container);		
			self.drop_down = new $.fn.jplist.dropdown(self.options, self.helper, self.container, self.paging, self.sort);		
			self.cookies = new $.fn.jplist.cookies(self.options, self.helper, self.data, self.filter, self.sort, self.paging, self.drop_down);
			self.no_results_el = $(self.options.no_results);
			
			//add css prefix
			self.container.addClass(self.options.css_prefix);
			
			//init events
			init_events(self);	
			
			//cookies
			if(self.options.cookies){
				self.cookies.get_cookies();	
			}

			//restore drop down
			self.drop_down.restore_dd();			
						
			//init view
			update_view(self);
			
			return $.extend(this, self);  
		};
		
		//API ----------------------------------------------------------------
		init.prototype.api_sort = function(sort_name, order, sort_type){		
			api_sort(this, sort_name, order, sort_type);			
		};
		
		init.prototype.api_pages_per_page = function(items_on_page){		
			api_pages_per_page(this, items_on_page);			
		};
		
		init.prototype.api_search = function(filter_name, value){		
			api_search(this, filter_name, value);			
		};
		
		init.prototype.jump_to_page = function(page){		
			jump_to_page(this, page);			
		};
		
		init.prototype.drop_down_filter = function(filter_name){		
			drop_down_filter(this, filter_name);			
		};
		
		$.fn.jplist = function(user_options){	
			return this.each(function(){
				
				//constructor
				var self = new init(user_options, $(this));
				init_events(self);
				$(this).data("jplist", self);
			});
		};		
	
})(jQuery);