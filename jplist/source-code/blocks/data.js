(function($){
	"use strict";
	
	var init_sort_indexes = function(self){
		
		var i=0;
		
		for(var sort_name in self.options.sort){
			self.sort_indexes["sort-" + sort_name] = i;
			i++;				
		}
	};
	
	var init_filter_indexes = function(self){
		
		var i=0;
		
		for(var filter_name in self.options.filter){
			self.filter_indexes["filter-" + filter_name] = i;				
			i++;				
		}
	};
	
	var get_items = function(self){
	
		var item, html, sort_arr, filter_arr;
		
		for(var i=0; i<self.items.length; i++){
		
			//get item
			item = self.items.eq(i);
			
			//get item html
			html = self.helper.get_outer_html(item);
			
			//init sort and filter arrays
			sort_arr = new Array();
			filter_arr = new Array();
			
			//init sorting data
			for(var sort_name in self.options.sort){
				sort_arr.push([item.find(self.options.sort[sort_name]).text()]);
			}
			
			//init filter data
			for(var filter_name in self.options.filter){
				filter_arr.push([item.find(self.options.filter[filter_name]).text()]);						
			}
			
			//add item data to array
			self.data.push([i, html, sort_arr, filter_arr]);
		}
	};
			
	//constructor
	var init = function(options, helper, box, items){
	
		var self = {
			data: new Array(),
			attributes: {ID:0, HTML:1, SORT_ARR:2, FILTER:3},
			url: document.URL,
			sort_indexes: new Array(),
			filter_indexes: new Array()
		};
	
		//init vars
		self.options = options;
		self.helper = helper;
		self.box = box;
		self.items = items;
		
		//init sort and filter option indexes
		init_sort_indexes(self);
		init_filter_indexes(self);
		
		//create data array
		get_items(self);
		
		return self;
	};
		
	/** @constructor */
	$.fn.jplist.data = function(options, helper, box, items){
		
		//call constructor
		return init(options, helper, box, items);
	};
})(jQuery);

