import Cell from "./Cell.js";
import { getRandIntInRangeExcUpBound } from "../../lib/numbers.js";
import Board from "../Common/Board.js";

export default class SnakeBoard extends Board {

    constructor(rows, cols, cellWidth) {
        super(rows, cols, cellWidth, cellWidth);
        this.reset();
    }

    reset() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.setCellValue(i, j, new Cell(i, j, this.cellWidth));
            }
        }
    }

    up(cell) {
        let upR = cell.row - 1;
        if (upR < 0) {
            upR = this.rows - 1;
        }
        return this.grid[upR * this.cols + cell.col];
    }

    down(cell) {
        let downR = cell.row + 1;
        if (downR >= this.rows) {
            downR = 0;
        }
        return this.grid[downR * this.cols + cell.col];
    }

    left(cell) {
        let leftC = cell.col - 1;
        if (leftC < 0) {
            leftC = this.cols - 1;
        }
        return this.grid[cell.row * this.cols + leftC];
    }

    right(cell) {
        let rightC = cell.col + 1;
        if (rightC >= this.cols) {
            rightC = 0;
        }
        return this.grid[cell.row * this.cols + rightC];
    }

    generateRandomFood() {
        let count = 0;
        let cell = this.grid[getRandIntInRangeExcUpBound(0, this.totalCells)];
        while (cell.isSnake && count < this.totalCells) {
            cell = this.grid[getRandIntInRangeExcUpBound(0, this.totalCells)];
            count++;
        }
        cell.isFood = cell.isSnake ? false : true;
        this.food = cell;
    }
}