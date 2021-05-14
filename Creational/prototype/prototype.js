var Prototype;
(function (Prototype) {
    class Shape {
        constructor(source) {
            if (source) {
                this._x = source._x;
                this._y = source._y;
                this._color = source._color;
            }
        }
        set x(value) { this._x = value; }
        set y(value) { this._y = value; }
        set color(value) { this._color = value; }
    }
    class Rectangle extends Shape {
        constructor(source) {
            super(source);
            if (source) {
                this._width = source._width;
                this._height = source._height;
            }
        }
        set width(value) { this._width = value; }
        set height(value) { this._height = value; }
        Clone() {
            return new Rectangle(this);
        }
    }
    class Circle extends Shape {
        constructor(source) {
            super(source);
            if (source) {
                this._radius = source._radius;
            }
        }
        set radius(value) { this._radius = value; }
        Clone() {
            return new Circle(this);
        }
    }
    class Aplication {
        constructor() {
            this._shapes = [];
            const c = new Circle();
            c.x = 10;
            c.y = 20;
            c.radius = 15;
            this._shapes.push(c);
            const anotherCircle = c.Clone();
            this._shapes.push(anotherCircle);
            const rect = new Rectangle();
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
})(Prototype || (Prototype = {}));
//# sourceMappingURL=prototype.js.map