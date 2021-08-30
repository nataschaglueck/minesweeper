
import {displayGrid, resetDisplay, setDisplayedGridSize} from "./display.js";
import {activateFlaggingButton, clickToReveal, startGame} from "./gamePlay.js";
import Grid from "./Grid.js";
import Game from "./Game.js";

const mineSweepGrid = new Grid(9, 10);
const mineSweepGame= new Game(false, false);

setDisplayedGridSize(mineSweepGrid);

const createGame = function() {
      
    mineSweepGrid.resetGrid();

    mineSweepGame.resetGame();
    console.log(mineSweepGame);

    resetDisplay();

    mineSweepGrid.createGridCells();

    mineSweepGrid.assignMines();

    mineSweepGrid.findMinesAround();

    displayGrid(mineSweepGrid);

    clickToReveal(mineSweepGrid, mineSweepGame);


}


activateFlaggingButton(mineSweepGame);
createGame();
startGame(createGame);