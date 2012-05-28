(function($){
	"use strict";	
	
	var format = function(val){
		var temp = new String(val);				
		temp = temp.replace(/[^a-zA-Z0-9]+/g,'');
		return temp.toLowerCase();
	};
	
	var if_add_item = function(arr){
		var res = true;
		for(var i=0; i<arr.length; i++){
			res = res & arr[i];
		}			
		return res;
	};
	
	//init placeholder attribute for ie
	var init_placeholders = function(self, input_fields){	
	
		var parent_div, input, placeholder, val;
		
		if(!self.support_placeholder){
			
			for(var i=0; i<input_fields.length; i++){
			
				//get input field
				input = input_fields.eq(i);
				val = input.attr("placeholder");
				
				//create wrapper for the input
				input.wrap("<div class='placeholder-parent'></div>");
				
				//get parent
				parent_div = input.parent("div");
				
				//add placeholder
				parent_div.append("<div class='placeholder'></div>");
				placeholder = parent_div.children(".placeholder");
				
				//update placeholder css
				placeholder.text(val);
				
				parent_div.click(function(){					
					$(this).find(".placeholder").hide();	
					input.focus();
				});
			}
		}
	};
		
	var filter_data = function(self, data){
	
		var filtered = new Array();
		var filter_arr, item;
		var item_to_add_arr;
		var data_arr = data.data;
		var val, filter_name, filter_index, data_item;
		
		for (var i=0; i<data_arr.length; i++){
		
			//get item
			item = data_arr[i];
			
			//get filter array from data array
			filter_arr = item[data.attributes.FILTER]; //dataObj.consts.FILTER_ARR
			
			//init values arr
			item_to_add_arr = new Array();
			
			self.input_fields.each(function(){				
				
				//get input field current value
				val = format($(this).val());
				
				//get input field class name (filter name)
				filter_name = $(this).attr("data-name");
				
				//get filter index
				filter_index = data.filter_indexes["filter-" + filter_name];
				
				//get data item
				data_item = filter_arr[filter_index];
				
				if((format(data_item[0]).indexOf(val) != -1) || ($.trim(val) == "")){							
					item_to_add_arr.push(true);
				}
				else{
					item_to_add_arr.push(false);
				}
			});				
			
			if(if_add_item(item_to_add_arr)){
				filtered.push(item);
			}
		}
		
		return filtered;
	};
	
	//filter one drop down from collection
	var filter_dd_data_instance = function(self, data, data_arr, dd){
		
		var panel, type, item, filter_arr, filter_index, data_item;
		var filtered = new Array();	
		
		//get filter type
		panel = dd.find(".panel");
		type = panel.attr("data-name");		
		
		for (var i=0; i<data_arr.length; i++){
		
			//get item
			item = data_arr[i];
			
			//get filter array from data array
			filter_arr = item[data.attributes.FILTER];
			
			//get filter index
			filter_index = data.filter_indexes["filter-" + type];
			
			//get data item
			data_item = filter_arr[filter_index];
			
			if(data_item != "" || type == "default"){
				filtered.push(item);
			}
		}

		return filtered;		
	};
	
	//filter drop down collection
	var filter_dd_data = function(self, data, data_arr){	
		
		var filtered = data_arr;	
		
		if(self.filter_dd_pathes.length > 0){
			self.filter_dd_pathes.each(function(){
				filtered = filter_dd_data_instance(self, data, filtered, $(this));
			});
		}
		else{
			filtered = data_arr;
		}
		
		return filtered;
	};
	
	/** @constructor */
	var init = function(options, helper, box){
		
		var self = {		
			support_placeholder: ("placeholder" in document.createElement("input"))
		};
	
		//init self
		self.options = options;
		self.helper = helper;
		self.box = box;
		self.filter_pathes = box.find(options.filter_path);
		self.filter_dd_pathes = box.find(options.filter_dd_path);
		
		//filter input fields
		self.input_fields = self.filter_pathes.find("input");
		
		//init placeholder
		init_placeholders(self, self.input_fields);
		
		return $.extend(this, self);
	};
	
	//api -----------------
	init.prototype.filter_data = function(data){
		return filter_data(this, data);
	};
	
	init.prototype.filter_dd_data = function(data, data_arr){
		return filter_dd_data(this, data, data_arr);
	};		
		
	/** @constructor */
	$.fn.jplist.filter = function(options, helper, box){
	
		//call constructor
		return new init(options, helper, box);
	};
})(jQuery);
