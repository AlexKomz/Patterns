namespace Singleton {
    class Database {
        private static _instance: Database;

        public static getInstance(): Database {
            if (!this._instance) {
                this._instance = new Database();
            }

            return this._instance;
        }

        private _query: string[] = [];

        public printQuery(): void {
            this._query.forEach((item) => {
                console.log(item);
            });
        }

        public pushQuery(sql: string): void {
            this._query.push(sql);
        }

        private constructor() { }
    }

    class App {
        public start(): void {
            const foo: Database = Database.getInstance();
            foo.pushQuery(`Запрос 1`);
            foo.pushQuery(`Запрос 2`);

            const bar: Database = Database.getInstance();
            bar.printQuery();
        }
    }

    new App().start();
}