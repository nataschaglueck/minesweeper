class Cell {
    constructor(
        row,
        col,
        isMine = false,
        neighboringMineCount = undefined,
        isRevealed = false,
        isFlaggingOn = false
    ) {
        this.col = col;
        this.row = row;
        this.isMine = isMine;
        this.neighboringMineCount = neighboringMineCount;
        this.isRevealed = isRevealed;
        this.isFlaggingOn = isFlaggingOn
    }
}

export default Cell;