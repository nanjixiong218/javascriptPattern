/**
 * Created by xu on 14-5-19.
 */


var page = page || {};
page.dom = page.dom || {};
page.dom.Text = function(where){
    this.insert = function(){
        var txt = document.createTextNode(this.url);
        where.appendChild(txt);
    }
};
page.dom.Link = function(where){
    this.insert = function(){
        var link = document.createElement('a');
        link.href = this.url;
        link.appendChild(document.createTextNode(this.url));
        where.appendChild(link);
    }
};
page.dom.Image = function(where){
    this.insert = function(){
        var img = document.createElement('img');
        img.src=this.url;
        where.appendChild(img);
    }
};
page.dom.factory = function(type){
    return new page.dom[type];//方法调用可以省略()
};


//插入一个元素可以这样使用
var  o = page.dom.factory('Link');
o.url='http://www.baidu.com';
o.insert(document.body);

/*
以下几种情景下工厂模式特别有用

1、对象的构建十分复杂
2、需要依赖具体环境创建不同实例
3、处理大量具有相同属性的小对象

 //上面那个例子中需要根据不同环境创建不同的对象，同时需要处理大量属性相同的小对象

什么时候不该用工厂模式

不滥用运用工厂模式，有时候仅仅只是给代码增加了不必要的复杂度，同时使得测试难以运行下去。
*/