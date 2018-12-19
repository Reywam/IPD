import { autobind } from "core-decorators";
import { FormStore } from "@components/form-store";
import { EFormTypes } from "@config/EFormTypes";
import { IUserDataSignUp } from "@interfaces/";
import { get } from "lodash";

@autobind
export class SignUpStore extends FormStore {

    register(): void {
        if (this.isFormValid()) {
            const data: IUserDataSignUp = this.getFormValues<IUserDataSignUp>();
            this.transport.sendUserData(data).then((response) => {
                const success = get(response.data, "success");
                if (success) {
                    this.isPopupShown = true;
                }
            });
        }
    }

    async onBlurLogin() {
        const login = this.getFieldByType(EFormTypes.LOGIN);
        const response = await this.transport.checkLoginExist(login.getValue());
        const success = get(response.data, "success");
        if (!success) {
            const error = get(response.data, "error");
            this.setServerError(error);
        }
    }

    async onBlurEmail() {
        const email = this.getFieldByType(EFormTypes.EMAIL);
        const response = await this.transport.checkEmailExist(email.getValue());
        const success = get(response.data, "success");
        if (!success) {
            const error = get(response.data, "error");
            this.setServerError(error);
        }
    }

    isPasswordsEquals(): boolean {
        const password = this.getFieldByType(EFormTypes.PASSWORD).getValue();
        const repeatPassword = this.getFieldByType(EFormTypes.REPEAT_PASSWORD).getValue();
        return password === repeatPassword;
    }

}
