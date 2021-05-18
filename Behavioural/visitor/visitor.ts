namespace Visitor {
    interface Visitor {
        visit(d: Dot): void;
        visit(c: Circle): void;
        visit(r: Rectangle): void;
    }

    class XMLExportVisitor implements Visitor {
        visit(d: Dot): void;
        visit(c: Circle): void;
        visit(r: Rectangle): void;
        visit(shape: any) {
            if (shape instanceof Dot) {
                const dot = shape as Dot;
                console.log(
                    `Dot:\n\tid: ${dot.id}\n\tcoords: [${dot.x}, ${dot.y}]`
                );
            } else if (shape instanceof Circle) {
                const circle = shape as Circle;
                console.log(
                    `Circle:\n\tid: ${circle.id}\n\tcoords: [${circle.x}, ${circle.y}]\n\tradius: ${circle.radius}`
                );
            } else if (shape instanceof Rectangle) {
                const rectangle = shape as Rectangle;
                console.log(
                    `Rectangle:\n\tid: ${rectangle.id}\n\tcoords: [${rectangle.x}, ${rectangle.y}]\n\twidth: ${rectangle.width} & heigth: ${rectangle.heigth}`
                );
            }
        }
    }

    interface Shape {
        move(x: number, y: number): void;
        draw(): void;
        accept(v: Visitor): void;
    }

    abstract class BaseShape implements Shape {
        protected _id: number;

        get id() { return this._id; }

        protected _x: number;
        protected _y: number;

        get x() { return this._x; }
        get y() { return this._y; }

        constructor(x: number, y: number) {
            this._id = Math.round(Math.random() * Math.round(Math.random() * 100));

            this._x = x;
            this._y = y;
        }

        move(x: number, y: number): void {
            this._x = x;
            this._y = y;
        }

        abstract draw(): void;
        abstract accept(v: Visitor): void;
    }

    class Dot extends BaseShape {
        constructor(x: number, y: number) {
            super(x, y);
        }

        move(x: number, y: number): void {
            super.move(x, y);
        }

        draw(): void {
            console.log(`Dot was drawn!`);
        }

        accept(v: Visitor): void {
            v.visit(this);
        }
    }

    class Circle extends BaseShape {
        private _radius: number;

        get radius() { return this._radius; }

        constructor(x: number, y: number, radius: number) {
            super(x + radius / 2, y + radius / 2);
            this._radius = radius;
        }

        move(x: number, y: number): void {
            super.move(x + this._radius / 2, y + this._radius / 2);
        }

        draw(): void {
            console.log(`Circle was drawn!`);
        }

        accept(v: Visitor): void {
            v.visit(this);
        }
    }

    class Rectangle extends BaseShape {
        private _width: number;
        private _heigth: number;

        get width() { return this._width; }
        get heigth() { return this._heigth; }

        constructor(x: number, y: number, width: number, heigth: number) {
            super(x, y);
            this._width = width;
            this._heigth = heigth;
        }

        move(x: number, y: number): void {
            super.move(x, y);
        }

        draw(): void {
            console.log(`Rectangle was drawn!`);
        }

        accept(v: Visitor): void {
            v.visit(this);
        }
    }

    class Application {
        public static main(): void {
            const allShapes: Shape[] = [];
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
}