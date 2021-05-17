var Memento;
(function (Memento) {
    class BaseCommand {
        constructor(app, editor) {
            this.backup = ``;
            this.app = app;
            this.editor = editor;
        }
    }
    class CopyCommand extends BaseCommand {
        execute() {
            this.app.clipboard = this.editor.getSelection(this.app.cursor.begin, this.app.cursor.end);
            return false;
        }
    }
    class CutCommand extends BaseCommand {
        execute() {
            this.app.clipboard = this.editor.deleteSelection(this.app.cursor.begin, this.app.cursor.end);
            return true;
        }
    }
    class PasteCommand extends BaseCommand {
        execute() {
            this.editor.replaceSelection(this.app.clipboard, this.app.cursor.begin, this.app.cursor.end);
            return true;
        }
    }
    class EditorSnapshot {
        constructor(editor, text) {
            this._editor = editor;
            this._text = text;
        }
        restore() {
            this._editor.text = this._text;
        }
        ;
    }
    class Editor {
        constructor() {
            this._text = ``;
            this._textSize = 0;
        }
        get text() {
            return this._text;
        }
        set text(value) {
            this._text = value;
            this._textSize = value.length;
        }
        getSelection(begin, end) {
            return this.text.substr(begin, end - begin);
        }
        deleteSelection(begin, end) {
            const selected = this.getSelection(begin, end);
            this.text = this.text.slice(0, begin) + this.text.slice(end, this._textSize);
            return selected;
        }
        replaceSelection(text, begin, end) {
            const selected = this.getSelection(begin, end);
            this.text = this.text.slice(0, begin) + text + this.text.slice(end, this._textSize);
            return selected;
        }
        save() {
            return new EditorSnapshot(this, this._text);
        }
    }
    class CommandHistory {
        constructor() {
            this._history = [];
        }
        push(c) {
            this._history.push(c);
        }
        pop() {
            return this._history.pop();
        }
    }
    class Application {
        constructor(history) {
            this.clipboard = ``;
            this.history = history || new CommandHistory();
        }
        get cursor() {
            return this._cursor;
        }
        setCursor(begin, end) {
            this._cursor = {
                begin,
                end
            };
        }
        executeCommand(c) {
            if (!this.isCommand(c))
                return;
            this.history.push(this.activeEditor.save());
            c.execute();
        }
        undo() {
            const state = this.history.pop();
            state === null || state === void 0 ? void 0 : state.restore();
        }
        isCommand(c) {
            return !!c && !!c.execute;
        }
    }
    const app = new Application();
    const editor = new Editor();
    app.activeEditor = editor;
    const copyCommand = new CopyCommand(app, app.activeEditor);
    const cutCommand = new CutCommand(app, app.activeEditor);
    const pasteCommand = new PasteCommand(app, app.activeEditor);
    editor.text = `Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.`;
    console.log(editor.text);
    app.setCursor(0, 10);
    app.executeCommand(copyCommand);
    app.setCursor(10, 10);
    app.executeCommand(pasteCommand);
    console.log(editor.text);
    app.setCursor(10, 50);
    app.executeCommand(cutCommand);
    console.log(editor.text);
    app.undo();
    console.log(editor.text);
    app.undo();
    app.undo();
    app.undo();
    app.undo();
    app.undo();
    console.log(editor.text);
})(Memento || (Memento = {}));
//# sourceMappingURL=memento.js.map