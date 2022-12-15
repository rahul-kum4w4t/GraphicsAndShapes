/**
 * A spiral index generator utility which generates index for any Spiral
 * 
 * @author Rahul Kumawat
 * @date 21/11/2022
 */
const ORIENTATION_SCHEMES = ['ruld', 'lurd', 'rdlu', 'ldru', 'urdl', 'drul', 'uldr', 'dlur'];

// Generator function
export const spiralIndexGenerator = function (blockSize, scheme = "ruld") {

    if (!isFinite(blockSize) || blockSize < 0 || blockSize % 2 == 0) {
        throw new Error('Only positive odd numbers are allowed for spiral generation!');
    }

    if (!ORIENTATION_SCHEMES.includes(scheme)) {
        throw new Error(`Invalid Orientation!\nSelect orientation from these choices ${ORIENTATION_SCHEMES}`)
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



/****************************** random traverse 2D array ******************************/
import { $comb } from "./combinatorics.js";
import { getRandIntInRangeIncBounds } from "./numbers.js";

const randomMoves = $comb.permutations([1, 2, 3, 4], 4);
let num = 0;

function fillRandom(arr, x, y) {
    arr[x][y] = num++;
    for (let choice of randomMoves[getRandIntInRangeIncBounds(0, 23)]) {
        switch (choice) {
            case 1:
                if (x + 1 < height && arr[x + 1][y] == 0) {
                    fillRandom(arr, x + 1, y);
                } break;
            case 2:
                if (x - 1 >= 0 && arr[x - 1][y] == 0) {
                    fillRandom(arr, x - 1, y);
                } break;
            case 3:
                if (y + 1 < width && arr[x][y + 1] == 0) {
                    fillRandom(arr, x, y + 1);
                } break;
            case 4:
                if (y - 1 >= 0 && arr[x][y - 1] == 0) {
                    fillRandom(arr, x, y - 1);
                } break;
        }
    }
}

export const randomFill = function (width, height, x = 0, y = 0) {
    let arr = new Array(height).fill(0).map(() => new Array(width).fill(0));
    num = 0;
    fillRandom(arr, x, y);
}