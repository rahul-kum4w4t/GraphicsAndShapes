import { spiralIndexGenerator } from "../../lib/arrayPatterns.js";
import { primeSequenceGenerator } from "../../lib/numbers.js";

let spiralGen;
let primes;
let spiralIndices = [];
let width = 600;
let gridWidth;
let cellWidth = 10;

function setup() {
    gridWidth = Math.floor(width / cellWidth);
    frameRate(120);
    if (gridWidth % 2 == 0) {
        gridWidth -= 1;
    }
    spiralGen = spiralIndexGenerator(gridWidth);
    let primeGen = primeSequenceGenerator(gridWidth * gridWidth);
    primes = [...primeGen];
    createCanvas(gridWidth * cellWidth, gridWidth * cellWidth);
}


function draw() {
    background(0);
    drawSpiralStep();
}

function drawEntireSpiral(){
    spiralGen = spiralIndexGenerator(gridWidth);
    spiralIndices = [...spiralGen];

    let count = 1;
    for (let [x, y] of spiralIndices) {
        if (primes.includes(count)) {
            stroke(255);
            x *= cellWidth;
            y *= cellWidth;
            circle(x + 3, y + 3, 2);
        }
        count++;
    }
    save(`ulam_spiral_${spiralIndices.length}.jpg`);
    noLoop();
}

function drawSpiralStep() {

    let count = 1;
    for (let [x, y] of spiralIndices) {
        if (primes.includes(count)) {
            stroke(255);
            x *= cellWidth;
            y *= cellWidth;
            circle(x + 3, y + 3, 2);
        }
        count++;
    }

    let coord = spiralGen.next();

    if (!coord.done) {
        spiralIndices.push(coord.value);
    }
}

export {
    setup,
    draw
};