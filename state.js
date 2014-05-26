/**
 * 状态模式
 * 以下载为例讲解状态模式
 * Created by Administrator on 14-5-25.
 */

function State(){

};
State.prototype.download = function(){
    throw new Error("此方法必须重载！");
};
State.prototype.pause = function(){
    throw new Error("此方法必须重载！");
};
State.prototype.fail = function(){
    throw new Error("此方法必须重载！");
};

State.prototype.finish = function(){
    throw new Error("此方法必须重载！");
};

function StateFactory (proto){//ecmascript5中好像可以用Object.createObject()实现这个方法的需求
    var result =  function(){
        State.apply(this);
        this.oDownload = new Download();
    };
    result.prototype = proto;
    return result;
};
//ready状态类的生成
var readyProto = new State();
readyProto.download = function(){
    this.oDownload.setState(this.oDownload.getDownloadingState());
    console.log("开始下载!");
};
readyProto.pause = function(){
    console.log("还没开始，何谈暂停！");
};
readyProto.fail =function(){
    console.log("还没开始，更不会失败！");
};
readyProto.finish = function(){
    console.log("还没开始，怎可能完成！");
};
var ReadyState = StateFactory(readyProto);
//正在下载状态
var DownloadingProto = new State();
DownloadingProto.download = function(){
    console.log("已经开始下载了，不需要再次开始！");
};
DownloadingProto.pause = function(){
    this.oDownload.setState(this.oDownload.getPausedState());
    console.log("暂停下载！");
};
DownloadingProto.fail =function(){
    this.oDownload.setState(this.oDownload.getFailedState());
    console.log("下载失败！");
};
DownloadingProto.finish = function(){
    this.oDownload.setState(this.oDownload.getFinishedState());
    console.log("下载成功!");
};
var DownloadingState = StateFactory(DownloadingProto);
//暂停状态
var PausedProto = new State();
PausedProto.download = function(){
    this.oDownload.setState(this.oDownload.getDownloadingState());
    console.log("开始下载！");
};
PausedProto.pause = function(){
    console.log("已经暂停了，不需要再展厅！");
};
PausedProto.fail =function(){
    this.oDownload.setState(this.oDownload.getFailedState());
    console.log("下载失败！");
};
PausedProto.finish = function(){
    this.oDownload.setState(this.oDownload.getFinishedState());
    console.log("下载成功!");
};
var PausedState = StateFactory(PausedProto);

//失败状态
var FailedProto = new State();
FailedProto.download = function(){
    this.oDownload.setState(this.oDownload.getDownloadingState());
    console.log("尝试重新下载！");
};
FailedProto.pause = function(){
    console.log("都失败了，还如何暂停！");
};
FailedProto.fail =function(){
    console.log("都失败了，还怎么失败！");
};
FailedProto.finish = function(){
    console.log("都失败了，还怎么完成！");
};
var FailedState = StateFactory(FailedProto);

//完成状态
var FinishedProto = new State();
FinishedProto.download = function(){
    this.oDownload.setState(this.oDownload.getDownloadingState());
    console.log("尝试重新下载！");
};
FinishedProto.pause = function(){
    console.log("完成了已经，无法暂停！");
};
FinishedProto.fail =function(){
    console.log("完成了已经，怎么会失败呢！");
};
FinishedProto.finish = function(){
    console.log("已经完成了，不能在完成了！");
};
var FinishedState = StateFactory(FinishedProto);




function Download(){
    this.oState = new ReadyState();
};
Download.prototype.setState = function(oState){
    this.oState = oState;
};
//5个获取状态的方法
Download().prototype.getReadyState = function (){
    return new ReadyState(this);
};
Download.prototype.getDownloadingState = function(){
    return new DownloadingState(this);
};
Download.prototype.getPausedState = function(){
    return new PausedState(this);
};
Download.prototype.getFailedState = function (){
    return new FailState(this);
};
Download.prototype.getFinishedState = function (){
    return new FinishState(this);
};
//4个行为方法
Download.prototype.download = function(){
    this.oState.download();
};
Download.prototype.pause = function(){
    this.oState.pause();
};
Download.prototype.fail = function(){
    this.oState.fail();
};
Download.prototype.finish = function(){
    this.oState.finish();
};

//如果不用这种模式，我实现download类一般是通过一个state状态位，每一个功能内部对状态为进行判断和设置。
//这样的话，就需要写很多if else 的判断，每个函数内部将会更复杂，同时扩展维护起来会很困难。
// 想想如果又多出一个状态，每个函数都要添加判断逻辑，都要修改。
// 而是使用这种模式，只需要添加一个新的状态对象，在download添加两个对应的方法即可。
//这好像印证了一句话，判断编码水平的高低可以看写的if else的多少，同样的场景需求，水平越高，
// if else越少
