export const getCellElem = function(cell){
    return document.querySelector(`.row-${cell.row}-col-${cell.col}`);
}

export const displayRevealedCell = function (cell) {
    let cellElem = getCellElem(cell);
    let innerSpan = cellElem.querySelector("span");
    innerSpan.classList.remove("hide");
    innerSpan.classList.add("revealed");
    cellElem.classList.remove("clickable");
};



export const displayGrid = function(gridObject) {
    const gridContainer = document.querySelector(".container");
    gridObject.cells.forEach(cell => {
        let content = cell.isMine ? `<img src="bombicon.svg" class="bomb-icn" />` : `${cell.numMinesAround}`;
        const cellContent = document.createElement("li");
        cellContent.classList.add("cell");
        cellContent.classList.add("clickable");
        cellContent.classList.add(`row-${cell.row}-col-${cell.col}`);
        cellContent.innerHTML = `<span class="hide">${content != "0" ? content : ""}</span>`;
        gridContainer.append(cellContent);
    })  
};

export const revealWholeGrid = function (gridObject) {
    gridObject.cells.forEach(cell =>{
        let cellElem = getCellElem(cell);
        let innerSpan = cellElem.querySelector("span");
        innerSpan.classList.remove("hide");
        innerSpan.classList.add("revealed");
        cellElem.classList.remove("clickable");
    });
}

export const resetDisplay = function() {
    const gridContainer = document.querySelector(".container");
    gridContainer.innerHTML = "";
    let flagButton = document.querySelector(".flag-btn");
    flagButton.classList.remove("flag");
}

export const setDisplayedGridSize = function(gridObject) {
    let gridContainer = document.querySelector(".container");
    gridContainer.setAttribute(
        `style`, 
        `grid-template-columns: repeat(${gridObject.gridSize}, 1fr); 
        grid-template-rows: repeat(${gridObject.gridSize}, 1fr);`);

}

export const gameOverDisplay = function (){
    let gameOverScreen = document.querySelector(".game-over");
    gameOverScreen.style.removeProperty("display");
}