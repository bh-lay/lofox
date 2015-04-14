var index_tpl = '<p>大家好，我是首页</p>';
var intro_tpl = '<p>简介</p>';
var about_tpl = '<p>关于我</p>';
var rest_tpl = 'error';
var $content = $('.content');
    

function addNew(txt){
  var last = $content.find('p').last();
  last.siblings().slideUp(100,function(){
    $(this).remove();
  });
  last.fadeTo(100,0.4).animate({
    fontSize: 20
  },100);
  var newDom = $(txt).hide();
  $content.append(newDom);
  newDom.fadeIn(400);
}

//创建一个lofox实例
var lofox = new util.lofox();

/**
*路由监听
*/
//首页
lofox.set('/lofox/index.html',function(){
  addNew(index_tpl);
});
//简介
lofox.set('/lofox/intro.html',function(){
  addNew(intro_tpl);
});
//关于
lofox.set('/lofox/about.html',function(){
  addNew(about_tpl);
});

//设置剩余未配置的页面
lofox.rest(function(){
    $content.html(rest_tpl);
});

/**
 * 监听特定链接的点击事件
 **/
$('.caption a').on('click',function(){
    var href = $(this).attr('href');
    //修改url
    lofox.push(href);
    //主动触发刷新视图回调
    lofox.refresh();
    return false;
});