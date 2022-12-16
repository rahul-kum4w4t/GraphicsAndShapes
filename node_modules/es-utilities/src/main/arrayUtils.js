import { getRandIntInRangeExcUpBound } from "./numbers.js";
/**
 * Shuffle all the elements in a array
 * @param {array} arr 
 * @returns array which was supplied for shuffling
 */
function shuffleArray(arr) {

    const arrLength = arr.length;
    for (let i = 0; i < arrLength; i++) {
        let randIndex = getRandIntInRangeExcUpBound(0, arrLength);
        if (randIndex != i) {
            let temp = arr[i];
            arr[i] = arr[randIndex];
            arr[randIndex] = temp;
        }
    }
    return arr;
}

export {
    shuffleArray
};