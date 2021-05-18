namespace Strategy {
    interface Strategy {
        execute(a: number, b: number): number;
    }

    class ConcreteStrategyAdd implements Strategy {
        public execute(a: number, b: number): number {
            return a + b;
        }
    }

    class ConcreteStrategySubtract implements Strategy {
        public execute(a: number, b: number): number {
            return a - b;
        }
    }

    class ConcreteStrategyMultiply implements Strategy {
        public execute(a: number, b: number): number {
            return a * b;
        }
    }

    class Context {
        private _strategy: Strategy;

        public set strategy(value: Strategy) {
            this._strategy = value;
        }

        public executeStrategy(a: number, b: number): number {
            return this._strategy.execute(a, b);
        }
    }

    class Application {
        public static main() {
            const context = new Context();

            const a = 10;
            const b = 141;

            context.strategy = new ConcreteStrategyAdd();

            let result = context.executeStrategy(a, b);

            console.log(result);
        }
    }

    Application.main();
}