import Cell from "./Cell.js";
import { getRandomInt } from "./gridUtils.js";
class Grid {
    constructor(gridSize, numMines) {
        this.gridSize = gridSize;
        this.numMines = numMines;
        this.cells = [];
    }

    createGridCells() {
        this.cells = new Array();
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                let cell = new Cell(row, col);
                this.cells.push(cell);
            }        
        }
    }

    getCellByRowCol (row, col){
        let cell;
        this.cells.forEach(c =>{
            if (c.row == row && c.col == col){
                cell = c;
                //TODO: BREAK
            }
        })
        return cell;
    }
    
    assignMines(){ 
        let numMinesCreated = 0;
        while (numMinesCreated < this.numMines) {
            let numGridCells = this.gridSize**2;
            let randCell = getRandomInt(numGridCells - 1);
            let cell = this.cells[randCell];
            if (!cell.isMine) {
                cell.isMine = true;
                numMinesCreated++;
            }
        }
    };

    applyFnToNeighbors(cell, fn){
        let row = cell.row;
        let col = cell.col;

        let topLeft = {row: row-1, col: col-1};
        let topCenter = {row: row-1, col: col};
        let topRight = {row: row-1, col: col+1};
        
        let centerLeft = {row: row, col: col-1};
        let centerRight = {row: row, col: col+1};
    
        let bottomLeft = {row: row+1, col: col-1};
        let bottomCenter = {row: row+1, col: col};
        let bottomRight = {row: row+1, col: col+1};
    
        let neighborCoordinates = [topLeft, topCenter, topRight, 
                                centerLeft, centerRight, 
                                bottomLeft, bottomCenter, bottomRight];
       
        

        const neighborCells = neighborCoordinates
            .filter(c => this.isCellInBounds(c))
            .map(c => this.getCellByRowCol(c.row, c.col));
        neighborCells.forEach(neighborCell => fn(neighborCell));
    };

    isCoordinateInBounds(coordinate){
        return coordinate >= 0 && coordinate < this.gridSize;
    }

    isCellInBounds(cell){
        return this.isCoordinateInBounds(cell.row) && this.isCoordinateInBounds(cell.col);
    }

    isMineAndInBounds(surroundingCell) {
        if (!this.isCellInBounds(surroundingCell)) {
            return false;  
        }
        return surroundingCell.isMine;
    }

    updateThisNumMines(cell, neighborCell){
        if(this.isMineAndInBounds(neighborCell))
            cell.numMinesAround++;
    }

    updateEachCellNumMineAround(){
        this.cells
            .filter(cell => !cell.isMine)
            .forEach(cell => {
                cell.numMinesAround = 0;
                this.applyFnToNeighbors(cell, neighborCell => this.updateThisNumMines(cell, neighborCell));
        })
    }

    revealNeighbors(cell, revealedCells, zeros){
                
        if(!this.isCellInBounds(cell)) {
           return;
        }

        if(cell.isRevealed){
            return;
        }

        if (cell.numMinesAround == 0){ 
            zeros.push(cell);
        }
        cell.isRevealed = true;
        revealedCells.push(cell);

    };

    revealZeros  = function(cell) {
        let zeros = [cell];
        let revealedCells = [cell];
        cell.isRevealed = true;
        
        while (zeros.length > 0) {
            let zeroCell = zeros[0];
            this.applyFnToNeighbors(zeroCell, zeroCell =>
                this.revealNeighbors(zeroCell, revealedCells, zeros)
            );
            zeros.shift();
        };
        
        return revealedCells;
    };
    
    resetGrid() {
        this.cells = [];
    }
};

export default Grid;