const { returnSudoku, makeCopyOfSomething } = require('./planSudoku')

function randomNum() {
    return Math.floor(Math.random() * sudoku.length)
}

function makeGameReday(sudoku) {
    const copyOfSudoku = makeCopyOfSomething(sudoku)
    for (let i = 0; i < 40; i++)
        replaceNumWithSpace(copyOfSudoku)
    return copyOfSudoku
}

function replaceNumWithSpace(sudoku) {
    let x = randomNum(), y = randomNum()
    while (sudoku[x][y] === ' ')
        x = randomNum(), y = randomNum()
    sudoku[x][y] = ' '
}

const sudoku = returnSudoku()
const readyToPlaySudoku = makeGameReday(sudoku)
module.exports = { sudoku, readyToPlaySudoku };