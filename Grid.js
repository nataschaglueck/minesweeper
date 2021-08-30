import Cell from "./Cell.js";

class Grid {
    constructor(
        gridSize,
        numMines,
    ) 
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
                let cell = new Cell(
                    row,
                    col,
                    false,
                    undefined,
                    false,
                    false
                );
    
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
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        for (let i = 0; i < this.numMines;) {
            let row = getRandomInt(this.gridSize);
            let col = getRandomInt(this.gridSize);
            let cell = this.getCell(row, col);
            if (!cell.isMine) {
                cell.isMine = true;
                i++;
            }
        }
    };

    applyFnToNeighbors(row, col, callback){
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
        //console.log(surroundingCells);
        
        surroundingCells.forEach(c => callback(c));
    };

    isInBounds(coordinate){
        return coordinate >= 0 && coordinate < this.gridSize;
    };

    checkForMine(surroundingCell) {
        if (!this.isInBounds(surroundingCell.row) || !this.isInBounds(surroundingCell.col)) {
            return 0;  
        }
        return this.getCell(surroundingCell.row, surroundingCell.col).isMine ? 1 : 0;
    };

    getNumMines(cell, row, col){
        this.getCell(row,col).numMinesAround += this.checkForMine(cell);
    };

    findMinesAround(){
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
                
        //if its not in Bounds do nothing else
        if(!this.isInBounds(cell.row) || !this.isInBounds(cell.col)) {
           return;
        }

        let currentCell = this.getCell(cell.row, cell.col);
        // if it's a zero, reveal it and add to zero list
        // adds it to revealed Cell list, so it can be revealed in display function
        if (currentCell.numMinesAround == 0 && !currentCell.isRevealed){
            currentCell.isRevealed = true;
            zeros.push(currentCell);
            revealedCells.push(currentCell);
            // console.log(gridCell);
        }

        // adds it to revealed cell list and reveals it
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
    
            //Do the revealNeighbors function for all the surrounding cells
            this.applyFnToNeighbors(row, col, (cell) => {this.revealNeighbors(cell, revealedCells, zeros)});
        
            //remove this zero from the zero list, so the loop will end
            zeros.shift();
            
        };
        
        return revealedCells;
    
    };
    
    resetGrid() {
        this.cells = [];
    }


};

export default Grid;









