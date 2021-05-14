var Composite;
(function (Composite) {
    class Dot {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        move(x, y) {
            this.x += x;
            this.y += y;
        }
        draw() {
            return `Dot`;
        }
    }
    class Circle extends Dot {
        constructor(x, y, radius) {
            super(x, y);
            this.radius = radius;
        }
        draw() {
            return `Circle`;
        }
    }
    class CompoundGraphic {
        constructor() {
            this._children = [];
        }
        add(child) {
            this._children.push(child);
        }
        remove(child) {
            this._children = this._children.filter((item) => item != child);
        }
        move(x, y) {
            this._children.forEach((item) => {
                item.move(x, y);
            });
        }
        draw() {
            const result = [];
            this._children.forEach((item) => {
                result.push(item.draw());
            });
            return `Compound(${result.join(`, `)})`;
        }
    }
    const all = new CompoundGraphic();
    all.add(new Dot(1, 2));
    all.add(new Circle(5, 3, 10));
    let another = new CompoundGraphic();
    another.add(new Circle(1, 1, 11));
    all.add(another);
    another.add(new Dot(1, 1));
    all.add(another);
    console.log(all.draw());
})(Composite || (Composite = {}));
//# sourceMappingURL=composite.js.map