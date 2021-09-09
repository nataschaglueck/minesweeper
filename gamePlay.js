import { displayRevealedCell, revealWholeGrid, getCellElem} from "./display.js";

export const changeDisplayedCell = function (celElem, cell, grid, game) {
    if (game.gameOver){
        return;
    }

    if (game.isFlaggingOn){
        toggleFlagging(cell, celElem);
        return;
    }

    if (cell.neighboringMineCount == 0){
        grid.getCellsNeighboringZeros(cell).forEach(c => displayRevealedCell(c));
        return;
    }

    if (cell.isMine){
        cell.isRevealed = true;
        revealWholeGrid(grid);
        game.gameOver = true;
        return;
    }

    cell.isRevealed = true;
    displayRevealedCell(cell);
}

export const clickToReveal = function (grid, game){
    grid.cells.forEach(cell => {
        let cellElem = getCellElem(cell);
        cellElem.addEventListener("click", () => 
            changeDisplayedCell(cellElem, cell, grid, game)
        );
    });
}

export const toggleFlagging = function (object, cellElem){
    //object is either the Game or the Cell object
    object.isFlaggingOn ? cellElem.classList.remove("flag") : cellElem.classList.add("flag");
    object.isFlaggingOn = !object.isFlaggingOn;
}

export const activateFlaggingButton = function(game) {
    const flagBtn = document.querySelector(".flag-btn");
    flagBtn.addEventListener("click", ()=>{
        toggleFlagging(game, flagBtn);
        let clickableCellElems = document.querySelectorAll(".clickable");
        if (game.isFlaggingOn) {
            clickableCellElems.forEach(cell => {
                cell.style.cursor = "url(flagIconBlack.svg), auto";
                cell.classList.add("flaggable");
            });
            flagBtn.setAttribute("title", "turn flagging off");
        } else {
            clickableCellElems.forEach(cell => {
                cell.style.removeProperty("cursor");
                cell.classList.remove("flaggable");
            });
            flagBtn.setAttribute("title", "turn flagging on");
        }
    });
}

export const startGame = function(createGame) {
    const newGameBtn = document.querySelector(".new-game-btn");
    newGameBtn.addEventListener("click", createGame);
}