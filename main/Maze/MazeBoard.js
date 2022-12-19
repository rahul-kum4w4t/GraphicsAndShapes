import Cell from "./Cell.js";
import { getRandIntInRangeExcUpBound } from "../../lib/numbers.js";
import Board from "../Common/Board.js";

export default class MazeBoard extends Board {
    constructor(rows, cols, cellWidth, options = {
        startR: 0,
        startC: 0,
        seedRandom: false
    }) {

        super(rows, cols, cellWidth, cellWidth);
        Object.defineProperties(this, {
            visitedCount: { value: 0, writable: true },
            visitStack: { value: [], writable: true },
            currCell: { value: null, writable: true }
        });

        this.reset(options);
    }

    reset({ startR = 0, startC = 0, seedRandom = false } = {}) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.setCellValue(i, j, new Cell(i, j, this.cellWidth));
            }
        }

        for (let cell of this.grid) {
            cell.searchNeighbours(this.grid, this.cols, this.rows);
        }

        let currIndex = seedRandom ? (getRandIntInRangeExcUpBound(0, this.rows) * this.cols + getRandIntInRangeExcUpBound(0, this.cols)) : (startR * this.cols + startC);
        let curr = this.grid[currIndex];
        this.visitStack.push(curr);
        this.currCell = curr;
        curr.current();
        this.visitedCount = 1;
    }

    buildBoard() {
        while (this.step());
    }

    step() {
        if (this.visitedCount < this.grid.length) {
            let next = this.currCell.moveNext();
            if (next) {
                next.current();
                this.visitStack.push(next);
                this.currCell.leave();
                this.currCell = next;
                this.visitedCount++;
            } else {
                this.currCell.leave();
                this.currCell = this.visitStack.pop();
                this.currCell.current();
            }
            return true;
        } else {
            this.currCell.leave();
            noLoop();
            return false;
        }
    }

    draw() {
        for (let cell of this.grid) {
            cell.draw();
        }
    }
}