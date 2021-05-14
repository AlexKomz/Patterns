namespace Builder {
    class Pizza {
        private _dough: string;
        public get Dough(): string {
            return this._dough;
        }
        public set Dough(value: string) {
            this._dough = value;
        }

        private _filling: string;
        public get Filling(): string {
            return this._filling;
        }
        public set Filling(value: string) {
            this._filling = value;
        }

        private _hasSides: boolean;
        public get HasSides(): boolean {
            return this._hasSides;
        }
        public set HasSides(value: boolean) {
            this._hasSides = value;
        }

        public ToString(): string {
            return (
                `Состав пиццы:\n` +
                `Тесто: ${this.Dough}\n` +
                `Начинка: ${this.Filling}\n` +
                `${this.HasSides ? `Есть бортики` : `Нет бортиков`}`
            );
        }
    }

    interface IBuilder {
        Reset(): void;
        setDough(): void;
        setFilling(): void;
        setSides(): void;
    }

    class PizzaMargoritaBuilder implements IBuilder {
        private _pizza: Pizza;

        public Reset(): void {
            this._pizza = new Pizza();
        }

        public setDough(): void {
            this._pizza.Dough = `тонкое нежное тесто`;
        }

        public setFilling(): void {
            this._pizza.Filling = `только овощи, никакого мяса`;
        }

        public setSides(): void {
            this._pizza.HasSides = false;
        }

        public getResult(): Pizza {
            return this._pizza;
        }
    }

    class PizzaChikenPukBuilder implements IBuilder {
        private _pizza: Pizza;

        public Reset(): void {
            this._pizza = new Pizza();
        }

        public setDough(): void {
            this._pizza.Dough = `толстое тесто`;
        }

        public setFilling(): void {
            this._pizza.Filling = `много курочки`;
        }

        public setSides(): void {
            this._pizza.HasSides = true;
        }

        public getResult(): Pizza {
            return this._pizza;
        }
    }

    class Pipe {
        private _dough: string;
        public get Dough(): string {
            return this._dough;
        }
        public set Dough(value: string) {
            this._dough = value;
        }

        private _filling: string;
        public get Filling(): string {
            return this._filling;
        }
        public set Filling(value: string) {
            this._filling = value;
        }

        public ToString(): string {
            return (
                `Состав пирога:\n` +
                `Тесто: ${this.Dough}\n` +
                `Начинка: ${this.Filling}`
            );
        }
    }

    class CherryPipeBuilder implements IBuilder {
        private _pipe: Pipe;

        public Reset(): void {
            this._pipe = new Pipe();
        }

        public setDough(): void {
            this._pipe.Dough = `мягкое и воздушное`;
        }

        public setFilling(): void {
            this._pipe.Filling = `много свежей вишни`;
        }

        public setSides(): void {}

        public getResult(): Pipe {
            return this._pipe;
        }
    }

    class Director {
        public MakePizza(builder: IBuilder) {
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
}
