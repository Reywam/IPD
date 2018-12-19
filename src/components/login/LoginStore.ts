import { autobind } from "core-decorators";
import { observable } from "mobx";
import { AppContext } from "@context";
import { EFormTypes } from "@config/EFormTypes";
import { IUserDataLogin } from "@interfaces/";
import { FormStore } from "@components/form-store/FormStore";
import { get } from "lodash";
import { EAppPaths } from "@config/EAppPaths";

@autobind
export class LoginStore extends FormStore {
    private static readonly delay = 5200;
    @observable private _login = "";
    @observable private _isCodeResended = false;

    get login(): string {
        return this._login;
    }

    set login(valie: string) {
        this._login = valie;
    }

    get isCodeResended(): boolean {
        return this._isCodeResended;
    }

    set isCodeResended(value: boolean) {
        this._isCodeResended = value;
    }

    isValidInputData(): boolean {
        return this.isEmailValid() && this.isPasswordValid();
    }

    loginUser(): void {
        if (this.isFormValid()) {
            const data: IUserDataLogin = this.getFormValues<IUserDataLogin>();
            this.transport.login(data).then((res) => {
                const success = get(res.data, "success");
                const message = get(res.data, "message");
                if (success) {
                    AppContext.getUserStore().setToken(message);
                    AppContext.getUserStore().login();
                    AppContext.getHistory().push(EAppPaths.PROFILE);
                } else {
                    this.setServerError(message);
                    if (message === "notConfirmed") {
                        const login = get(res.data, "login");
                        this.login = login;
                        this.isPopupShown = true;
                    }
                }
            });
        }
    }

    resendCode(): void {
        const email = this.getFieldByType(EFormTypes.EMAIL).getValue();
        this.transport.resendCode(email).then(() => {
            this._isCodeResended = true;
            window.setTimeout(() => {
                this._isCodeResended = false;
            }, LoginStore.delay);
        });
    }

    closeNotification(): void {
        this._isCodeResended = false;
    }

    hidePopup(): void {
        this.isPopupShown = false;
    }
}
