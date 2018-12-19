import { observable } from "mobx";
import { autobind } from "core-decorators";
import { isTokenValid } from "@helpers/helpers";
import { IResponseUser } from "@interfaces/";
import { AppContext } from "@context";
import { EAppPaths } from "@config/EAppPaths";
import { Transport } from "@services/transport";
import { get } from "lodash";

@autobind
export class UserStore {
    private static readonly nameToken = "token";
    private readonly transport = new Transport();
    @observable private _isLoggedIn = false;
    @observable private _user: IResponseUser = {
        _id: "",
        login: "",
        email: "",
        avatar: "",
        created: "",
        role: "",
        isBlocked: false,
        isDeleted: false
    };
    @observable private _error = "";

    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    set isLoggedIn(value: boolean) {
        this._isLoggedIn = value;
    }

    @observable private _isDeleted = false;

    get isDeleted(): boolean {
        return this._isDeleted;
    }

    set isDeleted(value: boolean) {
        this._isDeleted = value;
    }

    @observable private _isBlocked = false;

    get isBlocked(): boolean {
        return this._isBlocked;
    }

    set isBlocked(value: boolean) {
        this._isBlocked = value;
    }

    get error(): string {
        return this._error;
    }

    set error(value: string) {
        this._error = value;
    }

    getToken(): string {
        const token = localStorage.getItem(UserStore.nameToken);
        if (!token) {
            return "";
        }
        return token;
    }

    setToken(token: string): void {
        localStorage.setItem(UserStore.nameToken, token);
    }

    getUserId(): string {
        return this._user._id;
    }

    getRole(): string {
        return this._user.role;
    }

    login() {
        const token = this.getToken();
        if (!isTokenValid(token)) {
            this._isLoggedIn = false;
        } else {
            this.transport.getUser(token).then((response) => {
                const success = get(response.data, "success");
                if (success) {
                    const user = get(response.data, "data");
                    const isDeleted = get(user, "isDeleted");
                    const isBlocked = get(user, "isBlocked");
                    if (isDeleted) {
                        this.isDeleted = true;
                        this.isLoggedIn = false;
                        this.error = "deleted";
                        AppContext.getHistory().push(EAppPaths.ERROR);
                    } else if (isBlocked) {
                        this.isBlocked = true;
                        this.isLoggedIn = false;
                        this.error = "blocked";
                        AppContext.getHistory().push(EAppPaths.ERROR);
                    } else {
                        this.user = user;
                        this.isDeleted = false;
                        this.isBlocked = false;
                        this.isLoggedIn = true;
                    }
                }
            });
        }
    }

    logout(): void {
        this.removeToken();
        this.isLoggedIn = false;
        this.resetUser();
        AppContext.getHistory().push(EAppPaths.MAIN);
    }

    get user(): IResponseUser {
        return this._user;
    }

    set user(value: IResponseUser) {
        this._user = value;
    }

    resetUser(): void {
        this.user = {
            _id: "",
            login: "",
            email: "",
            avatar: "",
            created: "",
            role: "",
            isBlocked: false,
            isDeleted: false
        };
    }

    private removeToken(): void {
        localStorage.removeItem(UserStore.nameToken);
    }
}
