import Cell from "./Cell.js";
import { numbers } from "../../node_modules/es-utilities/index.js";
const getRandIntInRangeExcUpBound = numbers.getRandIntInRangeExcUpBound;

export default class MazeBoard {
    constructor(rows, cols, cellWidth, options = {
        startR: 0,
        startC: 0,
        seedRandom: false
    }) {

        Object.defineProperties(this, {
            cols: { value: cols },
            rows: { value: rows },
            cellWidth: { value: cellWidth },
            grid: { value: [] },
            visitedCount: { value: 0, writable: true },
            visitStack: { value: [], writable: true },
            currCell: { value: null, writable: true }
        });

        this.reset(options);
    }

    reset({ startR = 0, startC = 0, seedRandom = false } = {}) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid.push(new Cell(i, j, this.cellWidth));
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