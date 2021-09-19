// SET BOMBING CELLS
const randomIntegerFrom0ToMax = max => {
    //return a random number between 0 and max
    return Math.floor(Math.random() * max);
};

const setBombsIndeces = numberOfBombs => {
    //return a random indeces list for random picking in a span elements list
    const cellsLength = document.getElementsByClassName("cell").length;
    const BombsIndeces = [];
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
    const cellsContents = document.getElementsByClassName("cell-content");
    const BombsIndeces = setBombsIndeces(numberOfBombs);
    const bombingCellsContents = [];
    for (let index of BombsIndeces) {
        bombingCellsContents.push(cellsContents[index]);
    }
    return bombingCellsContents;
};

const setAndGetBombingCells = numberOfBombs => {
    //put bombs inside random span elements
    //also return the list of bombing cells
    const bombingCellsContents = getBombingCellsContents(numberOfBombs);
    const bombingCells = [];
    for (let bombingCellsContent of bombingCellsContents) {
        bombingCellsContent.classList.add("fas", "fa-bomb");
        bombingCellsContent.classList.remove("hidden-cell-content");
        bombingCells.push(bombingCellsContent.parentNode);
    }
    return bombingCells;
};

// SET NUMBERS
const targetCell = (currentCell, relativeTargetPosition) => {
    //return a particular cell through its relative position to current cell
    if (relativeTargetPosition > 0) {
        for (let i = 0; i < relativeTargetPosition; i++) {
            if (!currentCell) {
                currentCell = "out of bound";
                break;
            }
            currentCell = currentCell.nextElementSibling;
        }
    } else {
        for (let i = 0; i < Math.abs(relativeTargetPosition); i++) {
            if (!currentCell) {
                currentCell = "out of bound";
                break;
            }
            currentCell = currentCell.previousElementSibling;
        }
    }
    return currentCell;
};

const getAdjacentCells = currentCell => {
    //return the list of adjacent cells of the current one
    const topCell = targetCell(currentCell, -10),
        topLeftCell = topCell.previousElementSibling,
        topRightCell = topCell.nextElementSibling,
        bottomCell = targetCell(currentCell, 10),
        bottomRightCell = bottomCell.nextElementSibling,
        bottomLeftCell = bottomCell.previousElementSibling,
        leftCell = currentCell.previousElementSibling,
        rightCell = currentCell.nextElementSibling;
    const adjacentCells = [
        topCell,
        topLeftCell,
        topRightCell,
        bottomCell,
        bottomRightCell,
        bottomLeftCell,
        leftCell,
        rightCell,
    ];
    console.log(adjacentCells);
    return adjacentCells;
};

const setNumbersCells = numberOfBombs => {
    const bombingCells = setAndGetBombingCells(numberOfBombs);
    for (let bombingCell of bombingCells) {
        const adjacentCells = getAdjacentCells(bombingCell);
        for (let adjacentCell of adjacentCells) {
            const cellContent = adjacentCell.firstElementChild;
            const contentClasses = cellContent.classList;
            switch (true) {
                case contentClasses.contains("one"):
                    contentClasses.remove("one");
                    contentClasses.add("two");
                    cellContent.innerHTML = "2";
                    break;
                case contentClasses.contains("two"):
                    contentClasses.remove("two");
                    contentClasses.add("three");
                    cellContent.innerHTML = "3";
                    break;
                case contentClasses.contains("three"):
                    contentClasses.remove("three");
                    contentClasses.add("four");
                    cellContent.innerHTML = "4";
                    break;
                case contentClasses.contains("four"):
                    contentClasses.remove("four");
                    contentClasses.add("five");
                    cellContent.innerHTML = "5";
                    break;
                case contentClasses.contains("five"):
                    contentClasses.remove("five");
                    contentClasses.add("six");
                    cellContent.innerHTML = "6";
                    break;
                case contentClasses.contains("six"):
                    contentClasses.remove("six");
                    contentClasses.add("seven");
                    cellContent.innerHTML = "7";
                    break;
                case contentClasses.contains("seven"):
                    contentClasses.remove("seven");
                    contentClasses.add("eight");
                    cellContent.innerHTML = "8";
                    break;
                case contentClasses.contains("fa-bomb"):
                    break;
                default:
                    contentClasses.add("one");
                    contentClasses.remove("hidden-cell-content");
                    cellContent.innerHTML = "1";
            }
        }
    }
};

// TESTS
document.addEventListener("DOMContentLoaded", () => {
    //console.log(setAndGetBombingCells(15));
    setNumbersCells(1);
});
