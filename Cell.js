class Cell {
    constructor(
        row,
        column,
        isMine,
        numMinesAround,
        isRevealed,
        flaggingOn
    ) {
        this.column = column;
        this.row = row;
        this.isMine = isMine;
        this.numMinesAround = numMinesAround;
        this.isRevealed = isRevealed;
        this.flaggingOn = flaggingOn
    }
}

export default Cell;