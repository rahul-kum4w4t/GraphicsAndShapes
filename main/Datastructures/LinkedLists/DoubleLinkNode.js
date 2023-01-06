import SingleLinkNode from "./SingleLinkNode.js";

export default class DoubleLinkNode extends SingleLinkNode {
    constructor(data, nextNode, prevNode) {
        super(data, nextNode);

        if (prevNode instanceof DoubleLinkNode || prevNode === null) {
            Object.defineProperty(this, 'prev', {
                value: prevNode,
                writable: true
            });
        } else {
            throw new TypeError(`Previous Link Node is not valid!`);
        }
    }
}