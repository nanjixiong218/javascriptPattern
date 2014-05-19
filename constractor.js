/**
 * Created by xu on 14-5-19.
 */

//构造函数强制用new,其实就是同时支持工厂方法
function Person (prop1,prop2){
    if(!(this instanceof Person)){
        return new Person(prop1,prop2);
    }
    this.prop1 = prop1;
    this.prop2 = prop2;
}