export default class SingleLinkNode {
    constructor(data, link = null) {

        if (link instanceof SingleLinkNode || link === null) {
            Object.defineProperties(this, {
                data: { value: data, writable: true },
                next: { value: link, writable: true }
            });
        } else {
            throw new TypeError(`Next Link Node is not valid!`);
        }
    }

    hasNext() {
        return this.next instanceof SingleLinkNode;
    }

    toString() {
        return `${this.constructor.name}: [${this.data}]`;
    }
}