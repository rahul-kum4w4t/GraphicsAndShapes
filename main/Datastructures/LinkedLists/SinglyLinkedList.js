import SingleLinkNode from "./SingleLinkNode.js";

export default class SinglylinkedList {

    constructor() {
        Object.defineProperties(this, {
            head: { value: null, writable: true }
        });
    }

    get length() {
        if (this.head) {
            let count = 1;
            let node = this.head;
            while (node.hasNext()) {
                node = node.next;
                count++;
            }
            return count;
        } else {
            return 0;
        }
    }

    get tail() {
        if (this.head) {
            let node = this.head;
            while (node.hasNext()) {
                node = node.next;
            }
            return node;
        } else {
            return null;
        }
    }

    get details() {
        let nodeCount = 0;
        if (this.head) {
            let node = this.head;
            nodeCount = 1;
            while (node.hasNext()) {
                node = node.next;
                nodeCount++;
            }
            return { nodeCount, head: this.head, tail: node };
        } else {
            return { nodeCount, head: null, tail: null };
        }
    }

    append(node) {
        if (node instanceof SingleLinkNode) {
            if (this.head === null) {
                this.head = node;
            } else {
                let n = this.head;
                while (n.hasNext()) {
                    n = n.next;
                }
                n.next = node;
            }
        }
        return this;
    }

    appendData(data) {
        return this.append(new SingleLinkNode(data, null));
    }

    addDataAt(data, position) {
        if (position == 0) {
            let node = new SingleLinkNode(data, this.head);
            this.head = node;
            return true;
        } else if (this.head) {
            let count = 1;
            let node = this.head;
            while (node.hasNext() && count < position) {
                count++;
                node = node.next;
            }

            if (node && count == position) {
                let newNode = new SingleLinkNode(data, node.next);
                node.next = newNode;
                this.length++;
                return true;
            } else {
                return false;
            }
        }
    }

    addDataAfter(data, node) {
        let n = this.head;
        while (n !== node) {
            n = n.next;
        }
        if (n == node) {
            let newNode = new SingleLinkNode(data, n.next);
            n.next = newNode;
            return true;
        } else {
            return false;
        }
    }

    addDataBefore(data, node) {
        let n = this.head;
        let prev = null;
        while (n !== node) {
            prev = n;
            n = n.next;
        }
        if (n === node) {
            let newNode = new SingleLinkNode(data, n);
            if (prev) { prev.next = newNode; }
            return true;
        } else {
            return false;
        }
    }

    delete(node) {
        let n = this.head;
        let prev = null;
        while (n !== node) {
            prev = n;
            n = n.next;
        }
        if (n === node) {
            if (prev) { prev.next = n.next; }
            n.next = null;
            return true;
        } else {
            return false;
        }
    }

    get(position) {
        let count = 0;
        for (let n of this) {
            if (count == position) {
                return n;
            }
            count++;
        }
        return null;
    }

    getData(position) {
        let node = this.get(position);
        return node ? node.data : null;
    }

    intersects(other) {
        if (other instanceof SinglylinkedList) {
            let thisTail = this.tail;
            let otherTail = other.tail;
            return thisTail && otherTail && (thisTail === otherTail);
        }
        return false;
    }

    isCircular() {
        let startNode = this.head;

        if (startNode === null || startNode.next === null) {
            return false;
        }

        let slow = startNode;
        let fast = startNode.next;

        while (slow && fast && slow !== fast) {
            slow = slow.next;
            fast = fast.next ? fast.next.next : null;
        }

        return slow === fast;
    }

    findIntersectNode(other) {

        if (other instanceof SinglylinkedList) {
            let fStartNode = this.head;
            let sStartNode = other.head;
            if (fStartNode && sStartNode) {
                let { nodeCount: fCount, tail: fTail } = this.details;
                let { nodeCount: sCount, tail: sTail } = other.details;

                if (fTail === sTail) { // Intersect present
                    let diff = Math.abs(fCount - sCount);

                    if (fCount > sCount) {
                        for (let i = 0; i < diff; i++) fStartNode = fStartNode.next;
                    } else {
                        for (let i = 0; i < diff; i++) sStartNode = sStartNode.next;
                    }

                    while (fStartNode !== sStartNode) {
                        fStartNode = fStartNode.next;
                        sStartNode = sStartNode.next;
                    }

                    return fStartNode;
                }
            }
        }
        return null;
    }

