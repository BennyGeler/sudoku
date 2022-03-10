const { snaleMove: snaleMoveFromInside } = require('./snaleMoveFromInside')
const arr1 = snaleMoveFromInside(), arr2 = [], length = arr1.length

for (let i = 0; i < length; i++) {
    arr2.push(arr1.pop())
}


module.exports = { snaleMoveToInside: arr2 }