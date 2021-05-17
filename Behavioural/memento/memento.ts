namespace Memento {
    // ! Модифицировал пример из питтерна "Команда" для восстановления из снимка

    interface ICommand {
        // undo(): void;
        execute(): boolean;
    }

    abstract class BaseCommand implements ICommand {
        protected app: Application;
        protected editor: Editor;

        protected backup: string = ``;

        public constructor(app: Application, editor: Editor) {
            this.app = app;
            this.editor = editor;
        }

        // public saveBackup() {
        //     this.backup = this.editor.text;
        // }

        // public undo() {
        //     editor.text = this.backup;
        // }

        public abstract execute(): boolean;
    }

    class CopyCommand extends BaseCommand {
        execute() {
            this.app.clipboard = this.editor.getSelection(this.app.cursor.begin, this.app.cursor.end);

            return false;
        }
    }

    class CutCommand extends BaseCommand {
        execute() {
            // this.saveBackup();
            this.app.clipboard = this.editor.deleteSelection(this.app.cursor.begin, this.app.cursor.end);

            return true;
        }
    }

    class PasteCommand extends BaseCommand {
        execute() {
            // this.saveBackup();
            this.editor.replaceSelection(this.app.clipboard, this.app.cursor.begin, this.app.cursor.end);

            return true;
        }
    }

    interface Memento {
        restore(): void;
    }

    class EditorSnapshot implements Memento {
        private _editor: Editor;
        private _text: string;

        public constructor(editor: Editor, text: string) {
            this._editor = editor;
            this._text = text;
        }

        public restore() {
            this._editor.text = this._text;
        };
    }

    interface Originator {
        save(): Memento;
    }

    class Editor implements Originator {
        private _text: string = ``;
        private _textSize: number = 0;

        public get text(): string {
            return this._text;
        }

        public set text(value: string) {
            this._text = value;
            this._textSize = value.length;
        }

        public getSelection(begin: number, end: number) {
            return this.text.substr(begin, end - begin);
        }

        public deleteSelection(begin: number, end: number) {
            const selected = this.getSelection(begin, end);

            this.text = this.text.slice(0, begin) + this.text.slice(end, this._textSize);

            return selected;
        }

        public replaceSelection(text: string, begin: number, end: number) {
            const selected = this.getSelection(begin, end);

            this.text = this.text.slice(0, begin) + text + this.text.slice(end, this._textSize);

            return selected;
        }

        public save() {
            return new EditorSnapshot(this, this._text);
        }
    }

    class CommandHistory {
        private _history: Memento[] = [];

        public push(c: Memento) {
            this._history.push(c);
        }

        public pop() {
            return this._history.pop();
        }
    }

    type Cursor = {
        begin: number,
        end: number
    };

    class Application {
        private _cursor: Cursor;

        public history: CommandHistory;
        public activeEditor: Editor;

        public clipboard: string = ``;

        public constructor(history?: CommandHistory) {
            this.history = history || new CommandHistory();
        }

        public get cursor() {
            return this._cursor
        }

        public setCursor(begin: number, end: number) {
            this._cursor = {
                begin,
                end
            };
        }

        public executeCommand(c: ICommand) {
            if (!this.isCommand(c)) return;

            this.history.push(this.activeEditor.save());
            c.execute();
        }

        public undo() {
            const state = this.history.pop();
            state?.restore();
        }

        private isCommand(c: ICommand): boolean {
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
}