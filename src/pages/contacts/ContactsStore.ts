import { autobind } from "core-decorators";
import { observable } from "mobx";
import { get } from "lodash";
import { TextEditorStore } from "@pages/text-editor-store";

@autobind
export class ContactsStore extends TextEditorStore {
    @observable private _text = "";

    get text(): string {
        return this._text;
    }

    getInfo(): void {
        this.transport.getContacts().then((response) => {
            const success = get(response.data, "success");
            if (success) {
                const data = get(response.data, "data");
                const text = get(data, "text");
                this._text = text;
            }
        });
    }

    sendEmail(): void {
        if (this.isFormValid() || this.isEditorValid()) {
            const data = this.getFormValues();
            const email = get(data, "email");
            this.transport.sendEmail(email, this.textEditor).then((response) => {
               const success = get(response.data, "success");
               if (!success) {
                   const error = get(response.data, "error");
                   this.setServerError(error);
               } else {
                   this.resetFields();
                   this.textEditor = "";
                   this.isPopupShown = true;
               }
            });
        }
    }
}
