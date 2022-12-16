/**
 * Different patterns which can be used to populate array
 * 
 * @author Rahul Kumawat
 * @date 21/11/2022
 */
import { $comb } from "./combinatorics.js";
import { getRandIntInRangeExcUpBound } from "./numbers.js";



// Spiral patteren generation
export const SPIRAL_ORIENT_SCHEMES = Object.freeze(['ruld', 'lurd', 'rdlu', 'ldru', 'urdl', 'drul', 'uldr', 'dlur']);

/**
 * Generates indices of spiral pattern for a given block size of 2D array
 * @param {integer} blockSize Size of the spiral block which must be 
 * @param {string} scheme One of the schemes mentioned above
 * @returns Spiral generator object
 */
export const spiralIndexGenerator = function (blockSize, scheme = SPIRAL_ORIENT_SCHEMES[0]) {

    if (!Number.isInteger(blockSize) || blockSize < 0 || blockSize % 2 == 0) {
        throw new RangeError(`Only positive odd numbered block size is allowed for spiral generation. Provided block size = ${blockSize}`);
    }

    if (!SPIRAL_ORIENT_SCHEMES.includes(scheme)) {
        throw new RangeError(`Invalid orientation - ${scheme}\nSelect orientation from these choices ${SPIRAL_ORIENT_SCHEMES}`)
    }

    const orientation = scheme.split("");
    const cubeCellsCount = blockSize * blockSize;

    let mid = Math.floor(blockSize / 2);

    return (function* (row, col) {
        let count2 = 0;
        let movement = 0;
        let moveCount = 0;
        let currOrientIndex = 0;

        // Yield for blockSize = 1
        yield [row, col];

        // Starts yield for blockSize > 1
        for (let i = 2; i <= cubeCellsCount; i++) {

            switch (orientation[currOrientIndex]) {
                case 'r':
                    if (col + 1 < blockSize) {
                        col++
                    }
                    break;
                case 'u':
                    if (row - 1 >= 0) {
                        row--;
                    }
                    break;
                case 'l':
                    if (col - 1 >= 0) {
                        col--;
                    }
                    break;
                case 'd':
                    if (row + 1 < blockSize) {
                        row++;
                    }
            }
            // Yields for current position
            yield [row, col];

            if (count2 == 2) {
                count2 = 0;
                movement++;
                moveCount = 0;
            }

            if (moveCount < movement) {
                moveCount++;
            } else if (moveCount == movement) {
                moveCount = 0;
                count2++;
                if (currOrientIndex + 1 < orientation.length) {
                    currOrientIndex++;
                } else {
                    currOrientIndex = 0;
                }
            }
        }
    })(mid, mid);
}




/**
 * Random Array Traversal index generator for 2D array
 * @param {integer} rows 
 * @param {integer} cols 
 * @param {integer} rIndex 
 * @param {integer} cIndex 
 * @returns Random Traversal Index Generator object
 */
export const randomTraversalIndexGenerator = function (rows, cols, rIndex = 0, cIndex = 0) {

    if (Number.isInteger(rows) && Number.isInteger(cols) && rows > 0 && cols > 0 &&
        Number.isInteger(rIndex) && Number.isInteger(cIndex) && rIndex >= 0 && cIndex >= 0 &&
        rIndex < rows && cIndex < cols) {

        return (function* (rows, cols, rIndex, cIndex) {
            const totalElements = rows * cols;
            const randomMoves = $comb.permutations([1, 2, 3, 4], 4);
            const grid = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

            let num = 0;
            let choiceStack = [];
            let randMoveArrayIndex;
            let lastChoice = 0;
            let moveChoices;
            let moveUpdated = true;
            let prevRIndex = rIndex;
            let prevCIndex = cIndex;

            while (num < totalElements) {

                if (moveUpdated) {
                    grid[rIndex][cIndex] = ++num;
                    yield { prev: [prevRIndex, prevCIndex], curr: [rIndex, cIndex] };
                    prevRIndex = rIndex;
                    prevCIndex = cIndex;
                    lastChoice = 0;
                    randMoveArrayIndex = getRandIntInRangeExcUpBound(0, randomMoves.length);
                } else {
                    [lastChoice, randMoveArrayIndex, rIndex, cIndex, prevRIndex, prevCIndex] = choiceStack.pop();
                }

                moveChoices = randomMoves[randMoveArrayIndex];
                moveUpdated = false;

                for (let i = lastChoice; i < 4; i++) {
                    switch (moveChoices[i]) {
                        case 1:
                            if (rIndex - 1 >= 0 && grid[rIndex - 1][cIndex] == 0) {
                                rIndex--;
                                moveUpdated = true;
                            } break;
                        case 2:
                            if (cIndex + 1 < cols && grid[rIndex][cIndex + 1] == 0) {
                                cIndex++;
                                moveUpdated = true;
                            } break;
                        case 3:
                            if (rIndex + 1 < rows && grid[rIndex + 1][cIndex] == 0) {
                                rIndex++;
                                moveUpdated = true;
                            } break;
                        case 4:
                            if (cIndex - 1 >= 0 && grid[rIndex][cIndex - 1] == 0) {
                                cIndex--;
                                moveUpdated = true;
                            }
                    }
                    if (moveUpdated) {
                        choiceStack.push([i, randMoveArrayIndex, rIndex, cIndex, prevRIndex, prevCIndex]);
                        break;
                    }
                }
            }
        })(rows, cols, rIndex, cIndex);

    } else {
        throw new RangeError(`2D array Rows, Columns, Row start index and Column start index must be positive non zero integers.\nStart row index must be < total rows\nStart column index < total columns\nProvided: rows = ${rows}, cols = ${cols}\nProvided: row start index = ${rIndex}, column start index = ${cIndex}`);
    }
}