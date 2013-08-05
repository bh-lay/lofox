/**
 * @author 作者:剧中人
 * @blog http://bh-lay.com/
 *  
 * lofox mean : location fox
 */
var lofox = {};

(function(ex){
	var HTML5 = function(base_url,call_back){
	
		$('a').on('click',function(){
			var url = $(this).attr('href'),
				title;
						
			call_back(url);
			
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
				call_back(state.url);
			}
			return false;
		});
	}
	
	ex.data = {
		'first' : true,
	};
	ex.init = function(base_url,call_back){
		if(ex.data['first']){
			if(window.history.pushState){
				console.log('This browser is support history API,using path url')
				HTML5(base_url,call_back);
			}else{
				
				alert('This browser is not support history API,using hash url')
			}
			ex.data['first'] = false;
		}else{
			
		}
	} ;
})(lofox);



$(function(){
	lofox.init('/',function(url){
		$('.pageCnt').load(url+' .pageInner');
	});
});
