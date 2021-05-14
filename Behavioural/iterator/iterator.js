var Iterator;
(function (Iterator) {
    class DepthСrawlIterator {
        constructor(root) {
            this._visitedNodesID = [];
            this._root = root;
            this._current = root;
        }
        _isVisited(node) {
            return this._visitedNodesID.indexOf(node.id) > -1;
        }
        current() {
            return this._current;
        }
        next() {
            let result;
            for (let node of this._current.children) {
                if (!this._isVisited(node)) {
                    result = node;
                    break;
                }
            }
            if (!result) {
                this._current = this._current.parent;
                result = this._current ? this.next() : null;
            }
            this._current = result;
            if (!!result)
                this._visitedNodesID.push(result.id);
            return result;
        }
        valid() {
            return !!this._current;
        }
        rewind() {
            this._current = this._root;
            this._visitedNodesID = [];
        }
    }
    class Node {
        constructor(value, id, parent) {
            this._children = [];
            this._value = value !== null && value !== void 0 ? value : null;
            this._id = id !== null && id !== void 0 ? id : 0;
            this._parent = parent !== null && parent !== void 0 ? parent : null;
        }
        get parent() {
            return this._parent;
        }
        set parent(p) {
            this._parent = p;
        }
        get children() {
            return this._children;
        }
        get childrenCount() {
            return this._children.length;
        }
        get hasChildren() {
            return this._children.length > 0;
        }
        get value() {
            return this._value;
        }
        set value(value) {
            this._value = value;
        }
        get id() {
            return this._id;
        }
        set id(value) {
            this._id = value;
        }
        get firstChild() {
            return this._firstChild;
        }
        get lastChild() {
            return this._lastChild;
        }
        addChild(child) {
            child.parent = this;
            child.id = (this._parent ? this._parent.lastChild.id : 0) + this._children.length + 1;
            if (!this._firstChild) {
                this._firstChild = child;
            }
            this._lastChild = child;
            this._children.push(child);
            return this;
        }
        clone(value, id, parent) {
            return new Node(value !== null && value !== void 0 ? value : this._value, id !== null && id !== void 0 ? id : 0, parent !== null && parent !== void 0 ? parent : this._parent);
        }
    }
    class Tree {
        constructor(root) {
            this._root = root !== null && root !== void 0 ? root : new Node();
        }
        get root() {
            return this._root;
        }
        getIterator() {
            return new DepthСrawlIterator(this._root);
        }
    }
    const root = new Node(0);
    const first = new Node(1);
    root.addChild(first).addChild(first.clone()).addChild(first.clone());
    first.addChild(first.clone());
    const tree = new Tree(root);
    const iterator = tree.getIterator();
    console.log(iterator.current().id);
    do {
        const node = iterator.next();
        if (node)
            console.log(node.id);
    } while (iterator.valid());
    console.log(iterator.valid());
    iterator.rewind();
    console.log(iterator.valid());
})(Iterator || (Iterator = {}));
//# sourceMappingURL=iterator.js.map