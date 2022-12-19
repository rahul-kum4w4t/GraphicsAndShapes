export default class SquareCell {

    constructor(row, col, width) {

        if (!(Number.isInteger(row) && row >= 0 && Number.isInteger(col) && col >= 0)) {
            throw new TypeError(`Cell must have positive row and col index`);
        }

        if (!(Number.isFinite(width) && width > 0)) {
            throw new TypeError(`Cell width must be positive number`);
        }

        Object.defineProperties(this, {
            row: { value: row },
            col: { value: col },
            width: { value: width },
            posX: { value: col * width },
            posY: { value: row * width }
        });
    }
}