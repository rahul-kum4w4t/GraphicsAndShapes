import Segment from "./Segment.js";

export default class RoboArm {

    constructor(noOfSegments, xHand, yHand, segLength = 10) {

        this.segments = [];
        let seg = new Segment(xHand, yHand, segLength, 0);
        this.segments.push(seg);
        for (let i = 0; i < noOfSegments - 1; i++) {
            this.segments.push(new Segment(seg.b.x, seg.b.y, segLength, 0));
        }
    }

    updateArm(x, y) {
        let count = 0;
        for (let seg of this.segments) {
            seg.updateDir(x, y);
            x = seg.b.x;
            y = seg.b.y;
            count++;
        }
    }

    draw() {
        for (let seg of this.segments) {
            seg.draw();
        }
    }
}