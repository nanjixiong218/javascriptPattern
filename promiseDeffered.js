
//利用nodejs的原生事件系统
var events = require("events");
function Promise(){
	events.EventEmitter.call(this);
}
util.inherits(Promise,events.EventEmitter);

Promise.prototype.then =function(success,error,progress){
	if(typeof success === "function"){
		this.once("success",success);
	}
	if(typeof error === "function"){
		this.once("error",error);
	}
	if(typeof progress === "function"){
		this.once("progress",progress);
	}
	return this;
};
var Defferred  = function(){
	this.state = 'unsuccess';
	this.promise = new Promise();
};
Defferred.prototype.resolve = function(obj){
	this.state = "success";	
	this.promise.emit("success",obj);
};
Defferred.prototype.reject = function(error){
	this.state= "error";
	this.promise.emit("error",error);
};
Defferred.prototype.progress = function(data){
	this.promise.emit("progress",data);
};
//把response对象promise化
var promisify = function(res){
	var defferred = new Defferred();
	var result = '';
	res.on("data",function(chunk){
		result+=chunk;
		defferred.process(data);
	});
	res.on("error",function(err){
		defferred.reject(err);
	});
	res.on("end",function(){
		defferred.resolve(result);

	});

	return defferred.promise;
};
promisify(res).then(function(){
//do something after success

},function(err){
//do something if err
},function(chunk){
//do something in progressing
});

Defferred.prototype.promisify = function(){
	var defferred =this;
	return function(err,value){
		if(err){
			defferred.reject(err);
		}else if(arguments.length>2){
			defferred.resolve(Array.prototype.slice(arguments,1));
		}else{
			defferred.resolve(value);
		}
	}
};
var readFile = function(file,encoding){
	var defferred = new Defferred();
	fs.readFile(file,encoding,defferred.promisify());
	return defferred.promise;
};
readFile("xu.text","utf-8").then(function(result){
	console.log(result);
},function(err){
	console.log(err);
});
Defferred.prototype.all = function(promises){
	var length = promises.length;
	var that = this;
	var results = [];
	promises.forEach(function(promise){
		length--;
		promise.then(function(result){
			results.push(result);	
			if(length==0){
				that.resolve(results);
			}
		},function(err){
			that.reject(err);
		});
	});
	return this.promise;
};
var promise1 = readFile("one.text","utf-8");
var promise2 = readFile("second.text","utf-8");
var defferred = new Defferred();
defferred.all([promise1,promise2],function(results){
	//do something success
},function(err){
	//do something if err
});