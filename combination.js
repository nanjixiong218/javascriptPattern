/**
 * 组合模式
 * Created by xu on 14-5-25.
 */


function MenuComponent(name,desc){
    this.name = name||'菜单';
    this.desc = desc||'未命名';
}
MenuComponent.prototype.getName=function(){
    return this.name;
};
MenuComponent.prototype.getDesc=function(){
    return this.desc;
};
MenuComponent.prototype.print=function(){
    throw new Error('此方法没有重写！');
}

function Menu (name,desc,type){
    MenuComponent.apply(this,[name,desc]);
    this.menuComps=[];
    this.type=type;
}
Menu.prototype = new MenuComponent();
Menu.prototype.getType=function(){
    return this.type;
};
Menu.prototype.print=function(){
    console.log("菜单为："+this.name +";类型："+this.type+";描述："+this.desc);//这里没有使用getName等，需要思考为什么要有getName方法
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    for(var i =0;i<this.menuComps.length;i++){
        this.menuComps[i].print();
    }
};
Menu.prototype.add = function(oMenuComponent){
    this.menuComps.push(oMenuComponent);
};
Menu.prototype.remove=function(oMenuComponent){//通过什么删除比较哦有讲究，是按名字删除，还是传递一个对象删除，tom大叔中是安对象删除，这种不是很好,而且是重构数组的方式删除
      //所以这就要考虑数据结构的问题了，用什么来存储所有子菜单呢，顺序数组还是链数组
    //javascript中还可以用类数组
    //这里先按tom大叔的用数组，但是我用splice方法进行删除
    var i =0;
    var len = this.menuComps.length;
    for(;i<len;i++){
        if(this.menuComps[i]===oMenuComponent){
            this.menuComps.splice(i,1);
            break;//还有一个数组中是否有重复项问题没有考虑
        }
    }
};
Menu.prototype.getChild=function(index){//这里按索引获取
    //缺少合法性验证
    return this.menuComps[index];
};
function MenuItem(name,desc,price){
    MenuComponent.apply(this,[name,desc]);
    this.price = price;
}
MenuItem.prototype = new MenuComponent();
MenuItem.prototype.getPrice =function(){
    return this.price;
};
MenuItem.prototype.print=function(){
    console.log("菜单项："+this.getName()+"描述："+this.getDesc()+";价格："+this.getPrice());
}

function MenuBook(menus){//看起来像是接收一个菜单数组，实际上就是一个菜单对象（其中可以包括很多子菜单）。
    this.menus = menus;
}
MenuBook.prototype.print=function(){
    this.menus.print();
};

var item1 = new MenuItem("egg","turkey eggs","10$");
var item2 = new MenuItem("pig","my hometown pigs","120$");
var menu1 = new Menu("家常","东北家常菜","type1");
var menu2 = new Menu("清淡","素食","type2");
var menuall = new Menu("all","整体菜单1","type3");
var menubook = new MenuBook(menuall);
menu1.add(item1);
menu2.add(item2);
menuall.add(menu1);
menuall.add(menu2);
menubook.print();
