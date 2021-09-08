class Cell {
    constructor(
        row,
        col,
        isMine = false,
        numMinesAround = undefined,
        isRevealed = false,
        isFlaggingOn = false
    ) {
        this.col = col;
        this.row = row;
        this.isMine = isMine;
        this.numMinesAround = numMinesAround;
        this.isRevealed = isRevealed;
        this.isFlaggingOn = isFlaggingOn
    }
}

export default Cell;