    next() {
        if (this._curr) {
            let resp = { done: false, value: this._curr };
            this._curr = this._curr.next;
            return resp;
        } else {
            return { done: true };
        }
    }

    data() {
        return {
            _curr: this.head,
            tail: this.tail,
            next() {
                if (this._curr) {
                    let resp = { done: false, value: this._curr.data };
                    this._curr = this._curr.next;
                    return resp;
                } else {
                    return { done: true };
                }
            },
            [Symbol.iterator]() {
                return this;
            }
        };
    }

    [Symbol.iterator]() {
        this._curr = this.head;
        return this;
    }
}

/*let graphs = [
    "a > b > c > d > e > f > g > h",
    "i > j > k > l > b",
    "m > n > g"
];

const nodesMap = {};

for (let i = 0; i < graphs.length; i++) {
    let nodes = graphs[i].split(/ > /);

    for (let j = 0; j < (nodes.length - 1); j++) {
        let f = nodes[j];
        let s = nodes[j + 1];
        if (nodesMap.hasOwnProperty(f)) {
            if (nodesMap.hasOwnProperty(s)) {
                if (nodesMap[f].next == null) {
                    nodesMap[f].next = nodesMap[s];
                } else {
                    throw new Error("Error");
                }
            } else {
                nodesMap[s] = new Node(s, null);
                nodesMap[f].next = nodesMap[s];
            }
        } else {
            if (!nodesMap.hasOwnProperty(s)) {
                nodesMap[s] = new Node(s, null);
            }
            nodesMap[f] = new Node(f, nodesMap[s]);
        }
    }

    detectIntersect(nodesMap.a, nodesMap.b);
}*/

/*
function detectCycle(startNode) {

    if (startNode == null && startNode.next == null) {
        return false;
    }

    let slow = startNode;
    let fast = startNode.next;

    while (slow && fast && slow !== fast) {
        slow = slow.next;
        fast = fast.next ? fast.next.next : null;
    }

    return slow === fast;
}

function details(startNode) {

    let head = startNode;
    let tail = startNode;
    let nodeCount = 0;
    if (startNode) {
        nodeCount++;
        while (startNode.next) {
            nodeCount++;
            startNode = startNode.next;
        }
        tail = startNode;
    }
    return { head, tail, nodeCount };
}

function detectIntersect(fStartNode, sStartNode) {

    if (fStartNode && sStartNode) {
        return details(fStartNode).tail === details(sStartNode).tail;
    } else {
        return false;
    }
}

function findIntersectNode(fStartNode, sStartNode) {

    if (fStartNode && sStartNode) {
        let { nodeCount: fCount, tail: fTail } = details(fStartNode);
        let { nodeCount: sCount, tail: sTail } = details(sStartNode);

        if (fTail === sTail) { // Intersect present
            let diff = Math.abs(fCount - sCount);

            if (fCount > sCount) {
                for (let i = 0; i < diff; i++) fStartNode = fStartNode.next;
            } else {
                for (let i = 0; i < diff; i++) sStartNode = sStartNode.next;
            }

            while (fStartNode !== sStartNode) {
                fStartNode = fStartNode.next;
                sStartNode = sStartNode.next;
            }

            return fStartNode;
        }
    }
    return null;
}*/

(function () {

    let s = new SinglylinkedList();
    let s1 = new SinglylinkedList();

    for (let ch of "abcdefgh") {
        s.appendData(ch);
    }
    console.log(s.length);
    for (let ch of "ABCD") {
        s1.appendData(ch);
    }

    for (let ch of s.data()) {
        console.log(ch.toString());
    }

    for (let ch of s1) {
        console.log(ch.toString());
    }

    let node = s.get(3);
    s1.append(node);
    for (let ch of s1) {
        console.log(ch.toString());
    }
    console.log(s.intersects(s1));
    //s.append(node);

    s1.appendData('Z');
    console.log(s.isCircular());
    /*for (let ch of s1.data()) {
        console.log(ch.toString());
    }*/
    //console.log(s.intersects(s1));
})();