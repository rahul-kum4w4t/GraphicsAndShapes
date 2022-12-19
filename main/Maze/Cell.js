import { getRandIntInRangeExcUpBound } from "../../lib/numbers.js";
import { $comb } from "../../lib/combinatorics.js";
import SquareCell from "../Common/SquareCell.js";

const randMoves = $comb.permutations([0, 1, 2, 3], 4);
const COUNTER_INDICES = { 0: 2, 1: 3, 2: 0, 3: 1 };

export default class Cell extends SquareCell {
    constructor(row, col, width) {
        super(row, col, width);
        Object.defineProperties(this, {
            visited: { value: false, writable: true },
            isCurrent: { value: false, writable: true },
            walls: { value: Object.seal(new Array(4).fill(true)) },
            neighbours: { value: Object.seal(new Array(4).fill(null)) },
            possibleMoves: { value: Object.freeze(randMoves[getRandIntInRangeExcUpBound(0, randMoves.length)]) }
        });
    }

    searchNeighbours(grid, gridColCount, gridRowCount) {

        if (this.row - 1 >= 0) {
            this.neighbours[0] = grid[(this.row - 1) * gridColCount + this.col];
        }

        if (this.col + 1 < gridColCount) {
            this.neighbours[1] = grid[this.row * gridColCount + (this.col + 1)];
        }

        if (this.row + 1 < gridRowCount) {
            this.neighbours[2] = grid[(this.row + 1) * gridColCount + this.col];
        }

        if (this.col - 1 >= 0) {
            this.neighbours[3] = grid[this.row * gridColCount + (this.col - 1)];
        }
    }

    moveNext() {
        for (let index of this.possibleMoves) {
            let neigh = this.neighbours[index];
            if (neigh && !neigh.visited) {
                this.visited = true;
                this.isCurrent = false;
                this.walls[index] = false;

                neigh.isCurrent = true;
                neigh.walls[COUNTER_INDICES[index]] = false;

                return neigh;
            }
        }
    }

    current() {
        this.isCurrent = true;
        this.visited = true;
    }

    leave() {
        this.isCurrent = false;
    }

    draw() {

        stroke(255);
        //strokeWeight(2);
        if (this.walls[0]) line(this.posX, this.posY, this.posX + this.width, this.posY);
        if (this.walls[3]) line(this.posX, this.posY, this.posX, this.posY + this.width);
        if (this.walls[1]) line(this.posX + this.width, this.posY, this.posX + this.width, this.posY + this.width);
        if (this.walls[2]) line(this.posX, this.posY + this.width, this.posX + this.width, this.posY + this.width);

        if (this.isCurrent) {
            noStroke();
            fill(0, 150, 0);
            rect(this.posX, this.posY, this.width, this.width);
        } else if (this.visited) {
            noStroke();
            fill(50);
            rect(this.posX, this.posY, this.width, this.width);
        }
    }
}