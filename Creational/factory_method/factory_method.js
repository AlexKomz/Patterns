var FactoryMethod;
(function (FactoryMethod) {
    class WinButton {
        Render() {
            return `Windows button!`;
        }
    }
    class MacButton {
        Render() {
            return `MacOS button!`;
        }
    }
    class LinButton {
        Render() {
            return `Linux button!`;
        }
    }
    class Dialog {
        RenderWindow() {
            const okButton = this.CreateButton();
            console.log(okButton.Render());
            console.log(`I'am rendering..!`);
        }
    }
    class WinDialog extends Dialog {
        CreateButton() {
            return new WinButton();
        }
    }
    class MacDialog extends Dialog {
        CreateButton() {
            return new MacButton();
        }
    }
    class LinDialog extends Dialog {
        CreateButton() {
            return new LinButton();
        }
    }
    let dialog = new WinDialog();
    console.log(dialog.CreateButton());
})(FactoryMethod || (FactoryMethod = {}));
//# sourceMappingURL=factory_method.js.map