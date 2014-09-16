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
    function init (arg1,arg2){
        this.name = "singleTest";
        this.property1 = arg1;
        this.property2 = arg2;
    }
    init.prototype.method1=function(){};
    init.prototype.method2=function(){};
    return {
        name:"singleTest",
        getInstance:function(arg1,arg2){
            if(!instance){
                instance =new init(arg1,arg2);
                return instance;
            }else{
                return instance;
            }
        }
    }
})();

//一般实现方法1
//构造函数保存instance属性
function SingV4 (){
    if(typeof SingV4.instance === 'object'){
        return SingV4.instance;
    }
    this.p1='p1';
    SingV4.instance = this;
}

//一般方法2
//重写构造方法
function SingV5(){
    var instance = this;
    this.p1 = "p1";
    SingV5 = function(){
        return instance;
    }
}
//方法3
//没看懂这样写的好处
//阻止了return this；this成为了其原型，也就是可以通过设置this来设置原型，没什么意义啊？
function SingV6(){
    //缓存实例
    var instance;
    //重写构造方法

    SingV6 = function(){
        return instance;
    };
    //后期处理原型属性
    SingV6.prototype = this;

    instance = new SingV6();
    instance.constructor = SingV6;

    instance.p1="p1";

    return instance;
}
//方法4
//用立即执行函数实现
var SingV7 ;
(function(){
    var instance;
    SingV7 = function(){
        if(instance){
            return instance;
        }
        instance = this;
        this.p1 = "p1";
    }
})();