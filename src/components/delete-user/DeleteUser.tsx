import * as React from "react";
import { Button } from "@components/button";
import "./DeleteUser.scss";
import { DeleteUserStore } from "./DeleteUserStore";
import { DeleteUserPopup } from "@components/popups/delete-user-popup";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { IDeleteUserProps } from "./IDeleteUserProps";
import { ReactNode } from "react";

@autobind
@observer
export class DeleteUser extends React.Component<IDeleteUserProps> {
    private readonly store = new DeleteUserStore();

    protected getView(): ReactNode {
        if (this.props.role === "admin") {
            return (<></>);
        } else {
            return(
                <div className="delete-user">
                    <Button
                        title={"Удалить пользователя"}
                        isDisable={this.props.role === "admin"}
                        onClick={this.store.switch}
                        className={"delete-button"}
                    />
                    {this.store.deletePopupShown &&
                    <DeleteUserPopup
                        title={"Вы действительно хотете удалить учетную запись?"}
                    >
                        <div className="popup__text-button" onClick={this.store.switch}>Закрыть</div>
                    </DeleteUserPopup>
                    }
                </div>
            );
        }
    }

    render() {
        return this.getView();
    }
}
