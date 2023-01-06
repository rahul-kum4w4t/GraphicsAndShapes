import QuadTree from "./QuadTree.js";
import { Circle, Point } from "../../main/Common/GeometricalShapes/Shapes.js";

let qt;
const points = [];
let circle1;

Point.prototype.update = function (by = 1) {
    this.x += random(-by, by);
    this.y += random(-by, by);
}

function preload() {
    for (let i = 0; i < 2000; i++) {
        points.push(new Point(random(0, windowWidth), random(0, windowHeight)));
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    qt = new QuadTree(0, 0, width, height, 30);
    qt.putPoints(...points);
    qt.draw();
}

function draw() {
    background(0);
    for (let p of points) {
        p.update(1);
    }
    qt.putPoints(...points);
    //qt.draw();
    circle1 = new Circle(mouseX, mouseY, 200);

    let pointsUnderConsideration = qt.pointsUnderBoundry(circle1);
    strokeWeight(5);
    stroke(0, 200, 0);
    for (let p of pointsUnderConsideration) {
        if (circle1.contains(p)) {
            point(p.x, p.y);
        }
    }
}

function mousePressed() {
    console.log(frameRate());
}

export {
    draw, setup, preload, mousePressed
}