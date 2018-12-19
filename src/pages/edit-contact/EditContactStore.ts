import { TextEditorStore } from "@pages/text-editor-store";
import { autobind } from "core-decorators";
import { AppContext } from "@context";
import { get } from "lodash";

@autobind
export class EditContactStore extends TextEditorStore {

    getInfo(): void {
        this.transport.getContacts().then((response) => {
           const success = get(response.data, "success");
           if (success) {
               const data = get(response.data, "data");
               const text = get(data, "text");
               this.textEditor = text;
           }
        });
    }

    upload(): void {
        const token = AppContext.getUserStore().getToken();
        this.transport.uploadContacts(token, this.textEditor)
            .then((response) => {
                const success = get(response.data, "success");
                if (success) {
                    this.onUpdate$.next();
                    this.isPopupShown = true;
                }
            });
    }
}
