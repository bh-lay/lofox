var index_tpl = '大家好，我是首页';
var intro_tpl = '简介';
var about_tpl = '关于我';
var rest_tpl = 'error';
var $content = $('.content');
    

//创建一个lofox实例
var lofox = new util.lofox();

/**
*路由监听
*/
//首页
lofox.set('/lofox/index.html',function(){
    $content.html(index_tpl);
});
//简介
lofox.set('/lofox/intro.html',function(){
    $content.html(intro_tpl);
});
//关于
lofox.set('/lofox/about.html',function(){
    $content.html(about_tpl);
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