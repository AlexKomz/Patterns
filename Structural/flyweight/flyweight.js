var Flyweight;
(function (Flyweight) {
    class Forest {
        constructor() {
            this.trees = [];
        }
        plantTree(x, y, name, color, texture) {
            const type = TreeFactory.getTreeType(name, color, texture);
            const tree = new Tree(x, y, type);
            this.trees.push(tree);
        }
        draw(canvas) {
            this.trees.forEach(tree => tree.draw(canvas));
        }
    }
    class Tree {
        constructor(x, y, type) {
            this.x = x;
            this.y = y;
            this.type = type;
        }
        draw(canvas) {
            this.type.draw(canvas, this.x, this.y);
        }
    }
    class TreeFactory {
        static getTreeType(name, color, texture) {
            let type = this.treeTypes.find(item => (item.name === name && item.color === color && item.texture === texture));
            type = type !== null && type !== void 0 ? type : new TreeType(name, color, texture);
            this.treeTypes.push(type);
            return type;
        }
    }
    TreeFactory.treeTypes = [];
    class TreeType {
        constructor(name, color, texture) {
            this.name = name;
            this.color = color;
            this.texture = texture;
        }
        draw(canvas, x, y) {
            canvas.render(this.name, x, y);
        }
    }
    class Canvas {
        render(name, x, y) {
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
})(Flyweight || (Flyweight = {}));
//# sourceMappingURL=flyweight.js.map