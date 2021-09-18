// SET BOMBING CELLS
const randomIntegerFrom0ToMax = max => {
    //return a random number between 0 and max
    return Math.floor(Math.random() * max);
};

const setBombsIndeces = numberOfBombs => {
    //return a random indeces list for random picking in a span elements list
    const cellsLength = document.getElementsByClassName("cell").length;
    let BombsIndeces = [];
    for (let i = 0, randomInteger = -1, previousInteger = -1; i < numberOfBombs; i++) {
        while (randomInteger === previousInteger) {
            randomInteger = randomIntegerFrom0ToMax(cellsLength);
        }
        BombsIndeces.push(randomInteger);
        previousInteger = randomInteger;
    }
    return BombsIndeces;
};

const getBombingCellsContents = numberOfBombs => {
    //return a random span elements list to put bombs inside them
    let cellsContents = document.getElementsByClassName("cell-content");
    const BombsIndeces = setBombsIndeces(numberOfBombs);
    let bombingCellsContents = [];
    for (let index of BombsIndeces) {
        bombingCellsContents.push(cellsContents[index]);
    }
    return bombingCellsContents;
};

const setAndGetBombingCells = numberOfBombs => {
    //put bombs inside random span elements
    //also return the list of bombing cells
    const bombingCellsContents = getBombingCellsContents(numberOfBombs);
    let bombingCells = [];
    for (let bombingCellsContent of bombingCellsContents) {
        bombingCellsContent.classList.add("fas", "fa-bomb");
        bombingCellsContent.classList.remove("hidden-cell-content");
        bombingCells.push(bombingCellsContent.parentNode);
    }
    return bombingCells;
};

// SET NUMBERS

// TESTS
document.addEventListener("DOMContentLoaded", () => {
    console.log(setAndGetBombingCells(15));
});
