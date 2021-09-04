import Cell from "./Cell.js";
import { getRandomInt } from "./gridUtils.js";
class Grid {
    constructor(gridSize, numMines) 
    {
        this.gridSize = gridSize;
        this.numMines = numMines;
        this.cells = [];
    }

    createGridCells() {
        this.cells = new Array(this.gridSize);
    
        for (let i = 0; i < this.gridSize; i++) {
            this.cells[i] = new Array(this.gridSize);
        };
    
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                let cell = new Cell(row, col);
                this.cells[row][col] = cell;
            };
            
        };
    };

    getCell(row, col) {
        return this.cells[row][col];
    }

    changeCellProperty(row, col, prop, value){
        this.cells[row][col][prop] = value;
    }
    
    assignMines(){ 
        let numMinesCreated = 0;
        while (numMinesCreated < this.numMines) {
            let row = getRandomInt(this.gridSize);
            let col = getRandomInt(this.gridSize);
            let cell = this.getCell(row, col);
            if (!cell.isMine) {
                cell.isMine = true;
                numMinesCreated++;
            }
        }
    };

    applyFnToNeighbors(row, col, fn){
        let topLeft = {row: row-1, col: col-1};
        let topCenter = {row: row-1, col: col};
        let topRight = {row: row-1, col: col+1};
        
        let centerLeft = {row: row, col: col-1};
        let centerRight = {row: row, col: col+1};
    
        let bottomLeft = {row: row+1, col: col-1};
        let bottomCenter = {row: row+1, col: col};
        let bottomRight = {row: row+1, col: col+1};
    
        let surroundingCells = [topLeft, topCenter, topRight, 
                                centerLeft, centerRight, 
                                bottomLeft, bottomCenter, bottomRight];
        
        surroundingCells.forEach(c => fn(c));
    };

    isInBounds(coordinate){
        return coordinate >= 0 && coordinate < this.gridSize;
    };

    isMineAndInBounds(surroundingCell) {
        if (!this.isInBounds(surroundingCell.row) || !this.isInBounds(surroundingCell.col)) {
            return false;  
        }
        return this.getCell(surroundingCell.row, surroundingCell.col).isMine;
    };

    getNumMines(cell, row, col){
        if(this.isMineAndInBounds(cell))
        this.getCell(row,col).numMinesAround++;
    };

    updateMineCount(){
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (!this.getCell(row, col).isMine){
                    this.changeCellProperty(row, col, "numMinesAround", 0);
                    this.applyFnToNeighbors(row, col, (cell) => {this.getNumMines(cell, row, col)});
                }
            }
        };
    };

    revealNeighbors(cell, revealedCells, zeros){
                
        if(!this.isInBounds(cell.row) || !this.isInBounds(cell.col)) {
           return;
        }

        let currentCell = this.getCell(cell.row, cell.col);
        if (currentCell.numMinesAround == 0 && !currentCell.isRevealed){
            currentCell.isRevealed = true;
            zeros.push(currentCell);
            revealedCells.push(currentCell);
        }

        else if (currentCell.numMinesAround > 0 && !currentCell.isRevealed) {
            currentCell.isRevealed = true;
            revealedCells.push(currentCell);
        }

    };

    revealZeros  = function(row, col) {
        let zeros = [this.getCell(row, col)];
        let revealedCells = [this.getCell(row,col)];
        this.changeCellProperty(row, col, "isRevealed", true);
        
        while (zeros.length > 0) {
            row = zeros[0].row;
            col = zeros[0].column;
            this.applyFnToNeighbors(row, col, (cell) => {this.revealNeighbors(cell, revealedCells, zeros)});
            zeros.shift();
        };
        
        return revealedCells;
    };
    
    resetGrid() {
        this.cells = [];
    }
};

export default Grid;