import * as React from "react";
import { MainContainer } from "../../components/main-container";
import { SignUp } from "../../components/sign-up/SignUp";
import { AuthContainer } from "../../components/auth-container/AuthContainer";
import { observer } from "mobx-react";
import "./Registration.scss";
import { RegistrationStore } from "./RegistrationStore";
import { autobind } from "core-decorators";
import { Login } from "../../components/login/Login";
import { AppContext } from "../../context/AppContext";
import { ForgotPasswordPopup } from "@components/popups/forgot-password-popup";

@observer
@autobind
export class Registration extends React.Component {
    private readonly store = new RegistrationStore();

    componentDidUpdate(): void {
        AppContext.getFormStore().isConfirmCodeValid$.subscribe(this.switch);
    }

    switch(): void {
        this.store.isSignUp = !this.store.isSignUp;
    }

    render() {
        return(
            <MainContainer>
                <AuthContainer header={this.store.isSignUp ? "Зарегистрироваться" : "Войти"}>
                    {this.store.isSignUp ? <SignUp /> : <Login />}
                    <div className={"auth-footer"}>
                        <div className={"auth-footer_text"}>
                            <div onClick={this.store.showForgotPasswordPopup}>{!this.store.isSignUp && "Восстановить пароль"}</div>
                            <div onClick={this.switch}>{!this.store.isSignUp ? "Зарегистрироваться" : "Войти"}</div>
                        </div>
                    </div>
                </AuthContainer>
                <ForgotPasswordPopup title={"Восстоновление пароля"} isHidden={this.store.isForgotPasswordPopupHidden}>
                    <div className="popup__text-button" onClick={this.store.showForgotPasswordPopup}>Закрыть</div>
                </ForgotPasswordPopup>
            </MainContainer>
        );
    }
}
