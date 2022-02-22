const fs = require("fs");
let bool, indexes = [], array = [], resultArray = [],
    resultOfSearchForMineNum, howManyElementsHasBeenRemoved;
// let uniq = [...new Set(array)];
// appeared 9 times in 1,000,000 ---> 967475
// appeared 8 times in 1,000,000 ---> 499954 501501 240480 012577 108950 257539 941552
const func = () => Math.floor(Math.random() * 1000000);
const addZeros = (num) => {
    let stringedNum = '' + num;
    while (stringedNum.length < 6) {
        stringedNum = 0 + stringedNum;
    }
    return stringedNum;
};
const searchForMineNum = expectedNum => {
    expectedNum = "" + expectedNum;
    return array.filter((a, b) => { if (a === expectedNum) { console.log("Index is:", b) } return a === expectedNum })

};
const createArray = () => {
    for (let i = 0; i < 1000000; i++) {
        array.push(addZeros(func()));
    }
}
const printItToFile = (shit) => {
    fs.writeFile('fast.txt', JSON.stringify(shit), (err) => {
        if (err) return console.error(err);
    });
}
createArray();
resultOfSearchForMineNum = searchForMineNum(607015);
console.log("resultOfSearchForMineNum:", resultOfSearchForMineNum);
const startDate = new Date();
for (let i = 0; i < array.length; i++) {
    const element = array[i];
    console.log(array.length);
    const result = array.filter((e, b) => {
        bool = e === element;
        if (bool) indexes.push(b);
        return bool;
    });
    howManyElementsHasBeenRemoved = indexes.length;
    reduceArray(indexes);
    indexes = [];
    i = (i - howManyElementsHasBeenRemoved) >= -1 ? (i - howManyElementsHasBeenRemoved) : -1;
    if (result.length > 7) {
        resultArray.push(result);
    }
}
const endDate = new Date();
console.log("startDate is:", startDate.toISOString());
console.log("endDate is:", endDate.toISOString());
console.log("In secondes:", (endDate - startDate) / 1000);
printItToFile(resultArray);

function reduceArray(arrayOfIndexesToRemove) {
    removeAllIndexesFromArray(arrayOfIndexesToRemove);
}
function removeAllIndexesFromArray(arrayOfIndexesToRemove) {
    for (let i = 0; i < arrayOfIndexesToRemove.length; i++) {
        array.splice(arrayOfIndexesToRemove[i], 1);
        arrayOfIndexesToRemove = reduceOne(arrayOfIndexesToRemove);
    }
}
function reduceOne(arr) {
    return arr.map(e => e - 1);
}