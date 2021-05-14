var Builder;
(function (Builder) {
    class Pizza {
        get Dough() {
            return this._dough;
        }
        set Dough(value) {
            this._dough = value;
        }
        get Filling() {
            return this._filling;
        }
        set Filling(value) {
            this._filling = value;
        }
        get HasSides() {
            return this._hasSides;
        }
        set HasSides(value) {
            this._hasSides = value;
        }
        ToString() {
            return (`Состав пиццы:\n` +
                `Тесто: ${this.Dough}\n` +
                `Начинка: ${this.Filling}\n` +
                `${this.HasSides ? `Есть бортики` : `Нет бортиков`}`);
        }
    }
    class PizzaMargoritaBuilder {
        Reset() {
            this._pizza = new Pizza();
        }
        setDough() {
            this._pizza.Dough = `тонкое нежное тесто`;
        }
        setFilling() {
            this._pizza.Filling = `только овощи, никакого мяса`;
        }
        setSides() {
            this._pizza.HasSides = false;
        }
        getResult() {
            return this._pizza;
        }
    }
    class PizzaChikenPukBuilder {
        Reset() {
            this._pizza = new Pizza();
        }
        setDough() {
            this._pizza.Dough = `толстое тесто`;
        }
        setFilling() {
            this._pizza.Filling = `много курочки`;
        }
        setSides() {
            this._pizza.HasSides = true;
        }
        getResult() {
            return this._pizza;
        }
    }
    class Pipe {
        get Dough() {
            return this._dough;
        }
        set Dough(value) {
            this._dough = value;
        }
        get Filling() {
            return this._filling;
        }
        set Filling(value) {
            this._filling = value;
        }
        ToString() {
            return (`Состав пирога:\n` +
                `Тесто: ${this.Dough}\n` +
                `Начинка: ${this.Filling}`);
        }
    }
    class CherryPipeBuilder {
        Reset() {
            this._pipe = new Pipe();
        }
        setDough() {
            this._pipe.Dough = `мягкое и воздушное`;
        }
        setFilling() {
            this._pipe.Filling = `много свежей вишни`;
        }
        setSides() { }
        getResult() {
            return this._pipe;
        }
    }
    class Director {
        MakePizza(builder) {
            builder.Reset();
            builder.setDough();
            builder.setFilling();
            builder.setSides();
        }
    }
    class App {
        MakePizza() {
            const director = new Director();
            const builder = new CherryPipeBuilder();
            director.MakePizza(builder);
            const result = builder.getResult();
            console.log(result.ToString());
        }
    }
    new App().MakePizza();
})(Builder || (Builder = {}));
//# sourceMappingURL=builder.js.map