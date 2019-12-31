let getMin = (...args) => {
    let result = args[0];
    for(let i = 0; i <= args.length; i++) {
        if(result > args[i]) {
            result = args[i];
        }
    }
    return result;
}
console.log(getMin(9, 2, 4));