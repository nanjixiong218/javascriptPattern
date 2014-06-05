/**
 * Created by Administrator on 14-6-5.
 */
//不使用events模块的实现，同时加入了序列化的实现

function Promise(){
    this.handlersQueue=[];
    this.isPromise =true;
}
Promise.prototype.then = function(success,error,progress){

    if(typeof success ==="function"){
        this.handlersQueue.push({key:"success",func:success});
    }
    if(typeof error==="function"){
        this.handlersQueue.push({key:"error",func:error});
    }
    if(typeof progress ==="function"){
        this.handlersQueue.push({key:"progress",func:progress});
    }
    return this;
}


function Deferred (){
    this.promise = new Promise();
}
Deferred.prototype.resolve = function(data){
    var handlersQueue = this.promise.handlersQueue;
    var handler;
    while(handler = handlersQueue.shift()){
        if(handler.key == "success"){
            var ret = handler.func(data);
            if(ret&&ret.isPromise){
                ret.handlersQueue = this.handlersQueue;
                this.promise = ret;
                return;
            }
        }
    }
}
Deferred.prototype.reject = function(err){
    var handlersQueue = this.promise.handlersQueue;
    var handler;
    while(handler = handlersQueue.shift()){
        if(handler.key == "error"){
            var ret = handler.func(data);
            if(ret&&ret.isPromise){
                ret.handlersQueue = this.handlersQueue;
                this.promise = ret;
                return;
            }
        }
    }
}
Deferred.prototype.promisify=function(){
    var that =this;
    return function(err,data){
        if(err){
            that.reject(err);
        }else{
            that.resolve(data);
        }
    }
}

//使用
var readFile1 = function(file,encoding){
    var deferred = new Deferred();
    fs.readFile(file,encoding,deferred.promisify());
    return deferred.promise;
};
var readFile2 = function(file,encoding){
    var deferred = new Deferred();
    fs.readFile(file,encoding,deferred.promisify());
    return deferred.promise;
}
readFile1("one.text","utf-8").then(function(){
    console.log("oneUsed is ok  begin2:");
    return readFile2("oneUsed","utf-8");
}).then(function(file2){
        console.log(file2);
    });

//一个批量序列化方法
var smooth= function