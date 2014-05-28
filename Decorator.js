/**
 * 装饰者模式
 * Created by xu on 14-5-28.
 */


//example 1
function Computer(){//电脑裸机
    this.cost = function(){
        return 1000;
    }
}
function Memory(computer){//用这个函数装饰computer，实现带有内存的电脑。
// 它不当做内存类来用，而仍然是电脑类，只不过经过装饰之后，扩展了它的行为。用继承也可以实现，覆盖掉cost方法：比较两者区别？
    this.cost = function(){
        return computer.cost()+100;
    }
}
function BlurayDriver(computer){
    this.cost = function(){
        return computer.cost()+200;
    }
}
//使用：可以任意装饰
var computer1 = new Computer();
var computer2 = new Memory(computer1);
var computer3 = new BlurayDriver(computer1);
var computer4 = new Memory(computer3);
console.log("example1:");
console.log(computer1.cost());
console.log(computer2.cost());
console.log(computer3.cost());
console.log(computer4.cost());//感觉没有继承好，类型难以明确

//example2
console.log("example2:");
function Concrete(){
    this.perform = function(){
        this.pre();
        console.log("something");
        this.after();
    }
}
function AbstractDecorator(decorated){
    this.perform = function(){//这是装饰者方法，要和被装饰者具有同样的接口
        decorated.perform();
    }
}
function ConcreteDecorator1(decorated){//这是真正用于扩展功能的装饰者方法，把对被装饰者的扩展都写在这里。
    //this.base = AbstractDecorator;
    //this.base(decorated);这是大叔博客的写法，实际上就是继承至AbstractDecorator，
    // 区别就是大叔把AbstractDecorator暴露给this.base了，不明白为什么。对这个例子来说效果相同，不细追究
    AbstractDecorator.call(this,decorated);

    decorated.pre = function(){//扩展被装饰着
        console.log("pre1:this is doing pre1");
    };
    decorated.after = function(){
        console.log("after1:this is doing after1");
    }
}
function ConcreteDecorator2(decorated){
    //this.base = AbstractDecorator;
    //this.base(decorated);这是大叔博客的写法，实际上就是继承至AbstractDecorator，
    // 区别就是大叔把AbstractDecorator暴露给this.base了，不明白为什么。对这个例子来说效果相同，不细追究
    AbstractDecorator.call(this,decorated);

    decorated.pre = function(){
        console.log("pre2:this is doing pre2");
    };
    decorated.after = function(){
        console.log("after2:this is doing after2");
    }
}


//使用
var concrete = new Concrete();
var decorated1 = new ConcreteDecorator1(concrete);
decorated1.perform();
var decorated2 = new ConcreteDecorator2(concrete);
decorated2.perform();
decorated1.perform();
var decorated3 = new ConcreteDecorator1(decorated1);
decorated3.perform();
var decorated4 = new ConcreteDecorator2(decorated2);
decorated4.perform();
//评价，这种方式没看出好在哪里，而且被装饰后的对象，依赖于装饰前的对象，
// 比如对于decorated1和decorated2,他俩都依赖于concrete，对concrete的扩展方法改变了，他俩会同时变化。
// 而且扩展起来也不是很方便，还需要研究啊。

//example 3
console.log("example3:");
var tree = {};
tree.decorator = function(){//被装饰者
    console.log("我是被装饰者！");
};
tree.getDecorator = function(deco){
    tree[deco].prototype = this;//这里设置tree.Red等的原型，指向getDecorator的调用者，形成级联扩展
    return new tree[deco]();
};
tree.Red = function(){
    this.decorator = function(){
        this.Red.prototype.decorator();//这里面的this很有讲究
        console.log("red扩展！");
    }
};
tree.Blue = function(){
    this.decorator = function(){
        this.Blue.prototype.decorator();
        console.log("blue扩展！");
    }
}
var tree1 = tree.getDecorator("Red");
var tree2 = tree.getDecorator("Blue");
tree1.decorator();
tree2.decorator();
var tree3 = tree2.getDecorator("Red");//tree1也有工厂方法，在原型链上继承，tree3的原型为tree2
tree3.decorator();
//这个例子就很不错了，首先其扩展性很好，想要添加任何装饰性扩展，只需要像Red那样添加一个方法即可。
// 本质上和第一个例子很像，但是更灵活，并且通过原型调用被扩展者，不需要当形参传递。同时还通过原型提供了工厂方法。
//让任何子对象都能有工厂功能，形成级联扩展。
//所以这个例子很牛逼