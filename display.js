export const displayRevealedCell = function (cell) {
    let currentCell = document.querySelector(".row" + cell.row + "col" + cell.column);
    let innerSpan = currentCell.querySelector("span");
    innerSpan.classList.remove("hide");
    innerSpan.classList.add("revealed");
    currentCell.classList.remove("clickable");
};



export const displayGrid = function(gridObject) {
    const gridContainer = document.querySelector(".container");
    for (let row = 0; row < gridObject.gridSize; row++) {
        for (let col = 0; col < gridObject.gridSize; col++) {
            const cell = gridObject.getCell(row, col);
            let content = cell.isMine ? `<img src="bombicon.svg" height="90%" width="90%" />` : `${cell.numMinesAround}`;
            const cellContent = document.createElement("li");
            cellContent.classList.add("cell");
            cellContent.classList.add("clickable");
            cellContent.classList.add(`row${row}col${col}`);
            if (content == `0`){
                cellContent.innerHTML = `<span class="hide"></span>`;
            }
            else {
                cellContent.innerHTML = `<span class="hide">${content}</span>`;
            };
            
            gridContainer.append(cellContent);
        };
    };    
};

export const revealWholeGrid = function (gridObject) {
    for (let row = 0; row < gridObject.gridSize; row++) {
        for (let col = 0; col < gridObject.gridSize; col++) {
            let currentCell = document.querySelector(".row" + row + "col" + col);
            let innerSpan = currentCell.querySelector("span");
            innerSpan.classList.remove("hide");
            innerSpan.classList.add("revealed");
            currentCell.classList.remove("clickable");
        }
    }
}

export const resetDisplay = function() {
    const gridContainer = document.querySelector(".container");
    gridContainer.innerHTML = "";
    let flagButton = document.querySelector(".flagButton");
    flagButton.classList.remove("flag");
}

export const setDisplayedGridSize = function(gridObject) {
    let gridContainer = document.querySelector(".container");
    gridContainer.setAttribute(`style`, `grid-template-columns: repeat(${gridObject.gridSize}, 1fr); grid-template-rows: repeat(${gridObject.gridSize}, 1fr);`);

}