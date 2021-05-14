namespace AbstractFactory {
    interface IButton {
        Click(): void;
    }

    class WinButton implements IButton {
        Click(): void {
            console.log(`Клик по кнопке в Windows!`);
        }
    }

    class MacButton implements IButton {
        Click(): void {
            console.log(`Клик по кнопке в MacOS!`);
        }
    }

    interface ITextBox {
        Input(text: string): void;
    }

    class WinTextBox implements ITextBox {
        Input(text: string): void {
            console.log(`Ввод сообщения '${text}' в текстовое поле Windows!`);
        }
    }

    class MacTextBox implements ITextBox {
        Input(text: string): void {
            console.log(`Ввод сообщения '${text}' в текстовое поле MacOS!`);
        }
    }


    interface IGUIFactory {
        createButton(): IButton;
        createTextBox(): ITextBox;
    }

    class WinFactory implements IGUIFactory {
        createButton(): IButton {
            return new WinButton();
        }

        createTextBox(): ITextBox {
            return new WinTextBox();
        }
    }

    class MacFactory implements IGUIFactory {
        createButton(): IButton {
            return new MacButton();
        }

        createTextBox(): ITextBox {
            return new MacTextBox();
        }
    }


    class Application {
        private _factory: IGUIFactory;
        private _button: IButton;
        private _textBox: ITextBox;

        private CreateUI(): void {
            this._button = this._factory.createButton();
            this._textBox = this._factory.createTextBox();
        }

        public constructor(factory: IGUIFactory) {
            this._factory = factory;

            this.CreateUI();
        }

        public ButtonClick(): void {
            this._button.Click();
        }

        public InputIntoTextBox(text: string): void {
            this._textBox.Input(text);
        }
    }


    let factory: IGUIFactory = new WinFactory();
    let app: Application = new Application(factory);

    app.ButtonClick();
    app.InputIntoTextBox(`Hellow World!`);

    factory = new MacFactory();
    app = new Application(factory);

    app.ButtonClick();
    app.InputIntoTextBox(`Hellow World!`);
}