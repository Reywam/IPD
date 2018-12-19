import { autobind } from "core-decorators";
import { IArticlePreview } from "@interfaces/";
import { observable } from "mobx";
import { Transport } from "@services/transport";
import { get, last, parseInt } from "lodash";
import { Subject } from "rxjs/internal/Subject";

@autobind
export class MainStore {
    private readonly transport = new Transport();
    @observable private _articles: IArticlePreview[] = [];
    @observable private _length = 0;
    @observable private readonly _onUpdate$ = new Subject<void>();
    @observable private _currentPage = 0;

    get articles(): IArticlePreview[] {
        return this._articles;
    }

    set articles(articles: IArticlePreview[]) {
        this._articles = articles;
    }

    get length(): number {
        return this._length;
    }

    set length(value: number) {
        this._length = value;
    }

    get onUpdate$(): Subject<void> {
        return this._onUpdate$;
    }

    get currentPage(): number {
        return this._currentPage;
    }

    set currentPage(value: number) {
        this._currentPage = value;
    }

    handler(): void {
        const url = window.location.pathname;
        const pageNumber = this.getPageNumber(url);
        this._currentPage = parseInt(pageNumber, 10);
        this.getArticles(pageNumber);
    }

    private getArticles(pageNumber: string) {
        this.transport.getArticles(pageNumber).then((response) => {
            const success = get(response.data, "success");
            if (success) {
                const data = get(response.data, "data");
                const length = get(response.data, "length");
                this._articles = data;
                this._length = parseInt(length, 10);
            }
        });

    }

    private getPageNumber(url: string): string {
        let pageNumber = "";
        if (url === "/") {
            pageNumber = "1";
        } else {
            const splitted = url.split("/");
            pageNumber = last(splitted)!;
        }
        return pageNumber;
    }
}
