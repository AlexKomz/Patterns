namespace FactoryMethod {
    interface IButton {
        Render(): string;
    }

    class WinButton implements IButton {
        Render(): string {
            return `Windows button!`;
        }
    }

    class MacButton implements IButton {
        Render(): string {
            return `MacOS button!`;
        }
    }

    class LinButton implements IButton {
        Render(): string {
            return `Linux button!`;
        }
    }


    abstract class Dialog {
        public abstract CreateButton(): IButton;

        public RenderWindow(): void {
            const okButton: IButton = this.CreateButton();
            console.log(okButton.Render());
            console.log(`I'am rendering..!`);
        }
    }

    class WinDialog extends Dialog {
        CreateButton(): IButton {
            return new WinButton();
        }
    }

    class MacDialog extends Dialog {
        CreateButton(): IButton {
            return new MacButton();
        }
    }

    class LinDialog extends Dialog {
        CreateButton(): IButton {
            return new LinButton();
        }
    }


    let dialog: Dialog = new WinDialog();
    console.log(dialog.CreateButton());
}