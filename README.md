#lofox是什么
一个用于单页面路由管理的工具。[demo](http://bh-lay.github.io/lofox/index.html)

#demo
目前lofox用于易班（学生互动社区）的[个人主页](http://www.yiban.cn/p/767294)，和剧中人的博客[小剧客栈](http://bh-lay.com)。

#如何使用
lofox操作页面地址匹配及监控，不处理模加载及MVC部分，下面一个个简单的例子。

```javascript
//创建一个监管实例
var app = new util.lofox();
//监听地址
app.set('/',function(){
  this.title('小剧客栈_剧中人的个人空间');
  //do something
});
app.set('/blog',function(){
  this.title('博文列表页');
  //do something
});

app.set('/blog/{id}',function(data){
  this.title('博文详情页');
  alert('id为：' + data.id);
  //do something
});

app.set('/blog/{id}',function(data){
  this.title('博文详情页');
  alert('id为：' + data.id);
  //do something
});
//发布相关
app.set([
	'/publish/',
	'/publish/{type}',
	'/publish/{type}/{id}'
],function(data){
	this.title('发布台');
	//do something
	
});

//未匹配到的url规则
app.rest(function(){
	//do something
});


//监听页面地址发生变化
app.on('change',function(url){
  //更新面包屑，或其他
});

//主动修改url并刷新
$('body').on('click','a.singlePage',function(){
  var url = $(this).attr('href');
  //修改地址(不检测set记录)
  app.push(url)
  //匹配set记录
  app.refresh();
});
```
