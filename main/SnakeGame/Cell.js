import SquareCell from "../Common/SquareCell.js";

export default class Cell extends SquareCell {
    constructor(row, col, width) {
        super(row, col, width);

        Object.defineProperties(this, {
            isSnake: { value: false, writable: true },
            isFood: { value: false, writable: true },
            back: { value: null, writable: true },
            front: { value: null, writable: true }
        });
    }

    draw() {
        if (this.isSnake || this.isFood) {
            fill(255);
            rect(this.posX, this.posY, this.width, this.width);
        }
    }
}