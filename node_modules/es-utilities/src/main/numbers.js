/**
 * Prime number explaination:
 * Consider a natural number N (greater than 1) which exists as a product of two numbers a and b (assume a<=b) that is 
 * N = a * b  where, 1 < a ≤ b < n
 * By multiplying the relation a ≤ b by a, the relation becomes:
 * a^2 ≤ ab     
 * By multiplying the relation a ≤ b by b, the relation becomes: 
 * ab ≤ b^2
 * From the above-mentioned inequalities, the relation becomes: 
 * a^2 ≤ ab ≤ b^2
 * We know that N = a * b, so by replacing a * b with N, the following relation is obtained:
 * a^2 ≤ N ≤ b^2
 * Taking the square root of the equation, considering both a and b as positive numbers, we get:
 * a ≤ sqrt(N) ≤ b
 * So, according to the above relation, it can be concluded that one of the factors of a non-prime number will definitely be less than or equal to sqrt(N).
 */

/**
 * Generates a prime sequence till number n
 * @param {number} n 
 */
function* primeSequenceGenerator(n) {

    if (!isFinite(n) || n < 1) {
        throw new Error("Sequence boundry must be a positive integer");
    }

    // Yield firts prime number
    yield 2;
    // Starts generating further prime numbers
    const primes = [2];
    let num = 3;
    let primeFlag;
    while (primes.length < n) {
        let numSqrt = Math.sqrt(num);
        primeFlag = true;
        for (let k = 0; primeFlag && k < primes.length && numSqrt >= primes[k]; k++) {
            if (num % primes[k] == 0) {
                primeFlag = false;
            }
        }
        if (primeFlag) {
            // Yields further prime numbers
            yield num;
            primes.push(num);
        }
        num++;
    }
}


/**
 * Generates a prime sequence and returns a array of prime numbers
 * @param {number} n 
 * @returns 
 */
function primeSequence(n) {

    if (!isFinite(n) || n < 1) {
        throw new Error("Sequence boundry must be a positive integer");
    }

    const primes = [2];
    let num = 3;
    let primeFlag;
    while (primes.length < n) {
        let numSqrt = Math.sqrt(num);
        primeFlag = true;
        for (let k = 0; primeFlag && k < primes.length && numSqrt >= primes[k]; k++) {
            if (num % primes[k] == 0) {
                primeFlag = false;
            }
        }
        if (primeFlag) {
            primes.push(num);
        }
        num++;
    }
    return primes;
}


/**
 * Checks whether a number is prime number or not
 * @param {number} num 
 * @returns 
 */
function isPrime(num = 1) {

    num = Math.abs(num);

    if (num < 2) {
        return false;
    } else {
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }
}



/**
 * Range based methods
 */

/**
 * Generate a number between a range of numbers
 * @param {number} min 
 * @param {number} max 
 * @returns random number in range
 */
function getRandNumInRange(min, max) {
    if (max < min) {
        [max, min] = [min, max];
    }
    return Math.random() * (max - min) + min;
}

/**
 * Generate a integer between a range of numbers including the lower and upper boundry
 * @param {number} min 
 * @param {number} max 
 * @returns random integer in range
 */
