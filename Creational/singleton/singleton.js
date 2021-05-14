var Singleton;
(function (Singleton) {
    class Database {
        constructor() {
            this._query = [];
        }
        static getInstance() {
            if (!this._instance) {
                this._instance = new Database();
            }
            return this._instance;
        }
        printQuery() {
            this._query.forEach((item) => {
                console.log(item);
            });
        }
        pushQuery(sql) {
            this._query.push(sql);
        }
    }
    class App {
        start() {
            const foo = Database.getInstance();
            foo.pushQuery(`Запрос 1`);
            foo.pushQuery(`Запрос 2`);
            const bar = Database.getInstance();
            bar.printQuery();
        }
    }
    new App().start();
})(Singleton || (Singleton = {}));
//# sourceMappingURL=singleton.js.map