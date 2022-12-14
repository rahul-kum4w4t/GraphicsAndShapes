
import MazeBoard from "./MazeBoard.js";

let cellWidth = 25;
let width;
let height;
let mazeBoard;

function setup() {
    width = windowWidth;
    height = windowHeight;

    createCanvas(width, height);
    frameRate(30);

    const gridWidth = Math.floor(width / cellWidth);
    const gridHeight = Math.floor(height / cellWidth);

    mazeBoard = new MazeBoard(gridHeight, gridWidth, cellWidth, { seedRandom: true });
}

function draw() {
    background(0);
    //mazeBoard.buildBoard();
    mazeBoard.step();
    mazeBoard.draw();
}

export {
    draw,
    setup
};