function getRandIntInRangeIncBounds(min, max) {
    if (max < min) {
        [max, min] = [min, max];
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Generate a integer between a range of numbers including upper boundry
 * @param {number} min 
 * @param {number} max 
 * @returns random number in range
 */
function getRandIntInRangeExcUpBound(min, max) {
    if (max < min) {
        [max, min] = [min, max];
    }
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Generate a integer between a range of numbers including the lower boundry
 * @param {number} min 
 * @param {number} max 
 * @returns random number in range
 */
function getRandIntInRangeExcLowBound(min, max) {
    if (max < min) {
        [max, min] = [min, max];
    }
    return Math.ceil(Math.random() * (max - min) + min);
}

/**
 * Map the range of numbers to other range of numbers
 * @param {number} min 
 * @param {number} max 
 * @param {number} newMin 
 * @param {number} newMax 
 * @param {number} point 
 * @returns 
 */
const mapRange = (min = 0, max = 10, newMin = 0, newMax = 1, point = 0) => {

    if (min > max) {
        [min, max] = [max, min];
    }

    if (newMin > newMax) {
        [newMin, newMax] = [newMax, newMin];
    }

    if (point >= min && point < max) {
        return (Math.abs((point - min) / (max - min)) * (newMax - newMin)) + newMin;
    } else {
        throw new RangeError(`${point} is out of range :[${min},${max})`);
    }
}


/**
 * Generates a series of numbers for the provided range, Inclusive of both bounds
 * @param {integer} start 
 * @param {integer} end 
 * @param {integer} step 
 * @returns generator object
 */
function seriesGenerator(start, end, step = 1) {

    if (!(Number.isInteger(start) && Number.isInteger(end))) {
        throw new Error("need start and end as finite integer values");
    }

    if (start <= end) {
        if (!Number.isInteger(step)) {
            step = 1;
        } else if (step < 0) {
            throw new Error("Step size must be greater than 0.");
        }
        return (function* (start, end, step) {
            for (let i = start; i <= end; i += step) yield i;
        })(start, end, step);
    } else {
        if (!Number.isInteger(step)) {
            step = -1;
        } else if (step > 0) {
            throw new Error("Step size must be less than 0.");
        }
        return (function* (start, end, step) {
            for (let i = start; i >= end; i += step) yield i;
        })(start, end, step);
    }
}


/**
 * Generates a infinite series (circular in nature) of numbers for the provided range, Inclusive of both bounds
 * @param {integer} start 
 * @param {integer} end 
 * @param {integer} step 
 * @returns generator object
 */
function circularSeriesGenerator(start, end, step = 1) {

    if (!(Number.isInteger(start) && Number.isInteger(end))) {
        throw new Error("need start and end as finite integer values");
    }

    if (start <= end) {
        if (!Number.isInteger(step)) {
            step = 1;
        } else if (step < 0) {
            throw new Error("Step size must be greater than 0.");
        }
        return (function* (start, end, step) {
            let index = start;
            while (true) {
                yield index;
                index += step;
                if (index > end) {
                    index = start;
                }
            }
        })(start, end, step);
    } else {
        if (!Number.isInteger(step)) {
            step = -1;
        } else if (step > 0) {
            throw new Error("Step size must be less than 0.");
        }
        return (function* (start, end, step) {
            let index = start;
            while (true) {
                yield index;
                index += step;
                if (index < end) {
                    index = start;
                }
            }
        })(start, end, step);
    }
}


/**
 * Generates a random number series for the provided range, Each number gets returned only once, Inclusive of both bounds
 * @param {integer} start 
 * @param {integer} end 
 * @param {integer} step 
 * @returns 
 */
function randomSeriesGenerator(start, end, step = 1) {

    if (!(Number.isInteger(start) && Number.isInteger(end))) {
        throw new Error("need start and end as finite integer values");
    }

    if (start > end) {
        [start, end] = [end, start];
    }

    if (!Number.isInteger(step) || step < 0) {
        throw new Error("Step size must be greater than 0.");
    }

    const seriesGen = seriesGenerator(start, end, step);
    const series = [...seriesGen];
    const seriesLen = series.length;

    for (let i = 0; i < seriesLen; i++) {
        let rand = Math.floor(Math.random() * seriesLen);
        let temp = series[i];
        series[i] = series[rand];
        series[rand] = temp;
    }

    return (function* (series) {
        for (let elem of series) {
            yield elem;
        }
    })(series);
}



// Exports
export {
    mapRange,
    getRandNumInRange,
    getRandIntInRangeIncBounds,
    getRandIntInRangeExcUpBound,
    getRandIntInRangeExcLowBound,
    seriesGenerator,
    circularSeriesGenerator,
    randomSeriesGenerator,
    primeSequenceGenerator,
    primeSequence,
    isPrime
};