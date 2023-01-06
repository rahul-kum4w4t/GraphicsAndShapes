const G = 5E-11;

export class Particle {

    constructor(x = 0, y = 0, mass = 1) {
        this.m = mass;
        this.pos = createVector(x, y);
        this.vel = createVector(random(-1, 1), random(-1, 1));
        this.acc = createVector();
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    attract(...towards) {

        for (let attractor of towards) {
            let dirVector = p5.Vector.sub(attractor.pos, this.pos);
            let dirVectorMag = dirVector.mag();
            //console.log(`before dirVectorMag: ${dirVectorMag}`);
            dirVectorMag = constrain(dirVectorMag, 2, 400);
            let mag = (G * this.m * attractor.m) / dirVectorMag;
            //console.log(`after dirVectorMag: ${dirVectorMag}`);
            //console.log(`Before: ${mag}`);
            // mag = constrain(mag, 0.0000001, 25);
            //console.log(`After: ${mag}`);
            dirVector.setMag(mag);
            this.acc.add(dirVector);
            //console.log("Attracting");
        }
    }

    draw() {
        stroke(255);
        strokeWeight(3);
        point(this.pos.x, this.pos.y);
    }
}

export class Attractor {

    constructor(x, y, m) {
        this.pos = createVector(x, y);
        this.m = m;
    }

    draw() {
        stroke(0, 200, 0);
        strokeWeight(5);
        point(this.pos.x, this.pos.y);
    }
}