import * as React from "react";
import { observer } from "mobx-react";
import "./Login.scss";
import { Button } from "../button";
import { PasswordField } from "../password-field";
import { LoginStore } from "./LoginStore";
import { autobind } from "core-decorators";
import { EmailField } from "@components/email-field";
import { EFormTypes } from "@config/EFormTypes";
import { ConfirmationCode } from "@components/confirmation-code/";
import { PushNotification } from "@components/push-notification";
import { AppContext } from "@context";

@observer
@autobind
export class Login extends React.Component {
    private readonly store = new LoginStore();

    componentDidMount() {
        console.log(this.store.getFields());
        AppContext.getFormStore().isConfirmCodeValid$.subscribe(() => {
            this.store.isPopupShown = false;
        });
    }

    componentDidUpdate() {
        this.store.isValidData = this.store.isValidInputData();
    }

    render() {
        return(
            <>
                <EmailField
                    addField={this.store.addField}
                    formType={EFormTypes.EMAIL}
                    placeholder={"Электронная почта"}
                    isReadonly={false}
                    isRequired={true}
                    isClear={this.store.isClearField}
                    className={"sign-up__content_item"}
                    onChange={this.store.onChange}
                />
                <PasswordField
                    addField={this.store.addField}
                    formType={EFormTypes.PASSWORD}
                    placeholder={"Пароль"}
                    isReadonly={false}
                    isRequired={true}
                    isClear={this.store.isClearField}
                    className={"sign-up__content_item"}
                    onChange={this.store.onChange}
                />
                <Button title={"Войти"} isDisable={!this.store.isFormValid()} onClick={this.store.loginUser}/>
                {this.store.isPopupShown &&
                    <ConfirmationCode
                        addField={this.store.addField}
                        login={this.store.login}
                        title={"Ваш аккаунт не подвержден"}
                        description={`${this.store.login},
                                        код подтврждения вы можете найти на своеей почте ${this.store.getFieldByType(EFormTypes.EMAIL).getValue()} или выслать его заново`}
                        confirmLater={this.store.hidePopup}
                    >
                        <span className={"confirmation-code__footer_text"} onClick={this.store.resendCode}>Отправить новый код</span>
                    </ConfirmationCode>
                }
                <PushNotification
                    title={"Новый код подтверждения успешно выслан!"}
                    onClick={this.store.closeNotification}
                    isHidden={!this.store.isCodeResended}
                />
            </>
        );
    }
}
