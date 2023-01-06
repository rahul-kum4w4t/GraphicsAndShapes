import { Particle, Attractor } from "./Particle.js";

let particles = [];
let attractors = [];

function setup() {
    createCanvas(400, 400);
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(random(10, width - 10), random(10, height - 20)));
    }
}

function draw() {
    background(0);
    
    attractors.forEach(att => att.draw());

    particles.forEach(part => {
        if (attractors.length > 0) {
            part.attract(...attractors);
            part.update();
        }
        part.draw();
    });
}

function mousePressed() {
    attractors.push(new Attractor(mouseX, mouseY, 5E10));
}

export {
    setup, draw, mousePressed
}