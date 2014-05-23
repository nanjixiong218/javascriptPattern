/**
 * 责任链模式
 * Created by xu on 14-5-23.
 */
var NO_TOPIC = -1;
var Topic;
function Handler(s,t){
    this.successor = s||null;
    this.topic = t||0;
}
Handler.prototype = {
    handler:function(){
        if(this.successor){
            this.successor.handler();
        }
    },
    has:function(){
        return this.topic!=NO_TOPIC;
    }
}

var app  = new Handler({
    handler:function(){
        console.log("app!");
    }
},1);
var one = new Handler(app,2);
var second = new Handler(one,2);
var third = new Handler(second,1);

//分别写各自的处理程序
one.handler = function(){
    console.log("one^");
    Handler.prototype.handler.call(this);
    console.log("one$");
}

second.handler = function(){
    console.log("second^");
    Handler.prototype.handler.call(this);
    console.log("second&");
}

third.handler = function(){
    console.log("third!");
    Handler.prototype.handler.call(this);
    console.log("third$");
}

third.handler();
//调用third把其它的都经历了一次，每一部分可以负责一个责任！

