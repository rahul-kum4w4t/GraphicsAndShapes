import { euclidDistSq, euclidDist } from "../../../lib/Geometry.js";

function to2DPolarCoord() {
    return {
        r: this.mag(),
        theta: this.angle()
    };
}

// x neg, y pos then 180 + angle
// x neg and y neg then 180 + angle
// x pos and y neg then 360 + angle
// x pos and y pos then 0 + angle
function angle2D() {
    const [x, y] = this.axies;
    let ratio = 0;
    if (x !== 0) {
        ratio = y / x;
    }
    return Math.atan(ratio) + (x >= 0 ? (y >= 0 ? 0 : Math.PI * 2) : Math.PI);
}

function to3DPolarCoord() {
    const [x, y, z] = this.axies;
    const r = euclidDist(x, y, z);
    const r2 = euclidDist(x, y);
    let ratio1 = 0;
    let ratio2 = 0;

    if (r2 !== 0) {
        ratio1 = x / r2;
    }

    if (r !== 0) {
        ratio2 = z / r;
    }

    return {
        r,
        long: Math.acos(ratio1) * (y < 0 ? -1 : 1),
        lat: Math.acos(ratio2)
    }
}

function to2DCartesianCoord(r, theta) {
    return {
        x: r * Math.cos(theta),
        y: r * Math.sin(theta)
    };
}

function to3DCartesianCoord(r, long, lat) {
    return {
        x: r * sin(lat) * cos(long),
        y: r * sin(lat) * sin(long),
        z: r * cos(lat)
    };
}

function setMag2D(mag) {
    if (Number.isFinite(mag)) {
        let { x, y } = to2DCartesianCoord(mag, this.angle());
        this.axies[0] = x;
        this.axies[1] = y;
    }
}

function setMag3D(mag) {
    if (Number.isFinite(mag)) {
        let polar = this.toPolar();
        polar.r = mag;
        let { x, y, z } = to3DCartesianCoord(polar.r, polar.theta);
        this.axies[0] = x;
        this.axies[1] = y;
        this.axies[2] = z;
    }
}

function findVectorAt(r, theta) {
    if (Number.isFinite(r) && r > 0 && Number.isFinite(theta)) {
        let cart = to2DCartesianCoord(r, theta);
        return Vector.add(this, new Vector(cart.x, cart.y));
    } else {
        return null;
    }
}

export default class Vector {

    constructor(...axies) {
        if (Array.isArray(axies) && axies.length > 1) {
            if (axies.some(elem => !Number.isFinite(elem))) {
                throw new TypeError(`Provided dimensions must be finite numbers and must be more than 1 dimensions!\nProvided: ${axies.join()}`);
            } else {
                Object.defineProperties(this, {
                    axies: { value: [...axies] },
                    dims: { value: axies.length }
                });
            }
        } else {
            Object.defineProperties(this, {
                axies: { value: [0, 0] },
                dims: { value: 2 }
            })
        }

        if (this.dims == 2) {
            Object.defineProperties(this, {
                toPolar: { value: to2DPolarCoord },
                setMag: { value: setMag2D },
                angle: { value: angle2D },
                findVectorAt: { value: findVectorAt }
            });
        } else if (this.dims == 3) {
            Object.defineProperty(this, {
                toPolar: { value: to3DPolarCoord },
                setMag: { value: setMag3D }
            });
        }
    }

    magSq() {
        return euclidDistSq(...this.axies);
    }

    mag() {
        return euclidDist(...this.axies);
    }

    get x() {
        return this.axies[0];
    }

    get y() {
        return this.axies[1];
    }

    get z() {
        return this.axies[2];
    }

    set(...axies) {
        if (Array.isArray(axies) && axies.length == this.dims) {
            for (let i = 0; i < this.dims; i++) {
                this.axies[i] = axies[i];
            }
        }
    }

    dim(index) {
        return this.axies[index];
    }

    add(other) {
        if (other instanceof Vector && this.dims == other.dims) {
            for (let i = 0; i < this.dims; i++) {
                this.axies[i] = this.axies[i] + other.axies[i];
            }
            return this;
        } else {
            throw new TypeError(`Argument must be a vector of equal dimensionality.`);
        }
    }

    sub(other) {
        if (other instanceof Vector && this.dims == other.dims) {
            for (let i = 0; i < this.dims; i++) {
                this.axies[i] = this.axies[i] - other.axies[i];
            }
            return this;
        } else {
            throw new TypeError(`Argument must be a vector of equal dimensionality.`);
        }
    }

    mul(scalar) {
        if (Number.isFinite(scalar)) {
            for (let i = 0; i < this.dims; i++) {
                this.axies[i] = this.axies[i] * scalar;
            }
            return this;
        } else {
            throw new TypeError(`Argument must be a scalar number.`);
        }
    }

    dot(other) {
        if (other instanceof Vector && this.dims == other.dims) {
            for (let i = 0; i < this.dims; i++) {
                this.axies[i] = this.axies[i] * other.axies[i];
            }
            return this;
        } else {
            throw new TypeError(`Argument must be a vector of equal dimensionality.`);
        }
    }

    copy() {
        return new Vector(...this.axies);
    }

    copyFrom(other) {
        if (other instanceof Vector && this.dims == other.dims) {
            for (let i = 0; i < this.dims; i++) {
                this.dims[i] = other.dims[i];
            }
        }
    }

    copyTo(other) {
        if (other instanceof Vector && this.dims == other.dims) {
            for (let i = 0; i < this.dims; i++) {
                other.dims[i] = this.dims[i];
            }
        }
    }

    toString() {
        return `Vector: [${this.axies.join()}]`;
    }

    static add(first, second) {
        if (first instanceof Vector) {
            return first.copy().add(second);
        } else {
            throw new TypeError(`Argument must be a vector of equal dimensionality.`);
        }
    }

    static sub(first, second) {
        if (first instanceof Vector) {
            return first.copy().sub(second);
        } else {
            throw new TypeError(`Argument must be a vector of equal dimensionality.`);
        }
    }

    static mul(vec, scalar) {
        if (vec instanceof Vector) {
            return vec.copy().mul(scalar);
        } else {
            throw new TypeError(`Argument must be a vector of equal dimensionality.`);
        }
    }

    static dot(first, second) {
        if (first instanceof Vector) {
            return first.copy().dot(second);
        } else {
            throw new TypeError(`Argument must be a vector of equal dimensionality.`);
        }
    }
}