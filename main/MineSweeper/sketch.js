import MineBoard from "./MineBoard.js";

let mineBoard;
let cellWidth = 80;
let rows;
let cols;

function setup() {
    cols = floor(windowWidth / cellWidth);
    rows = floor(windowHeight / cellWidth);
    createCanvas(windowWidth, windowHeight);
    mineBoard = new MineBoard(rows, cols, cellWidth);
}

function draw() {
    mineBoard.draw();
}

function mouseClicked() {
    console.log("mouse clicked");
    mineBoard.mouseClicked(mouseX, mouseY);
}

export {
    setup, draw, mouseClicked
};