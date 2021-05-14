namespace Flyweight {
    class Forest {
        public trees: Tree[] = [];

        public plantTree(x: number, y: number, name: string, color: string, texture: string): void {
            const type = TreeFactory.getTreeType(name, color, texture);
            const tree = new Tree(x, y, type);

            this.trees.push(tree);
        }

        public draw(canvas: Canvas) {
            this.trees.forEach(tree => tree.draw(canvas));
        }
    }

    class Tree {
        public x: number;
        public y: number;
        public type: TreeType;

        public constructor(x: number, y: number, type: TreeType) {
            this.x = x;
            this.y = y;
            this.type = type;
        }

        public draw(canvas: Canvas): void {
            this.type.draw(canvas, this.x, this.y);
        }
    }

    class TreeFactory {
        private static treeTypes: TreeType[] = [];

        public static getTreeType(name: string, color: string, texture: string) {
            let type: TreeType = this.treeTypes.find(item => (
                item.name === name && item.color === color && item.texture === texture
            ));

            type = type ?? new TreeType(name, color, texture);
            this.treeTypes.push(type);

            return type;
        }
    }

    class TreeType {
        public name: string;
        public color: string;
        public texture: string;

        public constructor(name: string, color: string, texture: string) {
            this.name = name;
            this.color = color;
            this.texture = texture;
        }

        public draw(canvas: Canvas, x: number, y: number): void {
            canvas.render(this.name, x, y);
        }
    }

    class Canvas {
        public render(name: string, x: number, y: number): void {
            console.log(`Дерево '${name}' отрисовано по координатам - (${x}; ${y})`);
        }
    }

    const forest = new Forest();

    forest.plantTree(1, 2, `Пупс`, ``, ``);
    forest.plantTree(13, 5, `Дуб`, ``, ``);
    forest.plantTree(17, 5, `Дуб`, ``, ``);
    forest.plantTree(6, 9, `Ясень`, ``, ``);
    forest.plantTree(66, 6, `Йух`, ``, ``);

    const canvas = new Canvas();

    forest.draw(canvas);
}