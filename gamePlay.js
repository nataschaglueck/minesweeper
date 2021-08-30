import { displayRevealedCell, revealWholeGrid, resetDisplay} from "./display.js";


export const changeDisplayedCell = function (cell, row, col, gridObject, game) {
    let currentCell = gridObject.getCell(row, col);
    console.log(gridObject.getCell(row, col));
    if (game.gameOver){
        return;
    }

    if (game.flaggingOn){
        let cellObject = gridObject.getCell(row, col);
        toggleFlagging(cellObject, cell);
        return;
    }

    if (currentCell.numMinesAround == 0){
        gridObject.changeCellProperty(row, col, "isRevealed", true);
        const revealedCells = gridObject.revealZeros(row, col);
        revealedCells.forEach(c =>{
            displayRevealedCell(c);
        } );
        return;
    };
    if (currentCell.isMine){
        gridObject.changeCellProperty(row, col, "isRevealed", true);
        revealWholeGrid(gridObject);
        game.gameOver = true;
        return;
    }
    else {
        gridObject.changeCellProperty(row, col, "isRevealed", true);
        displayRevealedCell(currentCell);
        return;
    }
    
};

export const clickToReveal = function (gridObject, game){
    for (let row = 0; row < gridObject.gridSize; row++) {
        for (let col = 0; col < gridObject.gridSize; col++) {
            let cell = document.querySelector(".row" + row + "col" + col);
            cell.addEventListener("click", () => changeDisplayedCell(cell, row, col, gridObject, game));
        }
    }   
};



export const toggleFlagging = function (object, cell){
    console.log(object);
    if (object.flaggingOn){
        object.flaggingOn = false;
        cell.classList.remove("flag");

    }
    else{
        object.flaggingOn = true;
        cell.classList.add("flag");
    }

}

export const activateFlaggingButton = function(game) {
    let flaggingButton = document.querySelector(".flagButton");
    flaggingButton.addEventListener("click", ()=>toggleFlagging(game, flaggingButton));
}

export const startGame = function(createGame) {
    let newGameButton = document.querySelector(".newGame");
    newGameButton.addEventListener("click", createGame);
}

