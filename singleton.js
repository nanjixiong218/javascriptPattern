/**
 * Created by xu on 14-5-19.
 */
    //基本思路
var SingV1 = (function(){
    var instance;

    return {
        getInstance:function(){
            if(!instance){
                instance = {
                    name:"xu",
                    age:"12"
                };
                return instance;
            }else{
                return instance;
            }
        }
    }
})();

//这种创建对象的方式不太好，没有用到原型，对方法的存储重复了，浪费空间。
var SingV2 = (function(){
    var instance;
    function init (){
        //分离出单例的实例化过程
        return {
            properties:'test',
            method:function(){
                console.log("test");
            }
        }
    }
    return {
        getInstance:function(){
            if(!instance){
                instance = init();
                return instance;
            }else{
                return instance;
            }
        }
    }
})();
//这个就可以用function的prototype了
var SingV3 = (function(){
    var instance;
    function init (args){
        args = args||{};
        this.name = "singleTest";
        this.property1 = arges.property1;
        this.property2 = arges.property2;
    }
    init.prototype.method1=function(){};
    init.prototype.method2=function(){};
    return {
        name:"singleTest",
        getInstance:function(args){
            if(!instance){
                instance =new init(arges);
                return instance;
            }else{
                return instance;
            }
        }
    }
})();

//一般实现方法1
//构造函数保存instance属性
function Universe1 (){
    if(typeof Universe1.instance ==='object'){
        return Universe1.instance;
    }
    this.p1='p1';

    Universe1.instance=this;
}

//一般方法2
//重写构造方法
function Universe2(){
    var instance = this;
    this.p1="p1";
    Universe2=function(){
        return instance;
    }
}
//方法3
//没看懂这样写的好处
//阻止了return this；this成为了其原型，也就是可以通过设置this来设置原型，没什么意义啊？
function Universe3(){
    //缓存实例
    var instance;
    //重写构造方法

    Universe3 = function(){
        return instance;
    }
    //后期处理原型属性
    Universe3.prototype = this;

    instance = new Universe3();
    instance.constructor = Universe3;

    instance.p1="p1";

    return instance;
}
//方法4
//用立即执行函数实现
var Universe4 ;
(function(){
    var instance;
    Universe4 = function(){
        if(instance){
            return instance;
        }
        instance =this;
        this.p1="p1";
    }
})();