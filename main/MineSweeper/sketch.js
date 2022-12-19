import MineBoard from "./MineBoard.js";

let mineBoard;
let cellWidth = 40;
let rows;
let cols;

function setup() {
    cols = floor(windowHeight / cellWidth);
    rows = floor(windowHeight / cellWidth);
    createCanvas(windowHeight, windowHeight);
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