/**
 * 模板方法模式
 * Created by Administrator on 14-5-26.
 */

//模板方法（TemplateMethod）定义了一个操作中的算法的骨架，而将一些步骤延迟到子类中。
// 模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。在类库中尤为重要。

function DrinkBase(){

}
DrinkBase.prototype.prepare = function(){//方法的逻辑过程已经固定，不可变。但是可以通过重载步骤方法来实现不同具体过程。此方法为末模板方法
    this.boilWater();
    this.brew();
    this.pourOnCup();
    if(this.customWantsCondiments){
        this.addCondiments();
    }
};
DrinkBase.prototype.boilWater = function(){
    console.log("将水烧开！！");
};
DrinkBase.prototype.pourOnCup = function(){
    console.log("将饮料倒入杯子中！");
};
DrinkBase.prototype.brew = function(){
    throw new Error("该方法必须重写！");
};
DrinkBase.prototype.addCondiments = function(){
    throw new Error("该方法必须重写！");
};
DrinkBase.prototype.customWantsCondiments = function(){
    return true;
};


//冲咖啡
function Coffee (){
    DrinkBase.apply(this);
};
Coffee.prototype = new DrinkBase();
Coffee.prototype.brew = function(){
    console.log("冲咖啡！");
};
Coffee.prototype.addCondiments=function(){
    console.log("添加糖和牛奶！");
};
Coffee.prototype.customWantsCondiments=function(){
    return confirm("想要加糖和牛奶么？");
}
//冲茶
function Tea(){
    DrinkBase.apply(this);
}
Tea.prototype = new DrinkBase();
Tea.prototype.brew = function(){
    console.log("冲茶！");
};
Tea.prototype.addCondiments = function(){
    console.log("添加柠檬！");
};
Tea.prototype.customWantsCondiments = function(){
    return confirm("是否要加柠檬？");
}
/**
模板方法应用于下列情况：

1、一次性实现一个算法的不变的部分，并将可变的行为留给子类来实现
2、各子类中公共的行为应被提取出来并集中到一个公共父类中的避免代码重复，不同之处分离为新的操作，最后，用一个钓鱼这些新操作的模板方法来替换这些不同的代码
3、控制子类扩展，模板方法只在特定点调用“hook”操作，这样就允许在这些点进行扩展
   和策略模式不同，模板方法使用继承来改变算法的一部分，而策略模式使用委托来改变整个算法。
*/