function sorty (e) {
    e.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
}
const arr = ['a', 'C', 'b']
sorty(arr)
