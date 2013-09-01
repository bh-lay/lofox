/**
 * @author 作者:剧中人
 * @blog http://bh-lay.com/
 *  
 * lofox mean : location fox
 */
var lofox = {};

(function(exports){
	var HTML5 = function(call_back){
		window.addEventListener('popstate',function(e){
			//console.log(e);
			var state = e.state || {};
			//console.log(state);
			if(state.url){
				call_back(state.url);
			}
			return false;
		});
		exports.push = function(url){
			call_back(url);
			window.history.pushState({
				url: url
			},'test',url);
		}
	};	
	var HASH = function(call_back){
		var hash = window.location.hash;
		
		setInterval(function(){
			var new_hash = window.location.hash||'#';
			if(new_hash != hash){
				hash = new_hash;
				var url = hash.replace(/^#/,'');
				call_back(url);
			}
		},30);
		
		exports.push = function(url){
			window.location.hash = url;
		}
	}
	
	exports.start = function(call_back){
		
		if(window.history&&window.history.pushState){
			console.log('This browser is support history API,using path url now !');
			HTML5(call_back);
		}else{
			alert('This browser is not support history API,using hash url now !');
			HASH(call_back);
		}
		//reset init function
		exports.init = function(){
			console.log('you should init lofox only once !');
		}
	};
})(lofox);



$(function(){
	lofox.start(function(url){
		$('.pageCnt').load(url+' .pageInner');
	});
	$('a').on('click',function(){
		var url = $(this).attr('href');
		lofox.push(url);
		return false
	});
});
