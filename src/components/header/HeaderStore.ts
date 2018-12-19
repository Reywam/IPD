import { observable } from "mobx";
import { autobind } from "core-decorators";
import { Subject } from "rxjs/internal/Subject";
import { AppContext } from "@context";
import { EAppPaths } from "@config/EAppPaths";
import { IDropDownItem } from "@components/dropdown-item/IDropDownItem";

@autobind
export class HeaderStore {
    @observable private _isDropdownShown = false;
    @observable private readonly _logoutPopup$ = new Subject<void>();
    @observable private _isLogoutPopupShown = false;

    private readonly itemsList: IDropDownItem[] = [
        {
            text: "Админ панель",
            handler: () => AppContext.getHistory().push(EAppPaths.ADMIN)
        },
        {
            text: "Личный кабинет",
            handler: () => AppContext.getHistory().push(EAppPaths.PROFILE)
        },
        {
            text: "Выход",
            handler: () => AppContext.getHeaderStore().logoutSubject$.next()
        },
    ];

    get isDrowdownShown(): boolean {
        return this._isDropdownShown;
    }

    set isDropdownShown(value: boolean) {
        this._isDropdownShown = value;
    }

    get logoutSubject$(): Subject<void> {
        return this._logoutPopup$;
    }

    get isLogoutPopupShown(): boolean {
        return this._isLogoutPopupShown;
    }

    set isLogoutPopupShown(value: boolean) {
        this._isLogoutPopupShown = value;
    }

    openDropdown(): void {
        this._isDropdownShown = !this._isDropdownShown;
    }

    hidePopup(): void {
        this.isLogoutPopupShown = false;
    }

    showPopup(): void {
        this.isLogoutPopupShown = true;
    }

    logout(): void {
        AppContext.getUserStore().logout();
        this.hidePopup();
    }

    getDropDownItems(): IDropDownItem[] {
        return this.itemsList;
    }
}
