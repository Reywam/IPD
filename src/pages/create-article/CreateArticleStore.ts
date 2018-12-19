import { autobind } from "core-decorators";
import { get } from "lodash";
import { AppContext } from "@context";
import { TextEditorStore } from "@pages/text-editor-store";

@autobind
export class CreateArticleStore extends TextEditorStore  {
    uploadArticle(): void {
        if (this.isFormValid()) {
            const data = this.getFormValues();
            const nameArticle: string = get(data, "text");
            const token = AppContext.getUserStore().getToken();
            this.transport.uploadArticle(token, nameArticle.trim(), this.textEditor).then((response) => {
                const success = get(response.data, "success");
                if (!success) {
                    const error = get(response.data, "error");
                    this.setServerError(error);
                } else {
                    this.showNotification();
                    this.resetFields();
                    this.textEditor = "";
                }
            });
        }
    }

    showNotification(): void {
        this.isPopupShown = true;
        window.setTimeout(() => {
            this.isPopupShown = false;
        }, 5000);
    }

    hideNotification(): void {
        this.isPopupShown = false;
    }
}
