/**
 *
 * Created by Administrator on 14-5-21.
 * 求0-7能组成的奇数个数，数组不可以重复使用
 */
//遍历的方式
function caculate(){
    var i,sum=0,tempSum=0;
    for(i=2;i<8;i++){
        tempSum = Anm(i,i)-Anm(i-1,i-1)*2-(Anm(i-1,i-1)-Anm(i-2,i-2))*3;
        //i代表位数，tempSum为对应位数可以组成多少数字，
        // 用总的组合数减去以0打头和以0结尾的,在减去2,4,6结尾的组合数
        sum += tempSum;
    }
    sum+=4;
    return sum;
}

//判断是否为奇数
function isOdd(num){
    return num%2!==0;
}
//求Anm，Cnm
function Anm (n,m){
    try{//内部trycatch
        if(n<0||m<0||n<m){
            // throw new Error("数字不符合规则！");
            throw {
                name:"invalidNum",
                message:"数字不符合规则！"
            }
        }
    }catch(e){
        console.log(e.name+":"+e.message);
        return;
    }


    return function c(n){
        if(m==0||--m==0){
            return n;
        }
        return n*c(n-1);
    }(n);
}

function Cnm(n,m){
    return Anm(n,m)/Anm(m,m);
}
//test
try{//在内部trycatch 了，就不需要在外部try了
    var a = Anm(1,2);
}catch(e){
    console.log(e.name+":"+e.message);
}
var a = Anm(1,2);
var b = Cnm(5,2);
var c = caculate();
console.log(c);


