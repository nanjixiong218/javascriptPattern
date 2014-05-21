/**
 * Created by Administrator on 14-5-21.
 */
//简单的迭代器模拟
function Iterator (array){
    var index = 0 ;
    var data = array||[];
    var length = data.length;
    return {
        next:function(){
            var element;
            if(!this.hasNext()){
                return null;
            }
            element =  data[index];
            index = index+1;
            return element;
        },
        hasNext:function(){
            return index<length;
        },
        rewind:function(){
            index = 0;
        },
        current:function(){
            return data[index];
        }
    }
}
var a = [1,2,4,5];
var aI = Iterator(a);
while(aI.hasNext()){
    console.log(aI.next());
}

//改进，可以把它集成到某个类的原型中，成为一个功能，如何实现多态性。还可以类似jquery把hasNext和next也给封装掉，
// 然后通过回调传入处理程序。