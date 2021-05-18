var Strategy;
(function (Strategy) {
    class ConcreteStrategyAdd {
        execute(a, b) {
            return a + b;
        }
    }
    class ConcreteStrategySubtract {
        execute(a, b) {
            return a - b;
        }
    }
    class ConcreteStrategyMultiply {
        execute(a, b) {
            return a * b;
        }
    }
    class Context {
        set strategy(value) {
            this._strategy = value;
        }
        executeStrategy(a, b) {
            return this._strategy.execute(a, b);
        }
    }
    class Application {
        static main() {
            const context = new Context();
            const a = 10;
            const b = 141;
            context.strategy = new ConcreteStrategyAdd();
            let result = context.executeStrategy(a, b);
            console.log(result);
        }
    }
    Application.main();
})(Strategy || (Strategy = {}));
//# sourceMappingURL=strategy.js.map