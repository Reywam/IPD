import { autobind } from "core-decorators";
import { observable } from "mobx";
import { FormStore } from "@components/form-store";
import { Subject } from "rxjs/internal/Subject";

@autobind
export class TextEditorStore extends FormStore {
    @observable private _textEditor = "";
    @observable private readonly _onUpdate$ = new Subject<void>();

    get textEditor(): string {
        return this._textEditor;
    }

    set textEditor(value: string) {
        this._textEditor = value;
    }

    get onUpdate$(): Subject<void> {
        return this._onUpdate$;
    }

    onChangeTextEditor(text: string): void {
        this._textEditor = text;
    }

    isEditorValid(): boolean {
        return !(this._textEditor === "" || this._textEditor === "<p>&nbsp;</p>");
    }

}
