import { observable } from "mobx";
import { autobind } from "core-decorators";

@autobind
export class RegistrationStore {
    @observable private _isSignUp = false;
    @observable private _isForgotPasswordPopupHidden = true;

    get isSignUp(): boolean {
        return this._isSignUp;
    }

    set isSignUp(value: boolean) {
        this._isSignUp = value;
    }

    get isForgotPasswordPopupHidden(): boolean {
        return this._isForgotPasswordPopupHidden;
    }

    set isForgotPasswordPopupHidden(value: boolean) {
        this._isForgotPasswordPopupHidden = value;
    }

    showForgotPasswordPopup(): void {
        this.isForgotPasswordPopupHidden = !this.isForgotPasswordPopupHidden;
    }
}
