namespace Iterator {
    interface Iterator<T> {
        current(): T;
        next(): T;
        valid(): boolean;
        rewind(): void;
    }

    interface Prototype {
        clone(): Prototype;
    }

    class DepthСrawlIterator<T> implements Iterator<Node<T>> {
        private _root: Node<T>;
        private _current: Node<T>;
        private _visitedNodesID: number[] = [];

        private _isVisited(node: Node<T>): boolean {
            return this._visitedNodesID.indexOf(node.id) > -1;
        }

        public constructor(root: Node<T>) {
            this._root = root;
            this._current = root;
        }

        public current(): Node<T> {
            return this._current;
        }

        public next(): Node<T> {
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

            if (!!result) this._visitedNodesID.push(result.id);

            return result;
        }

        public valid(): boolean {
            return !!this._current;
        }

        public rewind(): void {
            this._current = this._root;
            this._visitedNodesID = [];
        }
    }

    class Node<T> implements Prototype {
        private _parent: Node<T>;
        private _children: Node<T>[] = [];

        private _value: T;
        private _id: number;

        private _firstChild: Node<T>;
        private _lastChild: Node<T>;

        public constructor(value?: T, id?: number, parent?: Node<T>) {
            this._value = value ?? null;
            this._id = id ?? 0;
            this._parent = parent ?? null;
        }

        public get parent(): Node<T> {
            return this._parent;
        }

        public set parent(p: Node<T>) {
            this._parent = p;
        }

        public get children(): Node<T>[] {
            return this._children;
        }

        public get childrenCount(): number {
            return this._children.length;
        }

        public get hasChildren(): boolean {
            return this._children.length > 0;
        }

        public get value(): T {
            return this._value;
        }

        public set value(value: T) {
            this._value = value;
        }

        public get id(): number {
            return this._id;
        }

        public set id(value: number) {
            this._id = value;
        }

        public get firstChild(): Node<T> {
            return this._firstChild;
        }

        public get lastChild(): Node<T> {
            return this._lastChild;
        }

        public addChild(child: Node<T>) {
            child.parent = this;

            child.id = (this._parent ? this._parent.lastChild.id : 0) + this._children.length + 1;

            if (!this._firstChild) {
                this._firstChild = child;
            }

            this._lastChild = child;

            this._children.push(child);
            return this;
        }

        public clone(value?: T, id?: number, parent?: Node<T>): Node<T> {
            return new Node<T>(value ?? this._value, id ?? 0, parent ?? this._parent);
        }
    }

    class Tree<T> {
        private _root: Node<T>;

        public constructor(root?: Node<T>) {
            this._root = root ?? new Node<T>();
        }

        public get root(): Node<T> {
            return this._root;
        }

        public getIterator(): Iterator<Node<T>> {
            return new DepthСrawlIterator<T>(this._root);
        }
    }

    const root = new Node(0);
    const first = new Node(1);

    root.addChild(first).addChild(first.clone()).addChild(first.clone());
    first.addChild(first.clone());

    const tree = new Tree<number>(root);
    const iterator = tree.getIterator();

    console.log(iterator.current().id);

    do {
        const node = iterator.next();
        if (node) console.log(node.id);
    } while (iterator.valid());

    console.log(iterator.valid());
    iterator.rewind();
    console.log(iterator.valid());
}