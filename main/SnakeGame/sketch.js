import SnakeBoard from "./SnakeBoard.js";
import Snake from "./Snake.js";

let width;
let height;
let snakeBoard;
let cellWidth = 15;
let snake;

function setup() {
    width = windowWidth;
    height = windowHeight;
    createCanvas(width, height);

    snakeBoard = new SnakeBoard(Math.floor(height / cellWidth), Math.floor(width / cellWidth), cellWidth);
    snake = new Snake(snakeBoard, 0, 0);
    snakeBoard.generateRandomFood();
    frameRate(4);
}

function draw() {
    background(0);
    snakeBoard.food.draw();
    snake.draw();
    snake.move();
}

function keyPressed() {
    snake.turn(keyCode);
}

export {
    draw,
    setup,
    keyPressed
};