const reader = require("readline-sync")
const { sudoku, readyToPlaySudoku } = require('./sudokuReadyToPlay')
const { makeCopyOfSomething, getIndexesOfBlock, blockMat } = require('./planSudoku')
let copyOfSudoku = makeCopyOfSomething(readyToPlaySudoku)
let lastMove = [],
    isWin = false, isFirstTime = true, isSpecialUser = false, end = false
let input
const isANumber = v => isNaN(v) === false && v != ' ';

function print(what) {
    what = what === 'curr' ? copyOfSudoku : sudoku
    for (let i = 0; i < what.length; i++) {
        let str = ''
        for (let j = 0; j < what.length; j++) {
            str += what[i][j] + '|'
        }
        console.log(str)
    }
}

function play() {
    print('curr')
    input = getInputFromUser()
    while (!end && !isWin) {
        if (input === 'y') {
            isSpecialUser = true
            print('curr')
            input = getInputFromUser()
        }
        else if (input === 'done') {
            console.log('Bye bye!')
            end = true
        }
        else if (input === 'rev') {
            if (lastMove.length > 0) {
                const lastInArr = lastMove.pop()
                copyOfSudoku[lastInArr[0]][lastInArr[1]] = ' '
                print('curr')
                input = getInputFromUser()
            }
            else {
                treatInvalid()
            }

        }
        else if (input === 'solution') {
            end = true
            print('solution')
            console.log('Bye bye!')
        }
        else if (input.length === 3 && isANumber(input)) {
            if (isCellFilledAlready(copyOfSudoku[input[0]][input[1]])) {
                treatInvalid()
            }
            else {
                lastMove.push(input)
                insertToTable(input)
                checkWinning()
                if (!isWin && !isEverythingFilled()) {
                    print('curr')
                    input = getInputFromUser()
                }
                else if (!isWin && isEverythingFilled){
                    console.log('Actually the game is over... but you can still play around or investigate what was wrong')
                }
            }
        }
        else {
            treatInvalid()
        }
    }
}

function treatSpecialUser(input) {
    const inputParsed = `${parseInt(input[0]) - 1}${parseInt(input[1]) - 1}${input[2]}`
    return inputParsed
}

function isCellFilledAlready(cell) {
    return cell !== ' '
}

function treatInvalid() {
    console.log('Invalid input, try again')
    print('curr')
    input = getInputFromUser()
}

function isEverythingFilled() {
    for (let i = 0; i < copyOfSudoku.length; i++) {
        for (let j = 0; j < copyOfSudoku.length; j++) {
            if (!isANumber(copyOfSudoku[i][j])) {
                return false
            }
        }
    }
    return true
}

function checkWinning() {
    const isAllFilled = isEverythingFilled()
    let isItPossibleToPopulate = true
    if (isAllFilled) {
        for (let rowIndex = 0; rowIndex < copyOfSudoku.length; rowIndex++) {
            for (let colIndex = 0; colIndex < copyOfSudoku.length; colIndex++) {
                if (!canPopulateNum(rowIndex, colIndex, copyOfSudoku[rowIndex][colIndex])) {
                    isItPossibleToPopulate = false
                }
            }
        }
    }
    const doWeHaveAWinner = isAllFilled && isItPossibleToPopulate
    if (doWeHaveAWinner) {
        isWin = true
        console.log('You Won!\n', 'Your solution:')
        print('curr')
        console.log('Our solution:')
        print('solution')
        if (JSON.stringify(copyOfSudoku) === JSON.stringify(sudoku))
            console.log('Cool! your solution is exactly matching our\'s')
        else
            console.log('Cool! your solution is different than our\'s')
    }
    return doWeHaveAWinner
}

function isNumInRowFunc(rowIndex, colIndex, num) {
    for (let i = 0; i < copyOfSudoku.length; i++) {
        if (i !== colIndex && copyOfSudoku[rowIndex][i] === num)
            return true
    }
    return false
}

function isNumInColFunc(rowIndex, colIndex, num) {
    for (let i = 0; i < copyOfSudoku.length; i++) {
        if (i !== rowIndex && copyOfSudoku[i][colIndex] === num)
            return true
    }
    return false
}

function isNumInBlockFunc(block, rowIndex, colIndex, num) {
    const indexes = getIndexesOfBlock(block)
    for (let i = 0; i < indexes.length; i++) {
        const cellBeingChecked = copyOfSudoku[indexes[i].rowIndex][indexes[i].colIndex]
        if (!(indexes[i].rowIndex === rowIndex && indexes[i].colIndex === colIndex) && cellBeingChecked === num)
            return true
    }
    return false
}

function canPopulateNum(rowIndex, colIndex, numToInsert) {
    const isNumInRow = isNumInRowFunc(rowIndex, colIndex, numToInsert)
    const isNumInCol = isNumInColFunc(rowIndex, colIndex, numToInsert)
    const isNumInBlock = isNumInBlockFunc(blockMat[rowIndex][colIndex], rowIndex, colIndex, numToInsert)
    if (isNumInRow || isNumInCol || isNumInBlock)
        return false
    return true
}

function insertToTable(input) {
    copyOfSudoku[input[0]][input[1]] = parseInt(input[2])
}

function getInputFromUser() {
    if (isFirstTime) {
        console.log(`Are you a special user (not programmer)? Click 'y' if you do`)
        isFirstTime = false
    }
    console.log(`Type 'done' to finish, Or 'solution' to see the solution, 'rev' to undo last move`)
    const answer = reader.question("y, x, v, ---> ", { hideEchoBack: false })
    if (isSpecialUser && answer.length === 3 && isANumber(answer))
        return treatSpecialUser(answer)
    return answer
}
play()