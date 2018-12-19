import * as React from "react";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import "../ChangeData.scss";
import { EFormTypes } from "@config/EFormTypes";
import { ChangePasswordStore } from "./ChangePasswordStore";
import { ChangeContainer } from "@components/change-container";
import { PushNotification } from "@components/push-notification";
import { PasswordField } from "@components/password-field";

@autobind
@observer
export class ChangePassword extends React.Component {
    private readonly store = new ChangePasswordStore();

    componentDidUpdate() {
        this.store.successChange$.subscribe(this.store.showNotification);
    }

    render() {
        return(
            <ChangeContainer
                headerText={"Изменить пароль"}
                buttonText={"Изменить пароль"}
                isFormValid={this.store.isFormValid()}
                onClick={this.store.changePassword}
            >
                <PasswordField
                    addField={this.store.addField}
                    formType={EFormTypes.OLD_PASSWORD}
                    placeholder={"Текущий пароль"}
                    isReadonly={false}
                    isRequired={true}
                    isClear={false}
                    onChange={this.store.onChange}
                    className={"full-width change-item"}
                />
                <PasswordField
                    addField={this.store.addField}
                    formType={EFormTypes.PASSWORD}
                    placeholder={"Новый пароль"}
                    isReadonly={false}
                    isRequired={true}
                    isClear={this.store.isClearField}
                    onChange={this.store.onChange}
                    className={"full-width change-item"}
                />
                <PasswordField
                    addField={this.store.addField}
                    formType={EFormTypes.REPEAT_PASSWORD}
                    placeholder={"Подтверждение нового пароля"}
                    isReadonly={false}
                    isRequired={true}
                    isClear={this.store.isClearField}
                    onChange={this.store.onChange}
                    className={"full-width change-item"}
                />
                <PushNotification
                    title={"Пароль изменен!"}
                    onClick={this.store.hideNotification}
                    isHidden={!this.store.isNotificationShown}
                />
            </ChangeContainer>
        );
    }
}
