const fs = require("fs");
let array, hasReachedSudoku = false, startAgainCounter = 0, randomNumCounter = 0
const size = 9
const indexesArr = createAllIndexesCubes(size)
const blockMat = createBlockMat(size)
const dollarsMatrix = createDollarsMatrix(size)

function createDollarsMatrix(length = 9) {
    const arr = new Array(length)
    for (let i = 0; i < length; i++) {
        arr[i] = new Array(length)
        for (let j = 0; j < length; j++) {
            arr[i][j] = '$'
        }
    }
    return arr
}

function createBlockMat(length = 9) {
    let matt = [], count = 0, countInitially = count
    const sqr = Math.sqrt(length)
    for (let i = 0; i < length; i++) {
        matt.push([])
        for (let j = 0; j < length; j++) {
            if (j % sqr === 0)
                count++
            matt[i].push(count)
        }
        if ((i + 1) % sqr === 0) {
            countInitially += sqr
            count = countInitially
        }
        else
            count = countInitially
    }
    return matt
}

function createAllIndexesCubes(length = 9) {
    const thisArr = []
    const sqr = Math.sqrt(length)
    for (let y = 0; y < length; y += sqr) {
        for (let x = 0; x < length; x += sqr) {
            thisArr.push(createOneIndexesCube(length, x, y))
        }
    }
    return thisArr
}

function createOneIndexesCube(length = 9, colIndex = 0, rowIndex = 0) {
    const colAtBegining = colIndex
    const arr = [], sqr = Math.sqrt(length)
    for (let y = 0; y < sqr; y++) {
        for (let x = 0; x < sqr; x++) {
            arr.push({ rowIndex, colIndex })
            colIndex++
        }
        colIndex = colAtBegining
        rowIndex++
    }
    return arr
}

function randomNum() {
    randomNumCounter++
    return Math.floor(1 + Math.random() * array.length)
}

function getIndexesOfBlock(block) {
    block -= 1
    return indexesArr[block]
}

function isNumInRowFunc({ rowIndex, numToInsert }) {
    for (let i = 0; i < array.length; i++) {
        // A row usally has an consistent y but here because of the arrays structure it's a consistent x.
        if (array[rowIndex][i] === numToInsert)
            return true
    }
    return false
}

function isNumInColFunc({ colIndex, numToInsert }) {
    for (let i = 0; i < array.length; i++) {
        // A column usally has an consistent x but here because of the arrays structure it's a consistent y.
        if (array[i][colIndex] === numToInsert)
            return true
    }
    return false
}

function isNumInBlockFunc(block, numToInsert) {
    const indexes = getIndexesOfBlock(block)
    for (let i = 0; i < indexes.length; i++) {
        const cellBeingChecked = array[indexes[i].rowIndex][indexes[i].colIndex]
        if (cellBeingChecked === numToInsert)
            return true
    }
    return false
}

function canPopulateNum({ rowIndex, colIndex, numToInsert }) {
    const isNumInRow = isNumInRowFunc({ rowIndex, numToInsert })
    const isNumInCol = isNumInColFunc({ colIndex, numToInsert })
    const isNumInBlock = isNumInBlockFunc(blockMat[rowIndex][colIndex], numToInsert)
    if (isNumInRow || isNumInCol || isNumInBlock)
        return false
    return true
}

function fillNum({ rowIndex, colIndex }) {
    let failureCount = 0;
    let numToInsert = randomNum()
    while (!hasReachedSudoku && !canPopulateNum({ rowIndex, colIndex, numToInsert })) {
        failureCount++;
        numToInsert = randomNum()
        if (failureCount > 160 && !hasReachedSudoku) {
            return '!'
        }
    }
    if (!hasReachedSudoku)
        return numToInsert
    else
        return '@'
}

function run() {
    for (let rowIndex = 0; rowIndex < array.length; rowIndex++) {
        for (let colIndex = 0; colIndex < array.length; colIndex++) {
            const num = fillNum({ rowIndex, colIndex })
            if (num === '!')
                return 'fail'
            if (num !== '@')
                array[rowIndex][colIndex] = num
        }
    }
    hasReachedSudoku = true
}

function print(text) {
    fs.writeFile('./sudukoSolution/sudoku.txt', JSON.stringify(text), (err) => {
        if (err) return console.error(err)
    })
}

function makeCopyOfSomething(something) {
    return JSON.parse(JSON.stringify(something))
}

function startAgain() {
    startAgainCounter++
    array = makeCopyOfSomething(dollarsMatrix)
    return run()
}

function returnSudoku() {
    let res = startAgain()
    while (res === 'fail')
        res = startAgain()
    console.log('randomNumCounter:', randomNumCounter)
    console.log('startAgainCounter:', startAgainCounter)
    print(array)
    return array
}

module.exports = { returnSudoku, makeCopyOfSomething, getIndexesOfBlock, blockMat };