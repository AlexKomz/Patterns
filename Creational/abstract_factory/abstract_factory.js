var AbstractFactory;
(function (AbstractFactory) {
    class WinButton {
        Click() {
            console.log(`Клик по кнопке в Windows!`);
        }
    }
    class MacButton {
        Click() {
            console.log(`Клик по кнопке в MacOS!`);
        }
    }
    class WinTextBox {
        Input(text) {
            console.log(`Ввод сообщения '${text}' в текстовое поле Windows!`);
        }
    }
    class MacTextBox {
        Input(text) {
            console.log(`Ввод сообщения '${text}' в текстовое поле MacOS!`);
        }
    }
    class WinFactory {
        createButton() {
            return new WinButton();
        }
        createTextBox() {
            return new WinTextBox();
        }
    }
    class MacFactory {
        createButton() {
            return new MacButton();
        }
        createTextBox() {
            return new MacTextBox();
        }
    }
    class Application {
        constructor(factory) {
            this._factory = factory;
            this.CreateUI();
        }
        CreateUI() {
            this._button = this._factory.createButton();
            this._textBox = this._factory.createTextBox();
        }
        ButtonClick() {
            this._button.Click();
        }
        InputIntoTextBox(text) {
            this._textBox.Input(text);
        }
    }
    let factory = new WinFactory();
    let app = new Application(factory);
    app.ButtonClick();
    app.InputIntoTextBox(`Hellow World!`);
    factory = new MacFactory();
    app = new Application(factory);
    app.ButtonClick();
    app.InputIntoTextBox(`Hellow World!`);
})(AbstractFactory || (AbstractFactory = {}));
//# sourceMappingURL=abstract_factory.js.map