import { autobind } from "core-decorators";
import { IInformationCardChildren } from "@components/information-card/";
import { AppContext } from "@context";
import { IResponseUser } from "@interfaces/";
import { observable } from "mobx";
import { Subject } from "rxjs/internal/Subject";
import { Transport } from "@services/transport";
import { get } from "lodash";
import { formatDate } from "@helpers/helpers";
import { EAppPaths } from "@config/EAppPaths";

@autobind
export class ProfileStore {
    private readonly transport = new Transport();
    @observable private _user: IResponseUser = AppContext.getUserStore().user;
    @observable private readonly _onUpdate$ = new Subject<void>();

    private readonly shortUserInfo: IInformationCardChildren[] = [
        {
            title: "Дата регистрации",
            message: formatDate(AppContext.getUserStore().user.created)
        },
        {
            title: "Тип пользователя",
            message: this.getTypeUser(AppContext.getUserStore().user.role)
        },
    ];

    getFormatData(): IInformationCardChildren[] {
        return this.shortUserInfo;
    }

    get onUpdate$(): Subject<void> {
        return this._onUpdate$;
    }

    get user(): IResponseUser {
        return this._user;
    }

    set user(user: IResponseUser) {
        this._user = user;
    }

    getUser(): void {
        const token = AppContext.getUserStore().getToken();
        this.transport.getUser(token).then((response) => {
           const success = get(response.data, "success");
           if (success) {
               this.user =  get(response.data, "data");
               AppContext.getUserStore().user = get(response.data, "data");
           }
        });
    }

    goToCreationArticle(): void {
        AppContext.getHistory().push(EAppPaths.CREATE_ARTICLE);
    }

    goToMyArticles(): void {
        AppContext.getHistory().push(EAppPaths.MY_ARTICLES);
    }

    private getTypeUser(role: string): string {
        let user = "Обычный пользователь";
        switch (role) {
            case "user": {
                user = "Обычный пользователь. Вы сможете прсматривать посты и комментировать их";
                break;
            }
            case "author": {
                user = "Автор. Вы сможете просматривать, добавлять, коментировать, а также редактировать свои посты";
                break;
            }
            case "admin": {
                user = "Админ, Вы царь и бог на этом сайте. Вы есть истина, закон и порядок в одном лице";
                break;
            }
            default: {
                break;
            }
        }
        return user;
    }
}
