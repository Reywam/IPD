import * as React from "react";
import { observer } from "mobx-react";
import "./SignUp.scss";
import { EmailField } from "@components/email-field";
import { autobind } from "core-decorators";
import { SignUpStore } from "@components/sign-up/SignUpStore";
import { EFormTypes } from "@config/EFormTypes";
import { EPasswordErrors } from "@components/password-field/EPasswordErrors";
import { InputField } from "@components/input-field";
import { PasswordField } from "@components/password-field";
import { Button } from "@components/button";
import { ConfirmationCode } from "@components/confirmation-code/ConfirmationCode";

@observer
@autobind
export class SignUp extends React.Component {
    private readonly store = new SignUpStore();

    onBlurRepeatPassword(): void {
        if (this.store.isPasswordsEquals()) {
            return;
        }
        this.store.getFieldByType(EFormTypes.REPEAT_PASSWORD).setError(EPasswordErrors.PASSWORDS_ARE_NOT_EQUAL);
    }

    render() {
        return(
            <>
                <InputField
                    addField={this.store.addField}
                    formType={EFormTypes.LOGIN}
                    placeholder={"Логин"}
                    isReadonly={false}
                    isRequired={true}
                    isClear={this.store.isClearField}
                    className={"sign-up__content_item"}
                    onBlur={this.store.onBlurLogin}
                    onChange={this.store.onChange}
                />
                <EmailField
                    addField={this.store.addField}
                    formType={EFormTypes.EMAIL}
                    placeholder={"Электронная почта"}
                    isReadonly={false}
                    isRequired={true}
                    isClear={this.store.isClearField}
                    className={"sign-up__content_item"}
                    onBlur={this.store.onBlurEmail}
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
                <PasswordField
                    addField={this.store.addField}
                    formType={EFormTypes.REPEAT_PASSWORD}
                    placeholder={"повторите пароль"}
                    isReadonly={false}
                    isRequired={true}
                    isClear={this.store.isClearField}
                    className={"sign-up__content_item"}
                    onChange={this.store.onChange}
                    onBlur={this.onBlurRepeatPassword}
                />
                <Button title={"Зарегистрироваться"} isDisable={!this.store.isFormValid()} onClick={this.store.register}/>
                {this.store.isPopupShown ?
                    <ConfirmationCode
                        addField={this.store.addField}
                        login={this.store.getFieldByType(EFormTypes.LOGIN).getValue()}
                        title={"Регистрация почти завершена!"}
                        description={`${this.store.getFieldByType(EFormTypes.LOGIN).getValue()}, код подтверждения отправлен на вашу почту <${this.store.getFieldByType(EFormTypes.EMAIL).getValue()}>`}
                        confirmLater={this.store.hidePopup}
                    /> : undefined
                }
            </>
        );
    }
}
