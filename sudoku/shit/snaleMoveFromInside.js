let arr = []
let row = 4, col = 5, isFirst = true, numToGo = 2, stop = false, numu = 1, numd = 2, numr = 3, numl = 2
function sorty(e) {
    e.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
}
const arr1 = ['a', 'C', 'b']
sorty(arr1)

function snaleMove() {
    arr.push({ row: 4, col: 4 })
    arr.push({ row, col })
    while (!stop) {
        moveUp()
        moveLeft()
        goDown()
        stop = turnRight() === 'stop'
    }
    return arr
}

function turnRight() {
    for (let i = 0; i < numr; i++) {
        col++
        arr.push({ row, col })
        if (row === 8 && col === 8)
            return 'stop'
    }
    numr += 2
}

function goDown() {
    for (let i = 0; i < numd; i++) {
        row++
        arr.push({ row, col })
    }
    numd += 2
}

function moveLeft() {
    for (let i = 0; i < numl; i++) {
        col--
        arr.push({ row, col })
    }
    numl += 2
}

function moveUp() {
    for (let i = 0; i < numu; i++) {
        row--
        arr.push({ row, col })
    }
    numu += 2
}
module.exports = { snaleMove }