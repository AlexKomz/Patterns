namespace Composite {
    interface IGraphic {
        move(x: number, y: number): void;
        draw(): string;
    }

    class Dot implements IGraphic {
        public x: number;
        public y: number;

        public constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        public move(x: number, y: number): void {
            this.x += x;
            this.y += y;
        }

        public draw(): string {
            return `Dot`;
        }
    }

    class Circle extends Dot {
        public radius: number;

        constructor(x: number, y: number, radius: number) {
            super(x, y);
            this.radius = radius;
        }

        public draw(): string {
            return `Circle`;
        }
    }

    class CompoundGraphic {
        private _children: IGraphic[] = [];

        public add(child: IGraphic): void {
            this._children.push(child);
        }

        public remove(child: IGraphic): void {
            this._children = this._children.filter((item) => item != child);
        }

        public move(x: number, y: number): void {
            this._children.forEach((item) => {
                item.move(x, y);
            });
        }

        public draw(): string {
            const result: string[] = [];
            this._children.forEach((item) => {
                result.push(item.draw());
            });
            return `Compound(${result.join(`, `)})`;
        }
    }

    const all: CompoundGraphic = new CompoundGraphic();
    all.add(new Dot(1, 2));
    all.add(new Circle(5, 3, 10));

    let another: CompoundGraphic = new CompoundGraphic();
    another.add(new Circle(1, 1, 11));

    all.add(another);
    another.add(new Dot(1, 1));
    all.add(another);

    console.log(all.draw());
}