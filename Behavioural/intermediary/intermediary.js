var Intermediary;
(function (Intermediary) {
    class Dialog {
        constructor(b, c, r) {
            this.button = b;
            this.button.setMediator(this);
            this.checkBox = c;
            this.checkBox.setMediator(this);
            this.radioBox = r;
            this.radioBox.setMediator(this);
        }
        notify(sender, event) {
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
    class Component {
    }
    class Button extends Component {
        click() {
            console.log(`Button click.`);
            this.dialog.notify(this, `click`);
        }
        setMediator(m) {
            this.dialog = m;
        }
    }
    class CheckBox extends Component {
        constructor() {
            super(...arguments);
            this._checked = false;
        }
        click() {
            console.log(`CheckBox click`);
            this._checked != this._checked;
            this.dialog.notify(this, `click`);
        }
        setMediator(m) {
            this.dialog = m;
        }
    }
    class RadioBox extends Component {
        constructor() {
            super(...arguments);
            this._checked = false;
        }
        click() {
            console.log(`RadioBox click`);
            this._checked != this._checked;
            this.dialog.notify(this, `click`);
        }
        setMediator(m) {
            this.dialog = m;
        }
    }
    const button = new Button();
    const cBox = new CheckBox();
    const rBox = new RadioBox();
    const dialog = new Dialog(button, cBox, rBox);
    button.click();
    cBox.click();
    rBox.click();
})(Intermediary || (Intermediary = {}));
//# sourceMappingURL=intermediary.js.map