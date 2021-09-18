const randomIntegerFrom1ToMax = (max) => {
    return Math.ceil(Math.random() * max);
}

const setBombingCellsIndeces = (numberOfBombs) => {
    let bombingCellsIndeces = [];
    for (let i = 0, randomInteger = 0, previousInteger = 0; i < numberOfBombs; i++) { 
        while (randomInteger === previousInteger) {
            randomInteger = randomIntegerFrom1ToMax(100);
        }
        bombingCellsIndeces.push(randomInteger);
        previousInteger = randomInteger;
    }
    return bombingCellsIndeces;
}

const setBombingCells = () => {
    let cellsContents = document.getElementsByClassName("cell-content");
    const bombingCellsIndeces = setBombingCellsIndeces(15);
}
