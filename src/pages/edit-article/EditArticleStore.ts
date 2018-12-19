import { autobind } from "core-decorators";
import { observable } from "mobx";
import { get } from "lodash";
import { AppContext } from "@context";
import { TextEditorStore } from "@pages/text-editor-store";

@autobind
export class EditArticleStore extends TextEditorStore {
    @observable private _articleName = "";
    @observable private _articleId  = "";

    get articleName(): string {
        return this._articleName;
    }

    set articleName(value: string) {
        this._articleName = value;
    }

    get articleId(): string {
        return this._articleId;
    }

    set articleId(value: string) {
        this._articleId = value;
    }

    getArticle(articleId: string): void {
        this.transport.getArticleById(articleId).then((response) => {
           const success = get(response.data, "success");
           if (success) {
               const data = get(response.data, "data");
               this.textEditor  = get(data, "text");
               this._articleName = get(data, "name");
           }
        });
    }

    editArticle(): void {
        if (this.isFormValid() && this.isEditorValid()) {
            const data = this.getFormValues();
            const nameArticle: string = get(data, "text");
            const token = AppContext.getUserStore().getToken();
            const articleId = this.articleId;
            this.transport.editArticle(token, articleId,  nameArticle.trim(), this.textEditor).then((response) => {
                const success = get(response.data, "success");
                if (!success) {
                    const error = get(response.data, "error");
                    this.setServerError(error);
                } else {
                    this.showNotification();
                    this.onUpdate$.next();
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
