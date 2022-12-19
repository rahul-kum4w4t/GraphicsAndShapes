import Board from "../Common/Board.js";
import { randomSeriesGenerator } from "../../lib/numbers.js";
import Cell from "./Cell.js";

export default class MineBoard extends Board {

    constructor(rows, cols, cellWidth, minesCount) {
        super(rows, cols, cellWidth, cellWidth);
        Object.defineProperties(this, {
            minesCount: { value: minesCount > 0 && minesCount < this.totalCells ? minesCount : Math.floor(0.1 * this.totalCells), writable: true },
            status: { value: 0, writable: true },
            mineCells: { value: null, writable: true },
            incompleteCount: { value: 0, writable: true }
        });
        this.reset();
    }

    reset() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.setCellValue(i, j, new Cell(i, j, this.cellWidth));
            }
        }

        let randSeries = randomSeriesGenerator(0, this.totalCells - 1);
        this.mineCells = [];
        for (let i = 0; i < this.minesCount; i++) {
            let index = randSeries.next().value;
            this.grid[index].isMine = true;
            this.mineCells.push(this.grid[index]);
        }

        this.incompleteCount = this.totalCells - this.minesCount;
        console.log(this.rows, this.cols, this.totalCells);

        for (let cell of this.grid) {
            cell.countMines(this);
        }
    }

    draw() {
        for (let cell of this.grid) {
            cell.draw();
        }
    }

    mouseClicked(x, y) {
        if (this.status == 0) {
            for (let cell of this.grid) {
                if (cell.clicked(x, y) && !cell.visible) {
                    this.makeCellVisible(cell);
                }
            }
        }

        if (this.status == 0 && this.incompleteCount == 0) {
            setTimeout(() => alert("Congratulations!!! You Won!"), 200);
            this.status = 2;
        }
    }

    makeCellVisible(cell) {
        if (cell.isMine) {
            for (let cell of this.mineCells) {
                if (cell.isMine) {
                    cell.visible = true;
                }
            }
            this.status = 1;
            setTimeout(() => alert("You LOOSE!!!"), 200);
        } else if (!cell.visible) {
            cell.visible = true;
            this.incompleteCount--;
            if (cell.minesNear == 0) {
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if (i == 0 && j == 0) continue;
                        let next = this.getCellValue(cell.row + i, cell.col + j);
                        if (next && !next.isMine) {
                            if (next.minesNear == 0) {
                                this.makeCellVisible(next);
                            } else if (!next.visible) {
                                next.visible = true;
                                this.incompleteCount--;
                            }
                        }
                    }
                }
            }
        }
    }
}