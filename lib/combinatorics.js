/*
 * API to compute permutation and combination operations
 * 1). factorial(n <number> ) : m <number>
 * Compute factorial for any number
 * 2). nCr(n <number>, r <number>) : m <number>
 * Compute r combinations outof n numbers
 * 3). nPr(n <number>, r <number>) : m <number>
 * Compute r permutations outof numbers
 * 4). combinations(arr <array>, r <number>) : comb <array of arrays>
 * Compute all the combinations consist r elements from an array of length n
 * 5). permutations(arr <array>, r <number>, repeatMode <boolean>) : comb <array of arrays>
 * Compute all the permutations consiste r elements from an array of length n
 *
 * @author Rahul Kumawat
 * @date 27-03-2021
 */
export const $comb = (function () {

    const __nCrComb = Symbol("CombinationSet");
    const __nPrComb = Symbol("PermutationSet");
    const __fact = Symbol("factorial");

    const __i = new function () {

        this[__nCrComb] = function (arr, r) {

            if (arr.length == r) { // if n==r
                return [...arr];
            } else if (r == 1) { // if r == 1
                return arr.map(e => [e]);
            } else if (arr.length - r == 1) { // if r = n - 1;
                return arr.map((elem, i) => arr.filter((e, index) => i != index));
            } else { // if r < n-1
                let subArray = arr.slice(1);
                return [...this[__nCrComb](subArray, r), ...this[__nCrComb](subArray, r - 1).map(eachArr => [...eachArr, arr[0]])];
            }
        };

        this[__nPrComb] = function (arr, r, repeatMode = false) {

            if (r == 1) { // if r == 1
                return arr.map(elem => [elem]);
            } else { // if n-1 > r
                const res = [];
                for (let i = 0; i < arr.length; i++) {
                    for (let subArr of this[__nPrComb](
                        repeatMode ? arr : arr.filter((_, index) => index != i),
                        r - 1,
                        repeatMode
                    )) {
                        subArr.push(arr[i]);
                        res.push(subArr);
                    }
                }
                return res;
            }
        };

        this[__fact] = function (n, limit = 1) {

            let result = 1;
            if (typeof (n) == "number" && n > 1) {
                for (let i = n; i > limit; i--) {
                    result *= i;
                }

                if (!isFinite(result)) {
                    result = this[__fact](BigInt(n), 1n);
                }
            } else if (typeof (n) == "bigint" && n > 1n) {
                result = 1n;
                for (let i = n; i > BigInt(limit); i--) {
                    result *= i;
                }
            }
            return result;
        }
    };

    const _pc = {
        /*
         * Calculates the factorial for any number
         * @param n {number} Number for which factorial needs to be calculate
         * @return {number} Returns factorial value
         */
        factorial: function (n) {
            return this[__fact](n, 1);
        },

        /*
         * Calculates the number of possible Combinations (nCr)
         * @param n {number} Total number of elements
         * @param r {number} The number of elements which we need to combine
         * @return {number} Returns combination count
         */
        nCr: function (n = 1, r = 1) {
            if (Number.isInteger(n) && n > 0 && Number.isInteger(r) && r > 0) {
                if (n > r) {
                    let minMax = [r, n - r].sort();
                    let factN = this[__fact](n, minMax[1]);
                    let factDenominator = this[__fact](minMax[0]);

                    if (typeof (factN) == "number" && typeof (factDenominator) == "number" && isFinite(factN) && isFinite(factDenominator)) {
                        return factN / factDenominator;
                    } else {
                        let comb = this[__fact](BigInt(n), BigInt(minMax[1])) / this[__fact](BigInt(minMax[0]));
                        return isFinite(Number(comb)) ? Number(comb) : comb;
                    }
                } else if (n == r) {
                    return 1;
                }
            } else {
                throw new Error("Ist and IInd arguments must be positive integers");
            }
        },

        /*
         * Calculates the number of possible Permutation (nPr)
         * @param n {number} Total number of elements
         * @param r {number} The number of elements which we need to combine
         * @return {number} Returns permutation count
         */
        nPr: function (n, r) {
            if (Number.isInteger(n) && n > 0 && Number.isInteger(r) && r > 0) {
                if (n > r) {
                    return this[__fact](n, n - r);
                } else if (n == r) {
                    return 1;
                }
            } else {
                throw new Error("Ist and IInd arguments must be positive integers");
            }
        },

        /*
         * Get the combinations of "r" number of elements in an array Such that ( array_length >= r )
         * The number of elements are equal to nCr(<array_length>, r)
         * @param arr {Array} Input array
         * @param r {number} The number of elements which we need to combine
         * @return {Array} Return all the "r" elements combinations.
         */
        combinations: function (arr, r = 1) {
            if (Number.isInteger(r) && r > 0 && Array.isArray(arr) && arr.length > 0 && arr.length >= r) {
                return this[__nCrComb](arr, r);
            } else {
                throw new Error("Ist argument must be an array\nIInd argument must be a positive integer");
            }
        },

        /*
         * Get the permutaion of "r" number of elements in an array Such that ( array_length >= r )
         * The number of elements are equal to nPr(<array_length>, r)
         * @param arr {Array} Input array
         * @param r {number} The number of elements which we need to combine
         * @param repeatMode {boolean} whether numbers needs to repeat or not
         * @return {Array} Return all the "r" elements permutation.
         */
        permutations: function (arr, r = 1, repeatMode) {
            if (Number.isInteger(r) && r > 0 && Array.isArray(arr) && arr.length > 0 && arr.length >= r) {
                return this[__nPrComb](arr, r, repeatMode === true);
            } else {
                throw new Error("Ist argument must be an array\nIInd argument must be a positive integer\nThird argument must true/false");
            }
        }
    };

    Object.freeze(__i);
    Object.setPrototypeOf(_pc, __i);
    Object.freeze(_pc);
    return _pc;
})();