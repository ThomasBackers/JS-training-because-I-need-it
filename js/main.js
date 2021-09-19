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
            currentCell = currentCell.nextElementSibling;
        }
    } else {
        for (let i = 0; i < Math.abs(relativeTargetPosition); i++) {
            currentCell = currentCell.previousElementSibling;
        }
    }
    return currentCell;
};

const getAdjacentCells = currentCell => {
    //return the list of adjacent cells of the current one
    const adjacentCells = [],
        cellClasses = currentCell.classList;
    let topCell,
        topRightCell,
        rightCell,
        bottomRightCell,
        bottomCell,
        bottomLeftCell,
        leftCell,
        topLeftCell;
    switch (true) {
        case cellClasses.contains("top"):
            bottomCell = targetCell(currentCell, 10);
            if (cellClasses.contains("left")) {
                rightCell = currentCell.nextElementSibling;
                bottomRightCell = bottomCell.nextElementSibling;
                adjacentCells.push(bottomCell, rightCell, bottomRightCell);
                break;
            } else if (cellClasses.contains("right")) {
                leftCell = currentCell.previousElementSibling;
                bottomLeftCell = bottomCell.previousElementSibling;
                adjacentCells.push(bottomCell, leftCell, bottomLeftCell);
                break;
            }
            rightCell = currentCell.nextElementSibling;
            leftCell = currentCell.previousElementSibling;
            bottomRightCell = bottomCell.nextElementSibling;
            bottomLeftCell = bottomCell.previousElementSibling;
            adjacentCells.push(bottomCell, rightCell, leftCell, bottomRightCell, bottomLeftCell);
            break;
        case cellClasses.contains("bottom"):
            topCell = targetCell(currentCell, -10);
            if (cellClasses.contains("left")) {
                rightCell = currentCell.nextElementSibling;
                topRightCell = topCell.nextElementSibling;
                adjacentCells.push(topCell, rightCell, topRightCell);
                break;
            } else if (cellClasses.contains("right")) {
                leftCell = currentCell.previousElementSibling;
                topLeftCell = topCell.previousElementSibling;
                adjacentCells.push(topCell, leftCell, topLeftCell);
                break;
            }
            rightCell = currentCell.nextElementSibling;
            leftCell = currentCell.previousElementSibling;
            topRightCell = topCell.nextElementSibling;
            topLeftCell = topCell.previousElementSibling;
            adjacentCells.push(topCell, rightCell, leftCell, topRightCell, topLeftCell);
            break;
        case cellClasses.contains("right"):
            topCell = targetCell(currentCell, -10);
            topLeftCell = topCell.previousElementSibling;
            leftCell = currentCell.previousElementSibling;
            bottomCell = targetCell(currentCell, 10);
            bottomLeftCell = bottomCell.previousElementSibling;
            adjacentCells.push(topCell, topLeftCell, leftCell, bottomCell, bottomLeftCell);
            break;
        case cellClasses.contains("left"):
            topCell = targetCell(currentCell, -10);
            topRightCell = topCell.nextElementSibling;
            rightCell = currentCell.nextElementSibling;
            bottomCell = targetCell(currentCell, 10);
            bottomRightCell = bottomCell.nextElementSibling;
            adjacentCells.push(topCell, topRightCell, rightCell, bottomCell, bottomRightCell);
            break;
        default:
            topCell = targetCell(currentCell, -10);
            topRightCell = topCell.nextElementSibling;
            topLeftCell = topCell.previousElementSibling;
            bottomCell = targetCell(currentCell, 10);
            bottomRightCell = bottomCell.nextElementSibling;
            bottomLeftCell = bottomCell.previousElementSibling;
            rightCell = currentCell.nextElementSibling;
            leftCell = currentCell.previousElementSibling;
            adjacentCells.push(
                topCell,
                topRightCell,
                topLeftCell,
                bottomCell,
                bottomRightCell,
                bottomLeftCell,
                rightCell,
                leftCell
            );
    }
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
            if (contentClasses.contains("one")) {
                contentClasses.remove("one", "hidden-cell-content");
                contentClasses.add("two");
                cellContent.innerHTML = "2";
            } else if (contentClasses.contains("two")) {
                contentClasses.remove("two", "hidden-cell-content");
                contentClasses.add("three");
                cellContent.innerHTML = "3";
            } else if (contentClasses.contains("three")) {
                contentClasses.remove("three", "hidden-cell-content");
                contentClasses.add("four");
                cellContent.innerHTML = "4";
            } else if (contentClasses.contains("four")) {
                contentClasses.remove("four", "hidden-cell-content");
                contentClasses.add("five");
                cellContent.innerHTML = "5";
            } else if (contentClasses.contains("five")) {
                contentClasses.remove("five", "hidden-cell-content");
                contentClasses.add("six");
                cellContent.innerHTML = "6";
            } else if (contentClasses.contains("six")) {
                contentClasses.remove("six", "hidden-cell-content");
                contentClasses.add("seven");
                cellContent.innerHTML = "7";
            } else if (contentClasses.contains("seven")) {
                contentClasses.remove("seven", "hidden-cell-content");
                contentClasses.add("eight");
                cellContent.innerHTML = "8";
            } else if (!contentClasses.contains("fa-bomb")) {
                contentClasses.add("one");
                contentClasses.remove("hidden-cell-content");
                cellContent.innerHTML = "1";
            }
        }
    }
};

// TESTS
document.addEventListener("DOMContentLoaded", () => {
    setNumbersCells(15);
});
