let A = Number(prompt('Enter A'));
let B = Number(prompt('Enter B'));
let C = Number(prompt('Enter C'));

    if (A <= 0 || B <= 0 || C <= 0 || parseInt(A) !== A || parseInt(B) !== B || parseInt(C) !== C) 
{
    alert('Triangle doesn’t exist');
    alert('A triangle must have 3 sides with a positive definite length ');
}  

    else if (A === B && B === C) 
{
    console.log('Equilateral triangle: A = ' + A + '; B = ' + B + '; C = ' + C );
} 

    else if (A === B || B === C || A === C) 
{
    console.log('Isosceles triangle: A = ' + A + '; B = ' + B + '; C = ' + C );
} 

    else if (A !== B && A !== C && B !== C) 
{
    console.log('Scalene triangle: A = ' + A + '; B = ' + B + '; C = ' + C );
}

    else if (A+B<C || A+C<B || B+C<A) 
{
    console.log('Triangle doesn’t exist');
}