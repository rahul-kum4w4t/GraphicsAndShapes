import SquareCell from "../Common/SquareCell.js";
const mine = String.fromCharCode(0x2620);

export default class Cell extends SquareCell {

    constructor(row, col, width, isMine = false) {
        super(row, col, width);

        Object.defineProperties(this, {
            isMine: { value: isMine, writable: true },
            minesNear: { value: 0, writable: true },
            visible: { value: false, writable: true },
            neighbours: { value: [] }
        });
    }

    countMines(board) {
        let cell;
        let count = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                cell = board.getCellValue(this.row + i, this.col + j);
                if (cell) {
                    this.neighbours.push(cell);
                    if (cell.isMine) count++;
                }
            }
        }
        this.minesNear = count;
    }

    clicked(x, y) {
        if (x > this.posX && x < this.posX + this.width &&
            y > this.posY && y < this.posY + this.width) {
            return true;
        }
    }

    draw() {
        stroke(100);
        if (this.visible) {
            if (this.isMine) {
                fill(255);
                rect(this.posX, this.posY, this.width, this.width);
                fill(10);
                stroke(255, 0, 0);
                textAlign(CENTER, CENTER);
                textSize(this.width * 0.75);
                text(mine, this.posX + this.width / 2, this.posY + this.width / 2);
            } else {
                fill(50);
                rect(this.posX, this.posY, this.width, this.width);
                fill(255);
                stroke(0);
                textAlign(CENTER, CENTER);
                textSize(this.width * 0.5);
                text(this.minesNear, this.posX + this.width / 2, this.posY + this.width / 2);
            }
        } else {
            fill(0);
            rect(this.posX, this.posY, this.width, this.width);
        }
    }
}