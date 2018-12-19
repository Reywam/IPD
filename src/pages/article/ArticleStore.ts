import { autobind } from "core-decorators";
import { observable } from "mobx";
import { Transport } from "@services/transport";
import { IArticle } from "@interfaces/";
import { get } from "lodash";
import { ICommentItem } from "@components/comment-item/ICommentItem";
import { AppContext } from "@context";

@autobind
export class ArticleStore {
    private readonly transport = new Transport();
    private readonly emptyArticle: IArticle = {
        created: "",
        name: "",
        text: "",
        ownerId: "",
        ownerName: "",
    };

    @observable private _article: IArticle = this.emptyArticle;
    @observable private _articleId = "";
    @observable private _comments: ICommentItem[] = [];

    get article(): IArticle {
        return this._article;
    }

    set article(article: IArticle) {
        this._article = article;
    }

    get articleId(): string {
        return this._articleId;
    }

    set articleId(value: string) {
        this._articleId = value;
    }

    get comments(): ICommentItem[] {
        return this._comments;
    }

    set comment(comments: ICommentItem[]) {
        this._comments = comments;
    }

    getArticle(articleId: string): void {
        this.transport.getArticleById(articleId).then((response) => {
            const success = get(response.data, "success");
            if (success) {
                const data = get(response.data, "data");
                this._article = data;
                console.log(data);
            }
        });
    }

    getComments(articleId: string): void {
        this.transport.getComments(articleId).then((response) => {
           const success = get(response.data, "success");
           if (success) {
               const data = get(response.data, "data");
               this._comments = data;
           }
        });
    }

    isCommentFormShow(): boolean {
        return AppContext.getUserStore().isLoggedIn;
    }
}
