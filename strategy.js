/**
 * Created by xu on 14-5-20.
 */


//策略模式，通过一个合法性验证例子来理解

validator = {
    validate:function(value,type){
        switch(type){
            case "isNumber":(function(value){
                //对value进行验证，返回结果
                return true;
            }(value));break;
            case "isEmpty":(function(value){
                //对value进行验证，返回结果
                return true;
            }(value));break;
        }
    }

}
//去掉IIFE（立即执行函数）
validator = {
    validate:function(value,type){
        switch(type){
            case "isNumber":this.isNumber();break;
            case "isEmpty":this.isEmpty();break;
        }
    },
    isNumber:function(){

    },
    isEmpty:function(){

    }
}
//使用
validator.validate("123","isNumber");

//这种方式，如果要扩展，增加验证需求，就要改变validate源码逻辑进行扩展

//用策略模式

validator = {
    types:{},
    messages:[],
    config:{},

    validate:function(data){
        var i,msg,checker,type,result;

        for(i in data){
            if(data.hasOwnProperty(i)){
                type = this.config[i];
                checker = this.types[type];
                if(!type){//说明没有配置验证规则，即使用者不需要对这个类型进行验证，直接不处理即可
                    continue;
                }
                if(!checker){//使用者配置了验证规则，但是本验证控件没有这个规则，可能是使用者规则写错了，所以要抛出异常
                    throw{
                        name:"validateError",
                        message:"no such validate type :"+type
                    }
                }
                result = checker.validate(data[i]);
                if(!result){
                    msg = "invalid value for *"+i+"*,"+checker.errorMessage;
                    this.message.push(msg);
                }
            }
        }
    },
    hasError:function(){
        return this.messages.length!==0;
    }
}

//这样就可以自己装配验证规则：

validator.type.isNumber={
     validate:function(value){
        return !isNaN(value);
     },
    errorMessage:"传入的值不是数字！"
};
validator.type.isEmpty={
    validate:function(value){
        return value!=="";
    },
    errorMessage:"传入的值不能为空"
}
//使用
//1、先配置要验证的数据
var data = {
    "name":"xuhuiyuan",
    "age":123
};
//2、在配置对应字段需要的验证规则
validator.config={
    "name":"isEmpty",
    "age":"isNumber"
}