namespace Decorato {
    interface IDataSource {
        writeData(data: string): void;
        readData(): string;
    }

    class FileDataSource implements IDataSource {
        private _filename: string = ``;
        private _data: string = ``;

        public constructor(filename: string) {
            this._filename = filename;
        }

        public writeData(data: string): void {
            this._data = data;
            console.log(`Строка '${data} записана в файл '${this._filename}'`);
        }

        public readData(): string {
            return this._data;
        }
    }

    class DataSourceDecorator implements IDataSource {
        private _wrappee: IDataSource;

        constructor(source: IDataSource) {
            this._wrappee = source;
        }

        public writeData(data: string): void {
            this._wrappee.writeData(data);
        }

        public readData(): string {
            return this._wrappee.readData();
        }
    }

    class EncryptionDecorator extends DataSourceDecorator {
        constructor(source: IDataSource) {
            super(source);
        }

        private _encrypte(data: string): string {
            return data + `_encrypted`;
        }

        private _deEncrypte(data: string): string {
            return data.substr(0, data.indexOf(`_encrypted`));
        }

        public writeData(data: string): void {
            super.writeData(this._encrypte(data));
        }

        public readData(): string {
            return this._deEncrypte(super.readData());
        }
    }

    class CompressionDecorator extends DataSourceDecorator {
        constructor(source: IDataSource) {
            super(source);
        }

        private _compress(data: string): string {
            return data + `_compressed`;
        }

        private _deCompress(data: string): string {
            return data.substr(0, data.indexOf(`_compressed`));
        }

        public writeData(data: string): void {
            super.writeData(this._compress(data));
        }

        public readData(): string {
            return this._deCompress(super.readData());
        }
    }

    const dataString = `Hellow World!`;

    // FileDataSource
    let source: IDataSource = new FileDataSource(`file.txt`);
    source.writeData(dataString);
    console.log(source.readData() + `\n`);

    // CompressionDecorator(FileDataSource)
    source = new CompressionDecorator(source);
    source.writeData(dataString);
    console.log(source.readData() + `\n`);

    // EncryptionDecorator(CompressionDecorator(FileDataSource))
    source = new EncryptionDecorator(source);
    source.writeData(dataString);
    console.log(source.readData() + `\n`);
}