/**
 * 编程之美第一题的启示
 * 某类双层循环可以用单层循环替代
 * Created by xu on 14-6-1.
 */

//题目:已知一个数组和一个数n，查询数组中和为n的两个数

caculate(10);
function caculate(n){
    var a = [1,2,3,4,5,6,7,8,9];
    var len = a.length;
    var flag = len*len;
    var result =[];
    while(--flag){
        var first = flag/len|0;
        var second = flag%len;
       // console.log(a[first]);
        //console.log(a[second]);
        if(first!=second&&a[first]+a[second]==n){
            result.push({first:first,second:second});
        }
    }
    console.log(result.length);
   // console.log(result[0].first+'+'+result[0].second);
}

