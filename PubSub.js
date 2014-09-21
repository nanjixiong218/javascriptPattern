/**
 * 观察者模式，也叫发布订阅模式
 * Created by xu on 14-5-29.
 */

function PubSub(){
    this.topics={};
    this.subUid=-1;
}
PubSub.prototype.publish=function(topic,arges){

    if(!this.topics[topic]){
        return false;
    }

    var that = this;//setTimeout中用到了this,所以先保存，否则setTimeout内部的this执行全局
    setTimeout(function(){//用setTimeout把所有回调放在下一个tick执行，而不是立即执行
        for(var i=0;i<that.topics[topic].length;i++){
            that.topics[topic][i].func(topic,arges);
        }
    },0);

    return true;
};
PubSub.prototype.subscribe =function(topic,func){
    if(!this.topics[topic]){
        this.topics[topic]=[];
    }
    var token = (++this.subUid).toString();

    this.topics[topic].push({
        token:token,
        func:func
    });
    return token;
};
PubSub.prototype.unsub =function(token){
    for(var topic in this.topics){
        for(var i= 0,len=this.topics[topic].length;i<len;i++){
            if(this.topics[topic][i].token==token){
                this.topics[topic].splice(i,1);
                return token;
            }
        }
    }
};
//使用
var pub = new PubSub();
pub.subscribe("one",function(topic,data){
    console.log("this is "+topic+"say:"+data);
});
var one2 = pub.subscribe("one",function(topic,data){
    console.log("this is anther"+topic+"say:"+data);
});
var token = pub.subscribe("two",function(topic,data){
    console.log("this is "+topic+"say:"+data);
});
pub.publish("one","hello one");
pub.publish("two",["hello two",'aaad']);
pub.publish("two",[{"color":'red'},{"name":"xu"}]);
setTimeout(function(){
//在setTimeout中取消也可以，因为publish的回调也是在setTimeout中，
//在下一个tick中本setTimeout因为先注册的，所以先执行。所以pub.unsub可以写在setTimeout中。
    pub.unsub(token);
},0);
pub.unsub(one2);
pub.publish("one","failed");
pub.publish("two","failed");

//版本2  用原型实现，更巧妙,不同点是，每一个Observer对象就是一个被观察者，在其上绑定回调
//相当于一个具有观察者功能的对象，而版本一的对象是可以进行多个事件绑定的。

function Observer(){
    this.fns = [];
}
Observer.prototype={
    subscripe:function(func){
        this.fns.push(func);
    },
    unsub:function(func){
        this.fns = this.fns.filter(function(el){
            if(el!==func){
                return el;//返回true才会给保留住
            }
        });
    },
    publish:function(data,thisObject){
        var scope = thisObject||(function(){return this})();//获得global的方法
        this.fns.forEach(function(el){
            el.call(scope,data);
        });
    }
};

var o = new Observer();//这里和第一个例子不一样，观察者和被观察者只有有一个衔接，即观察的是什么，
// 第一个例子中需要指定，example1就是要观察的。这里o本身就是一个要观察
var f1 = function(data){
    console.log("f1:"+data+"：f1");
};
var f2 = function(data){
    console.log("f2:"+data+":f2");
};
o.subscripe(f1);
o.subscripe(f2);

o.publish("hello");
o.unsub(f1);
o.publish("hello2");

//版本3  实际上和版本2一样，感觉只是使用了装饰者模式，可以使其它对象装饰上订阅发布功能。
// 而且都和版本一不同，版本2,3都相当于一个事件，在他上边可以注册多个方法，而版本一是可以注册多个事件，
// 然后每个事件可以多个方法，有点乱……

var  Observer = {
    addSubscribe :function(func){
        this.subscribers.push(func);
    },
    removeSub:function(func){
        for(var i=0;i<this.subscribers.length;i++){
            if(this.subscribers[i]===func){
                this.subscribers.splice(i,1);
                //delete (this.subscribers[i]);这样居然也可以
            }
        }
    },
    publish:function(data){
        for(var i=0;i<this.subscribers.length;i++){
            if(typeof this.subscribers[i]==='function'){
                this.subscribers[i](data);
            }
        }
    },
    make:function(o){
        for(var i in this){
            o[i]=this[i];
            o.subsribers;
        }
    }
};


var blog = {
    recommend:function(id){
        var msg = "blog "+id+"是";
        this.publish(msg);
    }
};

var user = {
    vote:function(id){
        var msg = "投票人"+"id"+ "是";
    }
};

//jquery版
(function($){
    var o = $({});
    $.subscribe = function(){
        o.on.apply(o,arguments);
    };
    $.unsub = function(){
        o.off.apply(o,arguments);
    };
    $.publish = function(){
        o.trigger.apply(o,arguments);
    }
}(jquery));