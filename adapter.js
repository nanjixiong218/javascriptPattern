/**
 * 适配器模式
 * 适配器，字面意义上感觉应该是一种磨合两种东西的不同点的东西。
 * 在代码上的体现就是使两种具有不同接口的两个对象的能够用统一接口去调用，磨平掉这种接口的不一致性。请看下面的实例
 */

function Bird (){
    this.name="bird";
    this.color="none";
}
Bird.prototype.fly = function(){
    throw new Error("此方法必须被覆盖！");
};

//以上可以模拟接口

function Swallow(){
    Bird.apply(this);
    if(arguments.length!=0){//如果传参了，就覆盖掉继承的属性
        this.name=arguments[0];
        this.color=arguments[1];
    }
}
Swallow.prototype = new Bird();
Swallow.prototype.fly=function(){//必须重写fly
    console.log("Swallow fly!");
};
Swallow.prototype.swallowSay = function(){
    console.log("Swallow say!");
};

function Turkey(){
    Bird.apply(this);
    if(arguments.length!=0){//如果传参了，就覆盖掉继承的属性
        this.name=arguments[0];
        this.color=arguments[1];
    }
}
Turkey.prototype.fly = function (){
    console.log("Turkey fly");
};
Turkey.prototype.turkeySay = function(){
    console.log("turkey say!");
};
//swallow和turkey都继承制bird类，对于fly方法，他们的接口相同，且都是覆盖实现，
// 实际上应该有一个say方法也让他们同时继承实现，但是实际情况中有些时候原有设计不太好，
// 出现了各自分别有一个swallowSay，turkeySay方法，接口不同，
// 这个时候可以用一个适配器让他们统一接口

function TurkeyAdapterSwallow(oTurkey){//这个适配器用来适配swallow的方法
    Turkey.apply(this);
    this.oTurkey = oTurkey;
}
TurkeyAdapterSwallow.prototype = new Turkey();
TurkeyAdapterSwallow.prototype.swallowSay = function(){//适配swallowSay方法
    this.oTurkey.turkeySay();//内部实际调用的还是自己的say
};

//使用
var  bird = new Bird();
var swallow = new Swallow();
var turkey = new Turkey();

var turkeyAdapt = new TurkeyAdapterSwallow(turkey);

swallow.swallowSay();
turkey.turkeySay();
turkeyAdapt.swallowSay();//于是swallow对象和turkey对象接口就可以适配了

/**
  适配器使用场景
  使用一个已经存在的对象，但其方法或属性接口不符合你的要求；
  你想创建一个可复用的对象，该对象可以与其它不相关的对象或不可见对象（即接口方法或属性不兼容的对象）协同工作；
  想使用已经存在的对象，但是不能对每一个都进行原型继承以匹配它的接口。对象适配器可以适配它的父对象接口方法或属性。
 */
/*
适配器与其它模式区别比较

适配器和桥接模式虽然类似，但桥接的出发点不同，桥接的目的是将接口部分和实现部分分离，
从而对他们可以更为容易也相对独立的加以改变。
而适配器则意味着改变一个已有对象的接口。
装饰者模式增强了其它对象的功能而同时又不改变它的接口，因此它对应程序的透明性比适配器要好，其结果是装饰者支持递归组合，
而纯粹使用适配器则是不可能的。
代理模式在不改变它的接口的条件下，为另外一个对象定义了一个代理。
*/