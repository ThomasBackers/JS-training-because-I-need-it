const randomIntegerFrom1ToMax = (max) => {
    return Math.ceil(Math.random() * max);
}

const setBombingCellsIndeces = (numberOfBombs) => {
    const cellsLength = document.getElementsByClassName("cell").length;
    let bombingCellsIndeces = [];
    for (let i = 0, randomInteger = 0, previousInteger = 0; i < numberOfBombs; i++) { 
        while (randomInteger === previousInteger) {
            randomInteger = randomIntegerFrom1ToMax(cellsLength);
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

document.addEventListener('DOMContentLoaded', () => {
    console.log(randomIntegerFrom1ToMax(100));
    console.log(setBombingCellsIndeces(15));
    console.log(getBombingCellsContents(15));
})
