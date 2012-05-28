(function($){
	"use strict";	
	
	var get_pages_num = function(self, items_on_page){
		return Math.ceil(self.all_items_num/items_on_page);
	};
	
	var getprevpage = function(self){
		if(self.cpage <= 0){
			return 0;
		}
		else{
			return self.cpage - 1;
		}
	};
	
	var getnextpage = function(self){
		if(self.cpage >= get_pages_num(self, self.items_on_page) - 1){
			return get_pages_num(self, self.items_on_page) - 1;
		}
		else{
			return eval(self.cpage) + 1;
		}
	};
	
	var update_bullets = function(self){
	
		var start, end, diff, temp;
		var html = "";
	
		if(self.cpage >= 0 && self.cpage < get_pages_num(self, self.items_on_page)){
		
			diff = Math.floor(self.cpage / self.options.paging_length);
			start = self.options.paging_length*diff;
			end = self.options.paging_length*(diff + 1);
			
			if(end > get_pages_num(self, self.items_on_page)){
				end = get_pages_num(self, self.items_on_page);
			}
			
			html +=	"<div class='pagesbox'>";			
			for(var i=start; i<end; i++){
				
				html += "<span";						
				if(i == self.cpage){
					html += " class='current'";
				}
				temp = i + 1;
				html += ">" + temp + "</span> ";
			}
			html +=	"</div>";
			
			self.pagingmid.html(html);				
		}
	};
	
	var setarrowview = function(self){
		
		//set pagingprev visibility
		if(self.cpage == 0){//< self.options.paging_length
			self.pagingprev.addClass("hidden");
		}
		else{
			self.pagingprev.removeClass("hidden");
		}
		
		//set pagingnext visibility
		if(self.cpage == get_pages_num(self, self.items_on_page) - 1){ //>= Math.floor(hndl.get_pages_num(hndl.items_on_page)/options.paging_length)*options.paging_length){
			self.pagingnext.addClass("hidden");
		}
		else{
			self.pagingnext.removeClass("hidden");
		}	
	};
	
	var set_paging_display = function(self){			
		
		if(get_pages_num(self, self.items_on_page) <= 1){
			if(!self.options.show_one_page){
				self.pagingbox.addClass("hidden");
			}
		}
		else{
			self.pagingbox.removeClass("hidden");
		}
	};
	
	var update_info = function(self, start, end, all){
	
		var info, info_type;
		var temp = eval(self.cpage) + 1;
		
		for(var i=0; i<self.pageinfo.length; i++){
		
			//get info
			info = self.pageinfo.eq(i);
			
			//get type
			info_type = info.attr("data-type");
			
			if(info_type == "page"){
				info.html("Page " + temp + " of " + eval(get_pages_num(self, self.items_on_page))); //Page 2 of 45
			}
			else{
				info.html((eval(start) + 1) + " - " + eval(end) + " of " + eval(all)); //1 - 20 of 48
			}	
		}
	};	
	
	var set_paging = function(self, data_obj){
		
		var start = self.cpage*self.items_on_page;
		var end = start + eval(self.items_on_page);
		var all = data_obj.length;
		self.pagingView = data_obj;
		
		if(end > data_obj.length){
			end = data_obj.length;
		}
										
		//update vars
		self.all_items_num = all;
		
		//update data array
		data_obj = data_obj.slice(start, end);
		
		//update info
		update_info(self, start, end, all);
		
		//update bullets
		update_bullets(self);
		
		//arrow
		setarrowview(self);
		
		//if one page
		set_paging_display(self);
		
		if($.isFunction(self.callback)){
			self.callback(data_obj);
		};	
		
		return data_obj;
	};
	
	var init_html = function(self){
	
		self.pagingbox.html("<div class='pagingprev'></div><div class='pagingmid'></div><div class='pagingnext'></div>");
		self.pagingprev = self.pagingbox.find(".pagingprev");
		self.pagingmid = self.pagingbox.find(".pagingmid");
		self.pagingnext = self.pagingbox.find(".pagingnext");
		
		self.pagingprev.html("<span class='first'>" + self.options.first_arrow + "</span><span class='prev'>" + self.options.prev_arrow + "</span>");
		self.pagingnext.html("<span class='next'>" + self.options.next_arrow + "</span><span class='last'>" + self.options.last_arrow + "</span>");
		
		self.first = self.pagingprev.find(".first");
		self.prev = self.pagingprev.find(".prev");
		self.next = self.pagingnext.find(".next");
		self.last = self.pagingnext.find(".last");
	};
	
	var init_events = function(self){	
		
		self.first.click(function(){
			
			self.cpage = 0;
			set_paging(self, self.pagingView);
		});
		
		self.prev.click(function(){
			self.cpage = getprevpage(self);
			set_paging(self, self.pagingView);
		});
		
		self.next.click(function(){
			self.cpage = getnextpage(self);
			set_paging(self, self.pagingView);
		});
		
		self.last.click(function(){
			self.cpage = get_pages_num(self, self.items_on_page) - 1;
			set_paging(self, self.pagingView);
		});	
		
		self.pagingmid.find("span").live("click", function(){		
			
			//console.log(self.pagingView);
			var page = $(this).text() - 1;
			self.cpage = page;
			set_paging(self, self.pagingView);
		});
	};
	
	/** @constructor */
	var init = function(options, helper, box, items, callback){
		
		var self = {
			cpage: 0,
			pagingView: new Array(),		
			
			pagingprev: "",
			pagingmid: "",
			pagingnext: "",
			
			first: "",
			prev: "",
			next: "",
			last: ""
		};
	
		self.options = options;
		self.helper = helper;
		self.box = box;
		self.items = items;
		self.callback = callback;
		self.all_items_num = items.length;
		self.pageinfo = box.find(options.pageinfo);			
		self.pagingbox = box.find(options.pagingbox);
		self.items_on_page = options.items_on_page;
		
		//init html
		init_html(self);
		
		//init events
		init_events(self);
		
		return $.extend(this, self);
	};
	
	//api -----------------------------------------------------------------
	init.prototype.set_paging = function(data_obj){
		return set_paging(this, data_obj);
	};

	/** @constructor */
	$.fn.jplist.paging = function(options, helper,  box, items, callback){	
	
		//constructor call
		var self =  new init(options, helper,  box, items, callback);		
		init_events(self);
		return self;		
	};
})(jQuery);