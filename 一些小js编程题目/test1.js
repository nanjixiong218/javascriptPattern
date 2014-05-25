/**
 *
 * Created by Administrator on 14-5-21.
 * 求0-7能组成的奇数个数，数字不可以重复使用
 */
//数学的方法
function caculate(){
    var i,sum=0,tempSum=0;
    for(i=2;i<9;i++){
        //tempSum = Anm(8,i)-Anm(7,i-1)*5+Anm(6,i-2)*3;
        //第一种算法，i代表位数，tempSum为对应位数可以组成多少数字，
        // 用总的组合数减去以0打头和以0,2,4,6结尾的组合数,再加上以0打头，分别以2,4,6结尾的组合数（因为被重复减掉了）

        tempSum = Cnm(4,1)*Cnm(6,1)*Anm(6,i-2);
        //第二种算法，1,3,5,7中选择一个，在字剩余7个数中去掉0，选择一个，剩下的6个数任意排列

        sum += tempSum;
    }
    sum+=4;
    return sum;
}
//遍历的方法,好理解但是效率低下，要进行千万次循环判断
function caculate1(){
    var i = 0,count=0;
    for(i=0;i<=76543210;i++){
        if(isInValid(i)){
            continue;
        }else{
            if(isOdd(i)){
                count++;
            }
        }
    }
    return count;
}
//判断是否合法:有没有很好的算法？
function isInValid(num){
    var sNum = num.toString();
    var len = sNum.length;
    var i = 0,j= 0;
    for(i=0;i<len;i++){
        if(sNum[i]==8||sNum[i]==9){
            return true;    
            
        }
        for(j=i+1;j<len;j++){
            if(sNum[i]==sNum[j]){
                
                return true;
            }
        }
    }
    return false;
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
        if(m==0) return 1;
        if(--m==0){
            return n;
        }
        return n*c(n-1);
    }(n);
}

function Cnm(n,m){
    return Anm(n,m)/Anm(m,m);
}
//test
/*try{//在内部trycatch 了，就不需要在外部try了
    var a = Anm(1,2);
}catch(e){
    console.log(e.name+":"+e.message);
}
var a = Anm(1,2);
var b = Cnm(5,2);
*/
var c = caculate();
var c1 = caculate1();
console.log(c);
console.log(c1);//终于相同了，结果


