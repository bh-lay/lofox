/**
 * @author bh-lay
 * @github https://github.com/bh-lay/lofox
 * @modified 2014-2-26 17:55
 *  location fox
 */
window.util = window.util || {};

(function(exports){
	function searchParser(search){
		var resultObj = {};
		if(search && search.length > 1){
			var items = search.split('&');
			for(var index = 0 ; index < items.length ; index++ ){
				if(! items[index]){
					continue;
				}
				var kv = items[index].split('=');
				resultObj[kv[0]] = typeof kv[1] === "undefined" ? "":kv[1];
			}
		}
		return resultObj;
	}

	var HTML5 = function(){
		var this_fox = this;
		
		window.addEventListener('popstate',function(e){
			//console.log(e);
			var state = e.state || {};
			//console.log('from popstate event !',state);
			var url = state.url || null;
			//清除第一次不确定性的触发
			if(url){
				this_fox.refresh(url);
			}
			return false;
		});
		this.push = function(url){
			window.history.pushState({
				url: url
			},'test',url);
		}
	};	

	var HASH = function(){
		var this_fox = this;
		
		//由于hash的特殊性，通过此值来判断是否需要触发refresh方法
		var private_need_refresh = true;
		//记录hash值
		var private_oldHash = window.location.hash;
		
		if(typeof(window.onhashchange) != 'undefined'){
			window.onhashchange = function(e){
				var new_hash = window.location.hash || '#';
			//	console.log('event',new_hash);
				private_oldHash = new_hash;
				var url = new_hash.replace(/^#/,'');
				
				if(private_need_refresh){
					this_fox.refresh(url);
				}else{
					private_need_refresh = true;
				}
			}
		}else{
			setInterval(function(){
				var new_hash = window.location.hash || '#';
		//		console.log('interval',new_hash);
				//hash发生变化
				if(new_hash != private_oldHash){
					private_oldHash = new_hash;
					var url = new_hash.replace(/^#/,'');
					
					if(!private_need_refresh){
						this_fox.refresh(url);
					}else{
						private_need_refresh = true;
					}
				}
			},50);
		}
		
				
		//初始化处理hash
		if(private_oldHash.length <= 2){
			private_oldHash = window.location.pathname;
			window.location.hash = private_oldHash;
		}
		this.push = function(url){
			private_need_refresh = false;
			this.url = url;
			window.location.hash = url;
		}
	}
	
	function EMIT(eventName,args){
		//事件堆无该事件，结束运行
		if(!this.events[eventName]){
			return
		}
		for(var i=0,total=this.events[eventName].length;i<total;i++){
			this.events[eventName][i].apply(this,args);
		}
	}
	function LOFOX(){
		var this_fox = this;
		this.events = {};
		this.push = null;
		this.map = {};
		this._other = null;
		//this is a function return [routerName,args]
		this._router = null;
		if(window.history&&window.history.pushState){
			this._use = 'html5';
			HTML5.call(this);
		}else{
			this._use = 'hash';
			HASH.call(this);
		}
		//为异步接口
		setTimeout(function(){
			this_fox.refresh();
		},10);
		//执行set方法设置的回调
		this.on('change',function(pathData,searchData){
			if(this._router){
				var filterData = this._router(pathData,searchData);
				if(!filterData){
					return
				}
				var routerName = filterData[0];
				var args = [];
				if(typeof(filterData[1]) == 'object' && filterData[1].length){
					args = filterData[1];
				}
				
				if(this.map[routerName]){
					this.map[routerName]['renderFn'].apply(window,args);
				}else{
					this._other && this._other(pathData,searchData);
				}
			}
		});
	}
	LOFOX.prototype = {
		'router' : function(callback){
			this._router = callback;
		},
		'other' : function(callback){
			this._other = other;
		},
		'on' : function ON(eventName,callback){
			//事件堆无该事件，创建一个事件堆
			if(!this.events[eventName]){
				this.events[eventName] = [];
			}
			this.events[eventName].push(callback);
		},
		'set' : function(routerName,title,callback){
			var routerName = arguments[0];
			var title = typeof(arguments[1]) == 'string' ? arguments[1] :null;
			var callback = typeof(callback) =='function' ? callback :null;
			this.map[routerName] = {
				'title' : title,
				'renderFn' : callback
			};
		},
		'refresh' : function (url){
			var urlString;
			if(url){
				urlString = url ;
			}else if(this._use == 'html5'){
				urlString = window.location.pathname+window.location.search+window.location.hash;
			}else if(this._use == 'hash'){
				urlString = window.location.hash || '#';
				//去除hash标记{#}
				urlString = urlString.replace(/^#/,'');
			}
			
			var urlSplit = urlString.length>0 ? urlString.split(/\?/) : ['',''];
		
			var urlStr = urlSplit[0].split('#')[0];
			var searchStr = urlSplit[1];
			//去除首尾的‘/’
			urlStr = urlStr.replace(/^\/*|\/*$/g,'');
			var pathData = urlStr.split(/\//);
			
			if(pathData.length == 1 && pathData[0] == ''){
				pathData = [];
			}
//			console.log(pathData,2);
			var searchData = searchParser(searchStr);
			EMIT.call(this,'change',[pathData,searchData]);
		}
	};
	
	exports.lofox = function(){
		return new LOFOX()
	};
})(window.util);