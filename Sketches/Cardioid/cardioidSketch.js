import { numbers } from "../../node_modules/es-utilities/index.js";
let mul = numbers.getRandIntInRangeIncBounds(2, 9);

let totalPoints = 50 * mul;
let circleRadius;

function preload() {
    circleRadius = (windowWidth > windowHeight ? windowHeight / 2 : windowWidth / 2) - 50;
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    drawFigure();
}

function drawFigure() {

    background(0);
    let peripheralVectors = [];

    let part = 2 * Math.PI / totalPoints;
    for (let i = 0; i < totalPoints; i++) {
        let v = p5.Vector.fromAngle(part * i, circleRadius);
        peripheralVectors.push(v);
    }

    stroke('WHITE');
    translate(windowWidth / 2, windowHeight / 2);
    for (let i = 0; i < totalPoints; i++) {
        let toVecIndex = (i * mul) % totalPoints;
        line(
            peripheralVectors[i].x,
            peripheralVectors[i].y,
            peripheralVectors[toVecIndex].x,
            peripheralVectors[toVecIndex].y
        );
    }

    noFill();
    translate(-windowWidth / 2, -windowHeight / 2);
    circle(windowWidth / 2, windowHeight / 2, circleRadius * 2);
    noLoop();
}

export {
    preload,
    draw,
    setup
};