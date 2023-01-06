import RoboArm from "./RoboArm.js";

let arm;

function setup() {
    createCanvas(windowWidth, windowHeight);

    arm = new RoboArm(500, 200, 200, 2);
}

function draw() {
    background(0);
    arm.updateArm(mouseX, mouseY);
    arm.draw();
}

export {
    setup, draw
}