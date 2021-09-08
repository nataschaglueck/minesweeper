import { displayRevealedCell, revealWholeGrid, resetDisplay, getCellElem, gameOverDisplay} from "./display.js";
import Grid from "./Grid.js";


export const changeDisplayedCell = function (celElem, cell, gridObject, game) {
    if (game.gameOver){
        return;
    }

    if (game.isFlaggingOn){
        toggleFlagging(cell, celElem);
        return;
    }

    if (cell.numMinesAround == 0){
        gridObject.revealZeros(cell).forEach(c => displayRevealedCell(c));
        return;
    }

    if (cell.isMine){
        cell.isRevealed = true;
        revealWholeGrid(gridObject);
        game.gameOver = true;
        gameOverDisplay();
        return;
    }

    cell.isRevealed = true;
    displayRevealedCell(cell);
    return;   
};

export const clickToReveal = function (gridObject, game){
    gridObject.cells.forEach(cell => {
        let cellElem = getCellElem(cell);
        cellElem.addEventListener("click", () => 
            changeDisplayedCell(cellElem, cell, gridObject, game)
        );
    });
}



export const toggleFlagging = function (object, cellElem){
    object.isFlaggingOn ? cellElem.classList.remove("flag") : cellElem.classList.add("flag");
    object.isFlaggingOn = !object.isFlaggingOn;
}

export const activateFlaggingButton = function(game) {
    let flaggingButton = document.querySelector(".flag-btn");
    flaggingButton.addEventListener("click", ()=>{
        toggleFlagging(game, flaggingButton);
        let clickableCellElems = document.querySelectorAll(".clickable");
        if (game.isFlaggingOn) {
            clickableCellElems.forEach((cell) => {
                cell.style.cursor = "url(flagIconBlack.svg), auto";
                cell.classList.add("flaggable");
                }
            )
            flaggingButton.setAttribute('title', "turn flagging off");

         }
         else {
            clickableCellElems.forEach((cell) => {
                cell.style.removeProperty('cursor');
                cell.classList.remove("flaggable");
                }
            )
            flaggingButton.setAttribute('title', "turn flagging on");

        }
    })
}

export const startGame = function(createGame) {
    let newGameButton = document.querySelectorAll(".new-game-btn");
    newGameButton.forEach(btn => btn.addEventListener("click", createGame));
}

export const cleanSlate = function(gameObject) {
    let cells = document.querySelectorAll(".clickable");
    let flaggingButton = document.querySelector(".flag-btn");
    cells.forEach((cell) => {
        cell.style.removeProperty('cursor');
        cell.classList.remove("flaggable");    
        }
    );
    flaggingButton.setAttribute('title', "turn flagging on");
    if(gameObject.gameOver){
        let gameOverScreen = document.querySelector(".game-over");
        gameOverScreen.style.display = "none";
    }
 }
