class Cell {
    constructor(
        row,
        col,
        isMine = false,
        mineNeighborCount = undefined,
        isRevealed = false,
        isFlaggingOn = false
    ) {
        this.col = col;
        this.row = row;
        this.isMine = isMine;
        this.mineNeighborCount = mineNeighborCount;
        this.isRevealed = isRevealed;
        this.isFlaggingOn = isFlaggingOn
    }
}

export default Cell;