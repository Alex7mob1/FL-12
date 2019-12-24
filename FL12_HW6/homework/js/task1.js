let A = prompt('Enter A');
let B = prompt('Enter B');
let C = prompt('Enter C');

let D, x, x1, x2;
const Two = 2;
const Four = 4;

if (isNaN(A) || isNaN(B) || isNaN(C) || A === 0) 
{
    console.log('Invalid input data.');
}
else{
    D = B * B - Four * A * C;
    if(D<0){
        console.log('D no solution')
    }
    else if(D===0){
        x = -B / (Two * A);
        console.log('D=0, x='+  Math.round(x))
    }
    else{
        x1 = (-B + Math.sqrt(D))/ Two * A;
        x2 = (-B - Math.sqrt(D))/ Two * A;
        console.log('D>0, x1='+Math.round(x1),'x2='+Math.round(x2));
    }
}