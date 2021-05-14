var Decorato;
(function (Decorato) {
    class FileDataSource {
        constructor(filename) {
            this._filename = ``;
            this._data = ``;
            this._filename = filename;
        }
        writeData(data) {
            this._data = data;
            console.log(`Строка '${data} записана в файл '${this._filename}'`);
        }
        readData() {
            return this._data;
        }
    }
    class DataSourceDecorator {
        constructor(source) {
            this._wrappee = source;
        }
        writeData(data) {
            this._wrappee.writeData(data);
        }
        readData() {
            return this._wrappee.readData();
        }
    }
    class EncryptionDecorator extends DataSourceDecorator {
        constructor(source) {
            super(source);
        }
        _encrypte(data) {
            return data + `_encrypted`;
        }
        _deEncrypte(data) {
            return data.substr(0, data.indexOf(`_encrypted`));
        }
        writeData(data) {
            super.writeData(this._encrypte(data));
        }
        readData() {
            return this._deEncrypte(super.readData());
        }
    }
    class CompressionDecorator extends DataSourceDecorator {
        constructor(source) {
            super(source);
        }
        _compress(data) {
            return data + `_compressed`;
        }
        _deCompress(data) {
            return data.substr(0, data.indexOf(`_compressed`));
        }
        writeData(data) {
            super.writeData(this._compress(data));
        }
        readData() {
            return this._deCompress(super.readData());
        }
    }
    const dataString = `Hellow World!`;
    let source = new FileDataSource(`file.txt`);
    source.writeData(dataString);
    console.log(source.readData() + `\n`);
    source = new CompressionDecorator(source);
    source.writeData(dataString);
    console.log(source.readData() + `\n`);
    source = new EncryptionDecorator(source);
    source.writeData(dataString);
    console.log(source.readData() + `\n`);
})(Decorato || (Decorato = {}));
//# sourceMappingURL=decorator.js.map