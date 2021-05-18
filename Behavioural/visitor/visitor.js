var Visitor;
(function (Visitor) {
    class XMLExportVisitor {
        visit(shape) {
            if (shape instanceof Dot) {
                const dot = shape;
                console.log(`Dot:\n\tid: ${dot.id}\n\tcoords: [${dot.x}, ${dot.y}]`);
            }
            else if (shape instanceof Circle) {
                const circle = shape;
                console.log(`Circle:\n\tid: ${circle.id}\n\tcoords: [${circle.x}, ${circle.y}]\n\tradius: ${circle.radius}`);
            }
            else if (shape instanceof Rectangle) {
                const rectangle = shape;
                console.log(`Rectangle:\n\tid: ${rectangle.id}\n\tcoords: [${rectangle.x}, ${rectangle.y}]\n\twidth: ${rectangle.width} & heigth: ${rectangle.heigth}`);
            }
        }
    }
    class BaseShape {
        constructor(x, y) {
            this._id = Math.round(Math.random() * Math.round(Math.random() * 100));
            this._x = x;
            this._y = y;
        }
        get id() { return this._id; }
        get x() { return this._x; }
        get y() { return this._y; }
        move(x, y) {
            this._x = x;
            this._y = y;
        }
    }
    class Dot extends BaseShape {
        constructor(x, y) {
            super(x, y);
        }
        move(x, y) {
            super.move(x, y);
        }
        draw() {
            console.log(`Dot was drawn!`);
        }
        accept(v) {
            v.visit(this);
        }
    }
    class Circle extends BaseShape {
        constructor(x, y, radius) {
            super(x + radius / 2, y + radius / 2);
            this._radius = radius;
        }
        get radius() { return this._radius; }
        move(x, y) {
            super.move(x + this._radius / 2, y + this._radius / 2);
        }
        draw() {
            console.log(`Circle was drawn!`);
        }
        accept(v) {
            v.visit(this);
        }
    }
    class Rectangle extends BaseShape {
        constructor(x, y, width, heigth) {
            super(x, y);
            this._width = width;
            this._heigth = heigth;
        }
        get width() { return this._width; }
        get heigth() { return this._heigth; }
        move(x, y) {
            super.move(x, y);
        }
        draw() {
            console.log(`Rectangle was drawn!`);
        }
        accept(v) {
            v.visit(this);
        }
    }
    class Application {
        static main() {
            const allShapes = [];
            allShapes.push(new Dot(11, 13));
            allShapes.push(new Circle(21, 23, 50));
            allShapes.push(new Rectangle(31, 43, 25, 35));
            const exVisitor = new XMLExportVisitor();
            for (let shape of allShapes) {
                shape.accept(exVisitor);
            }
        }
    }
    Application.main();
})(Visitor || (Visitor = {}));
//# sourceMappingURL=visitor.js.map