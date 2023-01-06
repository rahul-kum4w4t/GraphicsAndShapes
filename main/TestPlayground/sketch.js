import MobilePoint2D from "../Common/Physics/MobilePoint.js";

let p;
let q;

function setup() {
    createCanvas(400, 400);
    p = new MobilePoint2D(100, 100);
    p.setVelocity(1, 1);
    q = p.pos.findVectorAt(100, Math.PI / 9);
}

function draw() {
    background(0);
    stroke(255);
    circle(p.pos.x, p.pos.y, 5);

    line(p.pos.x, p.pos.y, q.x, q.y);
    stroke(255, 0, 0);
    circle(q.x, q.y, 5);
    p.move();
}

function mousePressed() {
    p.setMoveDirection(mouseX, mouseY);
}

export {
    setup, draw, mousePressed
}