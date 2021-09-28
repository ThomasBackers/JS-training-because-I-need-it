// ---------- SET BOMBING CELLS ----------
const randomIntegerFrom0ToMax = max => {
    //return a random number between 0 and max
    return Math.floor(Math.random() * max);
};

const setBombsIndeces = numberOfBombs => {
    //return a random indeces list for random picking in a span elements list
    const cellsLength = document.getElementsByClassName("cell").length;
    const BombsIndeces = [];
    for (let i = 0; i < numberOfBombs; i++) {
        randomInteger = randomIntegerFrom0ToMax(cellsLength);
        while (BombsIndeces.includes(randomInteger)) {
            randomInteger = randomIntegerFrom0ToMax(cellsLength);
        }
        BombsIndeces.push(randomInteger);
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

// ---------- SET NUMBERS ----------
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
    return adjacentCells;
};

const setField = numberOfBombs => {
    //set the numerical cells
    const bombingCells = setAndGetBombingCells(numberOfBombs);
    for (let bombingCell of bombingCells) {
        const adjacentCells = getAdjacentCells(bombingCell);
        for (let adjacentCell of adjacentCells) {
            const cellContent = adjacentCell.firstElementChild;
            const classes = cellContent.classList;
            switch (cellContent.innerHTML) {
                case "7":
                    cellContent.innerHTML = "8";
                    classes.add("eight");
                    classes.remove("seven", "hidden-cell-content");
                    break;
                case "6":
                    cellContent.innerHTML = "7";
                    classes.add("seven");
                    classes.remove("six", "hidden-cell-content");
                    break;
                case "5":
                    cellContent.innerHTML = "6";
                    classes.add("six");
                    classes.remove("five", "hidden-cell-content");
                    break;
                case "4":
                    cellContent.innerHTML = "5";
                    classes.add("five");
                    classes.remove("four", "hidden-cell-content");
                    break;
                case "3":
                    cellContent.innerHTML = "4";
                    classes.add("four");
                    classes.remove("three", "hidden-cell-content");
                    break;
                case "2":
                    cellContent.innerHTML = "3";
                    classes.add("three");
                    classes.remove("two", "hidden-cell-content");
                    break;
                case "1":
                    cellContent.innerHTML = "2";
                    classes.add("two");
                    classes.remove("one", "hidden-cell-content");
                    break;
                default:
                    if (!classes.contains("fa-bomb")) {
                        cellContent.innerHTML = "1";
                        classes.add("one");
                        classes.add("number");
                        classes.remove("hidden-cell-content");
                    }
            }
        }
    }
};

// ---------- CELLS BEHAVIOR ----------
const revealCell = cell => {
    cell.classList.remove("hidden-cell")
    cell.firstElementChild.classList.remove("hidden-cell-content");
    //return cell.firstElementChild.classList;
};

const gameOver = () => {};

const getSafeAdjacents = cell => {
    const safeCells = [];
    const adjacentCells = getAdjacentCells(cell);
    for (let adjacentCell of adjacentCells) {
        if (!adjacentCell.firstElementChild.classList.contains("fa-bomb") && adjacentCell.classList.contains("hidden-cell")) {
            safeCells.push(adjacentCell);
        }
    }
    return safeCells;
};

const revealSafeCells = safeCells => {
    for (let safeCell of safeCells) {
        revealCell(safeCell);
        if (!safeCell.firstElementChild.classList.contains("number")) {
            const safeAdjacents = getSafeAdjacents(safeCell);
            revealSafeCells(safeAdjacents);
        }
    }
};

// ---------- ATTACH EVENTS ----------
const cells = document.getElementsByClassName("hidden-cell");
for (let cell of cells) {
    cell.addEventListener("click", () => {
        revealCell(cell);
        const safeAdjacents = getSafeAdjacents(cell);
        revealSafeCells(safeAdjacents);
    });
}

// ---------- EXECUTION ----------
document.addEventListener("DOMContentLoaded", () => {
    setField(15);
});
