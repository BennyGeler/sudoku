const fs = require("fs");
let array = [], resultArray = [];
const func = () => Math.floor(Math.random() * 1000000);
const addZeros = (num) => {
    let stringedNum = '' + num;
    while (stringedNum.length < 6) {
        stringedNum = 0 + stringedNum;
    }
    return stringedNum;
};
const createArray = () => {
    for (let i = 0; i < 1000000; i++) {
        array.push(addZeros(func()));
    }
}
const startDate = new Date();
const runCheck = () => {
    for (let i = 0; i < array.length; i++) {
        console.log(i);
        const element = array[i];
        const result = array.filter(e => e === element);
        if (result.length > 7) {
            resultArray.push(result);
        }
    }
};
const endDate = new Date();
console.log("startDate is:", startDate.toISOString());
console.log("endDate is:", endDate.toISOString());
console.log("In seconds:", (endDate - startDate) / 1000);
const printItToFile = (shit) => {
    fs.writeFile('slow.txt', JSON.stringify(shit), (err) => {
        if (err) return console.error(err);
    });
}
createArray();
runCheck();
printItToFile(resultArray);