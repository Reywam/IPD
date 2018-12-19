import { autobind } from "core-decorators";
import { Transport } from "@services/transport";
import { AppContext } from "@context";
import { observable } from "mobx";
import { IMyArticle } from "@components/my-article-item";
import { get } from "lodash";
import { Subject } from "rxjs/internal/Subject";

@autobind
export class MyArticleStore {
    @observable private _articles: IMyArticle[] = [];
    @observable private readonly _onUpdate$ = new Subject<void>();
    @observable private _isPopupShown = false;
    @observable private _articleId = "";
    private readonly transport = new Transport();

    getArticles(): void {
        const token = AppContext.getUserStore().getToken();
        this.transport.getMyArticles(token).then((response) => {
            const success = get(response.data, "success");
            if (success) {
                this._articles = get(response.data, "data");
            }
        });
    }

    deleteArticle(): void {
        const token = AppContext.getUserStore().getToken();
        const articleId = this._articleId;
        this.transport.deleteArticle(token, articleId).then((response) => {
           const success = get(response.data, "success");
           if (success) {
               this._isPopupShown = false;
               this._onUpdate$.next();
           }
        });
    }

    goToEditPage(articleId: string): void {
        AppContext.getHistory().push(`/edit-article/${articleId}`);
    }

    showPopup(articleId: string): void {
        this._articleId = articleId;
        this._isPopupShown = true;
    }

    hidePopup(): void {
        this._isPopupShown = false;
    }

    get articles(): IMyArticle[] {
        return this._articles;
    }

    set articles(articles: IMyArticle[]) {
        this._articles = articles;
    }

    get onUpdate$(): Subject<void> {
        return this._onUpdate$;
    }

    get isPopupShown(): boolean {
        return this._isPopupShown;
    }

    set isPopupShown(value: boolean) {
        this._isPopupShown = value;
    }

    get articleId(): string {
        return this._articleId;
    }

    set articleId(value: string) {
        this._articleId = value;
    }

}
