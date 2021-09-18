const randomIntegerFrom0ToMax = (max) => {
    return Math.floor(Math.random() * max);
}

const setBombingCellsIndeces = (numberOfBombs) => {
    const cellsLength = document.getElementsByClassName("cell").length;
    let bombingCellsIndeces = [];
    for (let i = 0, randomInteger = -1, previousInteger = -1; i < numberOfBombs; i++) { 
        while (randomInteger === previousInteger) {
            randomInteger = randomIntegerFrom0ToMax(cellsLength);
        }
        bombingCellsIndeces.push(randomInteger);
        previousInteger = randomInteger;
    }
    return bombingCellsIndeces;
}

const getBombingCellsContents = (numberOfBombs) => {
    let cellsContents = document.getElementsByClassName("cell-content");
    const bombingCellsIndeces = setBombingCellsIndeces(numberOfBombs);
    let bombingCellsContents = [];
    for (let index of bombingCellsIndeces) {
        bombingCellsContents.push(cellsContents[index]);
    }
    return bombingCellsContents;
}

document.addEventListener("DOMContentLoaded", () => {
    console.log(randomIntegerFrom0ToMax(100));
    console.log(setBombingCellsIndeces(15));
    console.log(getBombingCellsContents(15));
})
