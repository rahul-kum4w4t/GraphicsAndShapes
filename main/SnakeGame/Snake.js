const DIR = {
    UP: 0,
    LEFT: 3,
    DOWN: 2,
    RIGHT: 1
};

export default class Snake {

    constructor(snakeBoard, startRow = 0, startCol = 0) {
        let startCell = snakeBoard.getCellValue(startRow, startCol);
        Object.defineProperties(this, {
            startRow: { value: startRow },
            startCol: { value: startCol },
            head: { value: startCell, writable: true },
            tail: { value: startCell, writable: true },
            direction: { value: DIR.RIGHT, writable: true },
            board: { value: snakeBoard },
            canTurn: { value: true, writable: true },
            length: { value: 1, writable: true }
        });
        startCell.isSnake = true;
    }

    updateDirection(dir) {
        if (Math.abs(this.direction - dir) !== 2) {
            this.direction = dir;
        }
    }

    move() {

        if (this.length == this.board.length) {
            noLoop();
            alert("Congtarulations!!! You Win!");
        }

        let nextCell;
        switch (this.direction) {
            case 0:
                nextCell = this.board.up(this.head);
                break;
            case 1:
                nextCell = this.board.right(this.head);
                break;
            case 2:
                nextCell = this.board.down(this.head);
                break;
            case 3:
                nextCell = this.board.left(this.head);
        }

        if (nextCell.isSnake) {
            noLoop();
            alert("You Loose!");
        } else {

            this.head.front = nextCell;
            nextCell.back = this.head;
            nextCell.front = null;
            nextCell.isSnake = true;
            this.head = nextCell;
            if (!nextCell.isFood) {
                let tailFront = this.tail.front;
                this.tail.isSnake = false;
                this.tail.front = null;
                this.tail.back = null;
                this.tail = tailFront;
            } else {
                nextCell.isFood = false;
                this.board.generateRandomFood();
                this.length++;
            }
            this.canTurn = true;
        }
    }

    turn(keyCode) {
        if (this.canTurn) {
            if (keyCode === LEFT_ARROW) {
                this.updateDirection(DIR.LEFT);
            } else if (keyCode === RIGHT_ARROW) {
                this.updateDirection(DIR.RIGHT);
            } else if (keyCode === UP_ARROW) {
                this.updateDirection(DIR.UP);
            } else if (keyCode === DOWN_ARROW) {
                this.updateDirection(DIR.DOWN);
            }
            this.canTurn = false;
        }
    }
}