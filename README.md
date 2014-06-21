#lofox是什么
一个用于单页面路由部署及url管理的工具。

#demo
目前lofox用于上海易班的[个人主页](http://www.yiban.cn)，和剧中人的博客[小剧客栈](http://bh-lay.com)。

#如何使用
lofox仅操作页面地址匹配及监控，不处理模块加在及MVC部分，下面一个个简单的例子。
```javascript
    //创建一个监管实例
    var lofox = new util.lofox();
    
    //监听地址
    lofox.set('/',function(){
        this.title('小剧客栈_剧中人的个人空间');
	    //do something
	});
    lofox.set('/blog',function(){
        this.title('博文列表页');
	    //do something
	});
    
    
    //修改地址(不检测set记录)
    lofox.push(url);
    //匹配set记录
	lofox.refresh();
```