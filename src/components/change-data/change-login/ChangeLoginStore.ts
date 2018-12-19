import { autobind } from "core-decorators";
import { IChangeLogin } from "@interfaces/";
import { get } from "lodash";
import { AppContext } from "@context";
import { EFormTypes } from "../../../config/EFormTypes";
import { ChangeUserDataStore } from "../../../app/stores/index";
import { observable } from "mobx";
import { IChangeLoginProps } from "@components/change-data/change-login/IChangeLoginProps";

@autobind
export class ChangeLoginStore extends ChangeUserDataStore {
    @observable private _textFieldId = "";
    private readonly props: IChangeLoginProps;

    constructor(props: IChangeLoginProps) {
        super();
        this.props = props;
    }

    get textFieldId(): string {
        return this._textFieldId;
    }

    setTextFieldId(id: string): void {
        this._textFieldId = id;
    }

    changeLogin(): void {
        const data: IChangeLogin = this.getFormValues<IChangeLogin>();
        const login = get(data, "login");
        const token = AppContext.getUserStore().getToken();
        if (this.isFormValid()) {
            this.transport.changeLogin(token, login).then((response) => {
                const success = get(response.data, "success");
                if (!success) {
                    this.getFieldByType(EFormTypes.LOGIN).setIsValid(false);
                    const error = get(response.data, "error");
                    this.setServerError(error);
                } else {
                    this.successChange$.next();
                    this.props.onUpdate$.next();
                    this.resetFields();
                }
            });
        }

    }
}
