namespace Prototype {
    abstract class Shape {
        private _x: number;
        private _y: number;
        private _color: string;

        public set x(value: number) { this._x = value; }
        public set y(value: number) { this._y = value; }
        public set color(value: string) { this._color = value; }

        public constructor(source?: Shape) {
            if (source) {
                this._x = source._x;
                this._y = source._y;
                this._color = source._color;
            }
        }

        public abstract Clone(): Shape;
    }

    class Rectangle extends Shape {
        private _width: number;
        private _height: number;

        public set width(value: number) { this._width = value; }
        public set height(value: number) { this._height = value; }

        public constructor(source?: Rectangle) {
            super(source);
            if (source) {
                this._width = source._width;
                this._height = source._height;
            }
        }

        public Clone() {
            return new Rectangle(this);
        }
    }

    class Circle extends Shape {
        private _radius: number;

        public set radius(value: number) { this._radius = value; }

        public constructor(source?: Circle) {
            super(source);
            if (source) {
                this._radius = source._radius;
            }
        }

        public Clone() {
            return new Circle(this);
        }
    }

    class Aplication {
        private _shapes: Shape[] = [];

        constructor() {
            const c: Circle = new Circle();

            c.x = 10;
            c.y = 20;
            c.radius = 15;

            this._shapes.push(c);

            const anotherCircle: Circle = c.Clone();

            this._shapes.push(anotherCircle);

            const rect: Rectangle = new Rectangle();

            rect.width = 10;
            rect.height = 20;

            this._shapes.push(rect);
            this._shapes.push(rect.Clone());

            this._shapes.forEach((shape) => {
                console.log(shape);
            });
        }
    }

    new Aplication();
}