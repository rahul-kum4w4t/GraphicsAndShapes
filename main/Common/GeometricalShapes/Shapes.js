/**
 * Shape Point
 */
export class Point {

    constructor(x, y, w = 1) {

        if (Number.isFinite(x) && Number.isFinite(y)) {
            Object.defineProperties(this, {
                x: { value: x, writable: true },
                y: { value: y, writable: true },
                w: { value: w, writable: true }
            });
        } else {
            throw new TypeError(`Shape needs position 'x' and position 'y' to be finite numbers And point width 'w' must be a positive finite number.\nx=${x}, y=${y}, w=${w}`);
        }
    }
}


/**
 * Shape Circle
 */
export class Circle {

    constructor(x, y, r) {
        if (Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(r)) {
            Object.defineProperties(this, {
                x: { value: x },
                y: { value: y },
                r: { value: r }
            });
        } else {
            throw new TypeError(`Shape needs position 'x' and position 'y' to be finite numbers and radius 'r' to be non zero positive numbers.\nx=${x}, y=${y}, r=${r}`);
        }
    }

    area() {
        return Math.PI * Math.pow(this.r, 2);
    }

    perimeter() {
        return 2 * Math.PI * this.r;
    }

    get diameter() {
        return 2 * Math.pow(this.r, 2);
    }

    contains(point) {
        if (Number.isFinite(point.x) && Number.isFinite(point.y)) {
            return ShapeUtils.euclideanDistance(this, point) < this.r;
        } else {
            return false;
        }
    }

    intersects(other) {
        if (other instanceof Circle && other && Number.isFinite(other.x) && Number.isFinite(other.y) && Number.isFinite(other.r)) {
            const eucDist = ShapeUtils.euclideanDistance(this, other);
            return eucDist < (this.r + other.r);
        } else if (other instanceof Rectangle) {
            return ShapeUtils.rectCircleIntersects(other, this);
        }
        return false;
    }
}

/**
 * Shape Rectangle
 */
export class Rectangle {

    constructor(x, y, w, h) {
        if (Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(w) && w > 0 && Number.isFinite(h) && h > 0) {
            Object.defineProperties(this, {
                x: { value: x },
                y: { value: y },
                w: { value: w },
                h: { value: h }
            });
        } else {
            throw new TypeError(`Shape needs position 'x' and position 'y' to be finite numbers and width 'w' and height 'h' to be non zero positive numbers.\nx=${x}, y=${y}, w=${w}, h=${h}`);
        }
    }

    area() {
        return this.w * this.h;
    }

    perimeter() {
        return 2 * (this.w + this.h);
    }

    centroid() {
        return [this.x + this.w / 2, this.y + this.h / 2];
    }

    diagonalLength() {
        return Math.sqrt(Math.pow(this.w, 2) + Math.pow(this.h, 2));
    }

    contains(point) {
        if (Number.isFinite(point.x) && Number.isFinite(point.y)) {
            return point.x >= this.x && point.y >= this.y && point.x <= (this.x + this.w) && point.y <= (this.y + this.h);
        } else {
            return false;
        }
    }

    intersects(other) {

        if (other instanceof Rectangle && other && Number.isFinite(other.x) && Number.isFinite(other.y) && Number.isFinite(other.w) && Number.isFinite(other.h)) {
            let thisXMin = this.x;
            let thisXMax = this.x + this.w;
            let thisYMin = this.y;
            let thisYMax = this.y + this.h;
            let otherXMin = other.x;
            let otherXMax = other.x + other.w;
            let otherYMin = other.y;
            let otherYMax = other.y + other.h;

            return !((thisXMax <= otherXMin) || (thisXMin >= otherXMax) || (thisYMax <= otherYMin) || (thisYMin >= otherYMax));
        } else if (other instanceof Circle) {
            return ShapeUtils.rectCircleIntersects(this, other);
        }
        return false;
    }
}

/**
 * Shape Square
 */
export class Square extends Rectangle {

    constructor(x, y, side) {
        super(x, y, side, side);
    }
}


/**
 * Utility functions for shapes
 */
class ShapeUtils {

    static rectCircleIntersects(rectangle, circle) {

        if (circle instanceof Circle && rectangle instanceof Rectangle) {
            const enCircle = new Circle(...rectangle.centroid(), rectangle.diagonalLength() / 2);
            if (circle.intersects(enCircle)) {
                let rectangleXMin = rectangle.x;
                let rectangleXMax = rectangle.x + rectangle.w;
                let rectangleYMin = rectangle.y;
                let rectangleYMax = rectangle.y + rectangle.h;
                let circleXMin = circle.x - circle.r;
                let circleXMax = circle.x + circle.r;
                let circleYMin = circle.y - circle.r;
                let circleYMax = circle.y + circle.r;

                return !((circleXMax <= rectangleXMin) || (circleXMin >= rectangleXMax) || (circleYMax <= rectangleYMin) || (circleYMin >= rectangleYMax));
            }
        }
        return false;
    }

    static euclideanDistance({ x: x1, y: y1 }, { x: x2, y: y2 }) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }
}