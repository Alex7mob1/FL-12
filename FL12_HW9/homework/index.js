function convert() {
    let array = [];
    for (let i = 0; i < arguments.length; i++) {
        array.push(arguments[i] === +arguments[i] ? '' + arguments[i] : +arguments[i]);
    }
    return array;
}

function executeforEach(array, myFunction) {
    for (const element of array) {
        myFunction(element);
    }
}

function mapArray(array, callback) {
    let newArray = [];
    executeforEach(array, element => newArray.push(callback(+element)));
    return newArray;
}

function filterArray(array, filter) {
    let newArray = [];
    executeforEach(array, element => filter(element) ? newArray.push(element) : 0);
    return newArray;
}

function flipOver(text) {
    let newText = '';
    for (const letter of text) {
        newText = letter + newText;
    }
    return newText;
}

function makeListFromRange(rangeArray) {
    let myNewArray = [];
    for (let i = rangeArray[0]; i <= rangeArray[1]; i++) {
        myNewArray.push(i);
    }
    return myNewArray;
}

function getArrayOfKeys(objectsArray, keyName) {
    let newArray = [];
    executeforEach(objectsArray, objectElement => newArray.push(objectElement[keyName]))
    return newArray;
}

function substitute(array) {
    const MIN_NUMBER = 30;
    return mapArray(array, element => element < MIN_NUMBER ? '*' : element);
}

function getPastDay(date, dayBefore) {
    const MILLISECONDS_DAY = 86400000;
    return new Date(date.getTime() - dayBefore * MILLISECONDS_DAY).getDate();
}

function formatDate(date) {
    function addZero(number) {
        const DECA = 10;
        return number < DECA ? '0' + number : number;
    }
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ` +
        `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
}