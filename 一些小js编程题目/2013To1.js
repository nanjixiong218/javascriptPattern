var count = 0;
function TO1 (a,b){
  while(a > b){
       if(a % 2 == 0){
         a /= 2;
       }else{
         a--;
       }
       count++;
  }
  if(a == b){
    console.log(count);
  }
  if(a < b){
    console.log(count + 2*a - b);
  }
}
TO1(2013,1)

