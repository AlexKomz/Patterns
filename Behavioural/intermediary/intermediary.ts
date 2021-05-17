namespace Intermediary {
    interface Mediator {
        notify(sender: Component, event: string): void;
    }

    class Dialog implements Mediator {
        private button: Component;
        private checkBox: Component;
        private radioBox: Component;

        public constructor(b: Component, c: Component, r: Component) {
            this.button = b;
            this.button.setMediator(this);
            this.checkBox = c;
            this.checkBox.setMediator(this);
            this.radioBox = r;
            this.radioBox.setMediator(this);
        }

        public notify(sender: Component, event: string) {
            switch (sender) {
                case this.button:
                    console.log(`Button was ${event}ed`);
                    break;
                case this.checkBox:
                    console.log(`CheckBox was ${event}ed`);
                    break;
                case this.radioBox:
                    console.log(`RadioBox was ${event}ed`);
                    break;
            }
        }
    }

    abstract class Component {
        protected dialog: Mediator;

        public abstract click(): void;
        public abstract setMediator(m: Mediator): void;
    }

    class Button extends Component {
        public click() {
            console.log(`Button click.`);
            this.dialog.notify(this, `click`);
        }

        public setMediator(m: Mediator) {
            this.dialog = m;
        }
    }

    class CheckBox extends Component {
        private _checked: boolean = false;

        public click() {
            console.log(`CheckBox click`);
            this._checked != this._checked;
            this.dialog.notify(this, `click`)
        }

        public setMediator(m: Mediator) {
            this.dialog = m;
        }
    }

    class RadioBox extends Component {
        private _checked: boolean = false;

        public click() {
            console.log(`RadioBox click`);
            this._checked != this._checked;
            this.dialog.notify(this, `click`)
        }

        public setMediator(m: Mediator) {
            this.dialog = m;
        }
    }

    const button = new Button();
    const cBox = new CheckBox();
    const rBox = new RadioBox();

    const dialog = new Dialog(button, cBox, rBox);

    button.click()
    cBox.click();
    rBox.click();
}