export const getCellElem = function(cell){
    return document.querySelector(`.row-${cell.row}-col-${cell.col}`);
}

export const displayRevealedCell = function (cell) {
    let cellElem = getCellElem(cell);
    const innerSpan = cellElem.querySelector("span");
    innerSpan.classList.remove("hide");
    innerSpan.classList.add("revealed");
    cellElem.classList.remove("clickable");
}

export const displayGrid = function(grid) {
    const gridContainer = document.querySelector(".grid-container");
    grid.cells.forEach(cell => {
        let content = cell.isMine ? `<img src="bombicon.svg" class="bomb-icn" />` : `${cell.mineNeighborCount}`;
        const cellContent = document.createElement("li");
        cellContent.classList.add("cell");
        cellContent.classList.add("clickable");
        cellContent.classList.add(`row-${cell.row}-col-${cell.col}`);
        cellContent.innerHTML = `<span class="hide">${content != "0" ? content : ""}</span>`;
        gridContainer.append(cellContent);
    });
}

export const revealWholeGrid = function (grid) {
    grid.cells.forEach(cell =>{
        let cellElem = getCellElem(cell);
        const innerSpan = cellElem.querySelector("span");
        innerSpan.classList.remove("hide");
        innerSpan.classList.add("revealed");
        cellElem.classList.remove("clickable");
    });
}

export const resetDisplay = function() {
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.innerHTML = "";
    const flagBtn = document.querySelector(".flag-btn");
    flagBtn.classList.remove("flag");
    flagBtn.setAttribute('title', "turn flagging on");
    let cells = document.querySelectorAll(".clickable");
    cells.forEach((cell) => {
        cell.style.removeProperty('cursor');
        cell.classList.remove("flaggable");    
    });
}

export const setDisplayedGridSize = function(grid) {
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.setAttribute(
        `style`, 
        `grid-template-columns: repeat(${grid.gridSize}, 1fr); 
        grid-template-rows: repeat(${grid.gridSize}, 1fr);`
    );
}