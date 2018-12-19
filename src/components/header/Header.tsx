import * as React from "react";
import "./Header.scss";
import { AppContext } from "@context";
import { observer } from "mobx-react";
import { EAppPaths } from "@config/EAppPaths";
import { IHeaderProps } from "./IHeaderProps";
import { autobind } from "core-decorators";
import { HeaderStore } from "./";
import { ConfirmPopup } from "@components/popups/confirm-popup";
import { HeaderLink } from "@components/header-link";
import { DropDown } from "@components/dropdown";
import { IDropDownItem } from "@components/dropdown-item";
import { drop } from "lodash";

@observer
@autobind
export class Header extends React.Component<IHeaderProps> {
    private readonly store = new HeaderStore();

    componentDidMount(): void {
        AppContext.getHeaderStore().logoutSubject$.subscribe(this.store.showPopup);
    }

    render() {
        return(
            <>
                <div className={"header"}>
                    <div className={"header__content"}>
                        <HeaderLink path={EAppPaths.MAIN} name={"Главная"} current={this.props.current}/>
                        <HeaderLink path={EAppPaths.ABOUT} name={"Обо мне"} current={this.props.current}/>
                        <HeaderLink path={EAppPaths.CONTACT} name={"Контакты"} current={this.props.current}/>
                        {!AppContext.getUserStore().isLoggedIn && <HeaderLink path={EAppPaths.LOGIN} name={"Войти"} current={this.props.current}/>}
                        {AppContext.getUserStore().isLoggedIn &&
                            <DropDown
                                current={AppContext.getUserStore().user.login}
                                items={this.getList()}
                                className={"header__dropdown"}
                                classNameContent={"header__dropdown__content"}
                            />
                        }
                    </div>
                </div>
                {this.store.isLogoutPopupShown &&
                    <ConfirmPopup
                        title={"Вы действтельно хотите выйти?"}
                        onSubmit={this.store.logout}
                        onCancel={this.store.hidePopup}
                    />
                }
            </>
        );
    }

    private getList(): IDropDownItem[] {
        const role = AppContext.getUserStore().user.role;
        let list: IDropDownItem[] = this.store.getDropDownItems();
        if (role !== "admin") {
            list = drop(this.store.getDropDownItems());
        }
        return list;
    }
}
