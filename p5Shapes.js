let totalPoints = 100;
let mul = 2;
let circleRadius;

function preload() {

    circleRadius = (windowWidth > windowHeight ? windowHeight / 2 : windowWidth / 2) - 50;
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
}

function draw() {
    drawFigure();
}

function drawFigure() {

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
}