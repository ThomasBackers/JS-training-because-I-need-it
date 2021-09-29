/*
You'll have a way better understanding of the code if you check:
- the HTML file when I try to catch cells, cells contents, elements etc.
- the CSS file if you see me play with the classLists
*/

// ---------- SET BOMBING CELLS ----------
/** returns a random number between 0 and max */
const randomIntegerFrom0ToMax = max => {
    return Math.floor(Math.random() * max);
};

/** returns a random indeces list for random picking in a span elements list */
const setBombsIndeces = numberOfBombs => {
    const cellsLength = document.getElementsByClassName("cell").length;
    const BombsIndeces = [];
    let randomInteger;
    for (let i = 0; i < numberOfBombs; i++) {
        randomInteger = randomIntegerFrom0ToMax(cellsLength);
        // I don't want to have two bombs on the same cell so let's avoid to get two times the same index for bomb placement
        while (BombsIndeces.includes(randomInteger)) {
            randomInteger = randomIntegerFrom0ToMax(cellsLength);
        }
        BombsIndeces.push(randomInteger);
    }
    return BombsIndeces;
};

/** returns a random span elements list to put bombs inside them */
const getBombingCellsContents = numberOfBombs => {
    const cellsContents = document.getElementsByClassName("cell-content");
    const BombsIndeces = setBombsIndeces(numberOfBombs);
    const bombingCellsContents = [];
    for (let index of BombsIndeces) {
        bombingCellsContents.push(cellsContents[index]);
    }
    return bombingCellsContents;
};

/**
 * puts bombs inside random span elements
 * also returns the list of bombing cells
 */
const setAndGetBombingCells = numberOfBombs => {
    const bombingCellsContents = getBombingCellsContents(numberOfBombs);
    const bombingCells = [];
    for (let bombingCellContent of bombingCellsContents) {
        bombingCellContent.classList.add("fas", "fa-bomb");
        bombingCells.push(bombingCellContent.parentNode);
    }
    return bombingCells;
};

// ---------- SET NUMBERS ----------
/** return a particular cell through its relative position to current cell */
const targetCell = (currentCell, relativeTargetPosition) => {
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

/** return the list of the adjacent cells of the parameter cell */
const getAdjacentCells = currentCell => {
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
    /* 
    I had to do that huge switch as I have to check what's the cell's position
    in the grid to avoid to retrieve an off-field cell (which would be null) 
    or in an unwanted position (tipically when the cell is on the right border
    you don't want to retrieve a cell on the right or you'll have a weird position).
    -------------------------------------------------------------------------------
    To better understand it, remember: When I get the cells they are in a kind of
    a list. So I move on a single dimension object (and the grid has 2 dimensions).
    */
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

/** sets the numerical cells */
const setField = numberOfBombs => {
    // Here I have to make a +1 on each cell around the bombs
    // First I set & get the bombs
    const bombingCells = setAndGetBombingCells(numberOfBombs);
    for (let bombingCell of bombingCells) {
        // Then for every bomb I get its adjacents cells
        const adjacentCells = getAdjacentCells(bombingCell);
        for (let adjacentCell of adjacentCells) {
            // Then I get the contents of those cells
            const cellContent = adjacentCell.firstElementChild;
            // I have to change their classes too
            const classes = cellContent.classList;
            // And there we go:
            switch (cellContent.innerHTML) {
                case "7":
                    cellContent.innerHTML = "8";
                    classes.add("eight");
                    classes.remove("seven");
                    break;
                case "6":
                    cellContent.innerHTML = "7";
                    classes.add("seven");
                    classes.remove("six");
                    break;
                case "5":
                    cellContent.innerHTML = "6";
                    classes.add("six");
                    classes.remove("five");
                    break;
                case "4":
                    cellContent.innerHTML = "5";
                    classes.add("five");
                    classes.remove("four");
                    break;
                case "3":
                    cellContent.innerHTML = "4";
                    classes.add("four");
                    classes.remove("three");
                    break;
                case "2":
                    cellContent.innerHTML = "3";
                    classes.add("three");
                    classes.remove("two");
                    break;
                case "1":
                    cellContent.innerHTML = "2";
                    classes.add("two");
                    classes.remove("one");
                    break;
                default:
                    if (!classes.contains("fa-bomb")) {
                        cellContent.innerHTML = "1";
                        classes.add("one");
                        classes.add("number");
                    }
            }
        }
    }
};

// ---------- CELLS BEHAVIOR ----------
/** reveals a cell */
const revealCell = cell => {
    cell.classList.remove("hidden-cell");
    cell.firstElementChild.classList.remove("hidden-cell-content");
};

/** gets the safe & hidden adjacent cells of the current one */
const getSafeAndHiddenAdjacents = cell => {
    const safeCells = [];
    const adjacentCells = getAdjacentCells(cell);
    for (let adjacentCell of adjacentCells) {
        if (
            !adjacentCell.firstElementChild.classList.contains("fa-bomb") &&
            adjacentCell.classList.contains("hidden-cell")
        ) {
            safeCells.push(adjacentCell);
        }
    }
    return safeCells;
};

/**
 * reveals the safe cells
 * but if there are blank cells in them (I mean without any number)
 * the function has to get their safe & hidden adjacent cells too
 * and to do all its routine again with 'em
 */
const revealSafeCells = safeCells => {
    for (let safeCell of safeCells) {
        revealCell(safeCell);
        if (!safeCell.firstElementChild.classList.contains("number")) {
            const safeAdjacents = getSafeAndHiddenAdjacents(safeCell);
            revealSafeCells(safeAdjacents);
        }
    }
};

// ---------- ATTACH EVENTS ----------
/** attachs the clicks events to the cells */
const attachEvents = () => {
    const cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        // if the cell contains a bomb or a number
        if (
            cell.firstElementChild.classList.contains("fa-bomb") ||
            cell.firstElementChild.classList.contains("number")
        ) {
            // I simply want to reveal that cell on click
            cell.addEventListener("click", () => {
                revealCell(cell);
            });
        } else {
            // but if it's a blank one I want to do the full routine:
            // reveal, check for adjacents & reveals recursively the other blank cells
            cell.addEventListener("click", () => {
                revealCell(cell);
                const safeAdjacents = getSafeAndHiddenAdjacents(cell);
                revealSafeCells(safeAdjacents);
            });
        }
    }
};

// ---------- EXECUTION ----------
document.addEventListener("DOMContentLoaded", () => {
    setField(15);
    attachEvents();
});
