export default class Board {

    constructor(rows, cols, cellWidth, cellHeight) {

        if (!(Number.isInteger(rows) && rows > 0 && Number.isInteger(cols) && cols > 0)) {
            throw new TypeError(`Board rows and cols must be positive integers`);
        }

        if (!(Number.isFinite(cellWidth) && cellWidth > 0 && Number.isFinite(cellHeight) && cellHeight > 0)) {
            throw new TypeError(`Cell width and height provided to 'Board' must be positive numbers`);
        }

        const totalCells = rows * cols;
        Object.defineProperties(this, {
            rows: { value: rows },
            cols: { value: cols },
            totalCells: { value: totalCells },
            cellWidth: { value: cellWidth },
            cellHeight: { value: cellHeight },
            grid: { value: new Array(totalCells).fill(0), writable: true }
        });
    }

    getCellValue(r, c) {
        if (r >= 0 && r < this.rows && c >= 0 && c < this.cols && Array.isArray(this.grid)) {
            return this.grid[r * this.cols + c];
        } else {
            return null;
        }
    }

    setCellValue(r, c, item = null) {
        if (r >= 0 && r < this.rows && c >= 0 && c < this.cols && Array.isArray(this.grid)) {
            this.grid[r * this.cols + c] = item;
        }
    }
}