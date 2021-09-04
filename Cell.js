class Cell {
    constructor(
        row,
        column,
        isMine = false,
        numMinesAround = undefined,
        isRevealed = false,
        isFlaggingOn = false
    ) {
        this.column = column;
        this.row = row;
        this.isMine = isMine;
        this.numMinesAround = numMinesAround;
        this.isRevealed = isRevealed;
        this.isFlaggingOn = isFlaggingOn
    }
}

export default Cell;