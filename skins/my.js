/**
 * @author 作者:剧中人
 * @blog http://bh-lay.com/
 *  
 * lofox mean : location fox
 */
var lofox = {};

/*
 * render page
 */

(function(ex){
	var render = function(url){
		$('.pageCnt').load(url+' .pageInner');
	}
	ex.render = render;
})(lofox);

//
(function(ex){
	var init = function(){
	
		$('a').on('click',function(){
			var url = $(this).attr('href'),
				title;
						
			lofox.render(url);
			
			window.history.pushState({
				url: url,
			},'test',url);
			return false
		});
		window.addEventListener('popstate',function(e){
			console.log(e);
			var state = e.state || {};
			console.log(state);
			if(state.url){
				lofox.render(state.url);
			}
			return false;
		});
	}
	lofox.init = init ;
})(lofox);

$(function(){
	if(window.history.pushState){
		console.log('support',new Date())
		lofox.init();
	}else{
		console.log('not support',new Date())
	}
});
