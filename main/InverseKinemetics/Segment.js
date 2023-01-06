import Vector from "../Common/Physics/Vector.js";

export default class Segment {

    constructor(x, y, len = 10, theta = 0) {
        let vec = new Vector(x, y);
        Object.defineProperties(this, {
            a: { value: vec },
            len: { value: len },
            b: { value: vec.findVectorAt(len, theta) }
        });
    }

    updateDir(x, y) {
        if (this.a.x != x || this.a.y != y) {
            this.a.set(x, y);
            this.b.sub(this.a);
            this.b.setMag(this.len);
            this.b.add(this.a);
        }
    }

    draw() {
        stroke(50);
        strokeWeight(2);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}