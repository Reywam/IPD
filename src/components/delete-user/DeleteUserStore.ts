import { autobind } from "core-decorators";
import { observable } from "mobx";

@autobind
export class DeleteUserStore {
    @observable private _deletePopupShown = false;

    get deletePopupShown(): boolean {
        return this._deletePopupShown;
    }

    set deletePopupShown(value: boolean) {
        this._deletePopupShown = value;
    }

    switch(): void {
        this.deletePopupShown = !this.deletePopupShown;
    }
}
