(function($){
	"use strict";
	
	
	
	var get_from_arr = function(self, data_item, sort_name){
		
		var sort_index, data_item_sort_arr, txt = "";
		
		//get sort index
		sort_index = self.data.sort_indexes["sort-" + sort_name];
		
		//get sort array
		data_item_sort_arr = data_item[self.data.attributes.SORT_ARR];
		
		//get sorted text
		txt = data_item_sort_arr[sort_index];
		
		return txt;
	};
	
	var get_date = function(val){	
		return new Date(Date.parse(val));
	};	
	
	var sort_name_exists = function(self, sort_name){
	
		var exists = false;
	
		if(sort_name == "default"){
			exists = true;
		}
		else{
			if(sort_name != undefined && sort_name != ""){
			
				for(var name in self.options.sort){
			
					if(sort_name == name){
						exists = true;
					}
				}
			}
		}

		return exists;
	};
	
	var sort_data = function(self, data){
		
		if(self.sort_name == "default"){
			data.sort(function(a, b){
		
				var x = a[self.data.attributes.ID];
				var y = b[self.data.attributes.ID];
										
				if(self.order == "asc"){
				
					if(x == "")	{return 1;}						
					if(y == "")	{return -1;}
				}	
				else{
					if(y == "")	{return 1;}						
					if(x == "")	{return -1;}
				}
				
				return x - y;				
			});
		}
		else{
			switch(self.type){
				case "number":{
					data.sort(function(a, b){
				
						var x = get_from_arr(self, a, self.sort_name);
						var y = get_from_arr(self, b, self.sort_name);	
						
						//if x or y not numbers
						x = x.toString().replace(/[^0-9]+/g,'');
						y = y.toString().replace(/[^0-9]+/g,'');
												
						if(self.order == "asc"){
						
							if(x == "")	{return 1;}						
							if(y == "")	{return -1;}
						}	
						else{
							if(y == "")	{return 1;}						
							if(x == "")	{return -1;}
						}
						
						return x - y;				
					});
					break;
				}
				case "date":{
					data.sort(function(a, b){
						
						var x = get_from_arr(self, a, self.sort_name);
						var y = get_from_arr(self, b, self.sort_name);
						
						var date1 = get_date(x)
						var date2 = get_date(y)
						
						return date1 > date2 ? 1 : -1; 
					});	
					break;
				}
				default:{ //text
					data.sort(function(a, b){
						
						var x = get_from_arr(self, a, self.sort_name);
						var y = get_from_arr(self, b, self.sort_name);
						
						if(x == undefined || y == undefined){
							return x > y ? 1 : -1; 
						}
						else{
							return x.toString().toLowerCase() > y.toString().toLowerCase() ? 1 : -1; 
						}						
					});	
					break;
				}
			}	
		}
					
		if(self.order == "desc"){
			data.reverse(function(a, b){
			
				var x = get_from_arr(self, a, self.sort_name);
				var y = get_from_arr(self, b, self.sort_name);
				
				if(x == undefined || y == undefined){
					return x > y ? 1 : -1; 
				}
				else{
					return x.toString().toLowerCase() > y.toString().toLowerCase() ? 1 : -1; 
				}	
			});
		}
		
		return data;
	};
	
	/** @constructor */
	var init = function(options, helper, data){
	
		var self = {};
		
		//init self
		self.options = options;
		self.helper = helper;
		self.data = data;
		
		self.order = options.sort_order;
		self.sort_name = options.sort_name;
		self.type = options.sort_type;
		
		return $.extend(this, self);
	};
	
	//api ------------------------------------------
	init.prototype.sort_name_exists = function(sort_name){
		return sort_name_exists(this, sort_name);
	};
	
	init.prototype.sort_data = function(data){
		return sort_data(this, data);
	};
		
	/** @constructor */
	$.fn.jplist.sort = function(options, helper, data){	
		return new init(options, helper, data);
	};
})(jQuery);
