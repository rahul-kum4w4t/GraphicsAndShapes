import { Rectangle } from '../Common/GeometricalShapes/Shapes.js';

export default class QuadTree extends Rectangle {

    constructor(x, y, w, h, capacity = 4) {
        super(x, y, w, h);

        if (Number.isInteger(capacity) && capacity > 0) {
            Object.defineProperties(this, {
                capacity: { value: capacity, writable: true },
                points: { value: [], writable: true },
                quad: { value: [], writable: true }
            });
        } else {
            throw new TypeError(`QuadTree capacity must be positive integer\nProvided: capacity=${capacity}`);
        }
    }

    _split() {
        let childWidth = this.w / 2;
        let childHeight = this.h / 2;

        this.quad.push(
            new QuadTree(this.x, this.y, childWidth, childHeight, this.capacity),
            new QuadTree(this.x + childWidth, this.y, childWidth, childHeight, this.capacity),
            new QuadTree(this.x, this.y + childHeight, childWidth, childHeight, this.capacity),
            new QuadTree(this.x + childWidth, this.y + childHeight, childWidth, childHeight, this.capacity)
        );
    }

    putPoints(...points) {
        let notTaken = [];
        if (Array.isArray(points) && points.length > 0) {
            let inside = [];
            for (let point of points) {
                if (this.contains(point)) {
                    inside.push(point);
                } else {
                    notTaken.push(point);
                }
            }

            if (inside.length > this.capacity) {
                if (this.quad.length == 0) this._split();
                let remaining = inside;
                for (let qt of this.quad) {
                    remaining = qt.putPoints(...remaining);
                    if (remaining.length == 0) break;
                }
            } else if (this.quad.length > 0) {
                this.quad = [];
            }
            this.points = inside;
        }
        return notTaken;
    }

    draw() {
        if (this.quad.length == 4) {
            for (let qt of this.quad) {
                qt.draw();
            }
        } else {
            stroke(255);
            /*strokeWeight(1);
            noFill();
            rectMode(CORNER);
            rect(this.x, this.y, this.w, this.h);*/
            strokeWeight(5);
            for (let p of this.points) {
                point(p.x, p.y);
            }
        }
    }

    pointsUnderBoundry(boundry) {
        let points = [];
        if (this.intersects(boundry)) {
            if (this.quad.length > 0) {
                let partialPoints;
                for (let qt of this.quad) {
                    partialPoints = qt.pointsUnderBoundry(boundry);
                    if (partialPoints.length > 0) {
                        points.push(...partialPoints);
                    }
                }
            } else {
                return this.points;
            }
        }
        return points;
    }
}