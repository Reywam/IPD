import * as React from "react";
import "./ErrorPage.scss";
import { IErrorPage } from "./IErrorPage";
import { AppContext } from "@context";
import { EAppPaths } from "@config/EAppPaths";
import { autobind } from "core-decorators";
import { Button } from "@components/button";

@autobind
export class ErrorPage extends React.Component {
    private static readonly messages = [
        {
            typeError: "deleted",
            message: "Ваша учетная запись удалена. Для пользования сайтом зарегистрируйте новую учетную запись."
        },
        {
            typeError: "blocked",
            message: "Ваша учетная запись заблокирована. Для решения проблемы напишите админу.",
            link: `${EAppPaths.MESSAGE_ADMIN}`
        }
    ];

    static getMessageByType(typeError: string): IErrorPage {
        const message = this.messages.find((item) => item.typeError === typeError);
        return {
            message: message!.message,
            link: message!.link
        };
    }

    componentDidMount(): void {
        window.onbeforeunload = () => {
            AppContext.getUserStore().error = "";
            AppContext.getUserStore().logout();
        };
    }

    render() {
        const message: IErrorPage = ErrorPage.getMessageByType(AppContext.getUserStore().error);
        return(
            <div className={"error-page"}>
                <div className="error-page__content">
                    <div className="error-page__content_title">{message.message}</div>
                    {message.link &&
                        <div
                            className="error-page__content_link"
                            onClick={this.redirectToMessageAdmin}
                        >
                            Написать админу
                        </div>
                    }
                    <Button
                        title={"На главную"}
                        isDisable={false}
                        onClick={this.redirectToMain}
                    />
                </div>
            </div>
        );
    }

    private redirectToMessageAdmin(): void {
        AppContext.getUserStore().logout();
        AppContext.getHistory().push(EAppPaths.MESSAGE_ADMIN);
    }

    private redirectToMain(): void {
        AppContext.getUserStore().logout();
        AppContext.getHistory().push(EAppPaths.MAIN);
    }
}
