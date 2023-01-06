import Vector from "./Vector.js";

export default class MobilePoint2D {

    constructor(x = 0, y = 0) {
        Object.defineProperties(this, {
            pos: { value: new Vector(x, y) },
            vel: { value: new Vector() },
            acc: { value: new Vector() }
        });
    }

    move() {
        this.pos.add(this.vel);
    }

    setVelocity(x, y) {
        if (Number.isFinite(x) && Number.isFinite(y)) {
            this.vel.set(x, y);
        }
    }

    setMoveDirection(x, y) {
        let mag = this.vel.mag();
        this.vel.set(x, y);
        this.vel.sub(this.pos);
        this.vel.setMag(mag);
    }
}