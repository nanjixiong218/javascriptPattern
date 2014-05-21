/**
 * Created by Administrator on 14-5-21.
 */
//这是一个购买管理类
var bugManager = {
    getInfo:function(name,id){
        return "this is "+name+" ,it's id is :"+id;
    },
    buy:function(name,id){
        return "you have successful buy "+name+",it's id is :"+id;
    },
    book:function(name,id){
        return "you have successful booked "+name+"it's id is :"+id;
    }
}

//一般的使用是直接调用方法
//但在某些场合，比如要对行为进行“记录、撤销/重做、事务”等处理,就不能直接调用，而需要解耦请求和执行

bugManager.execute = function(command){
    //something else
    return command[request](command.name,command.id);
}
//添加了execute方法，这样就不是直接调用方法，之间多了一层，我们可以用于各种需求操作，如记录命令等；
// 这样使用
bugManager.execute({request:"getinfo",name:"computer",id:"1231"});
bugManager.execute({request:"buy",name:"computer",id:"1231"});
bugManager.execute({request:"book",name:"computer",id:"1231"});
/*
优点：
1.降低对象之间的耦合度。
2.新的命令可以很容易地加入到系统中。
3.可以比较容易地设计一个组合命令。
4.调用同一方法实现不同的功能
*/