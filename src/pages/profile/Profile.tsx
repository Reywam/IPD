import * as React from "react";
import { MainContainer } from "@components/main-container";
import { observer } from "mobx-react";
import { AvatarPanel } from "@components/avatar-panel";
import { ChangeLogin } from "@components/change-data/change-login";
import "./Profile.scss";
import { ChangeEmail } from "@components/change-data/change-email";
import Helmet from "react-helmet";
import { ChangePassword } from "@components/change-data/change-password";
import { DeleteUser } from "@components/delete-user";
import { autobind } from "core-decorators";
import { ProfileStore } from "./ProfileStore";
import { InformationCard } from "@components/information-card";
import { Button } from "@components/button";
import { ReactNode } from "react";
import { PageTitle } from "@components/page-title";
import { LeftBlock } from "@components/left-block";
import { RightBlock } from "@components/right-block";

@observer
@autobind
export class Profile extends React.Component {
    private readonly store = new ProfileStore();

    componentDidMount(): void {
        this.store.getUser();
        this.store.onUpdate$.subscribe(this.store.getUser);
    }

    render() {
        return(
            <MainContainer>
                <Helmet>
                    <title>Личный кабинет</title>
                </Helmet>
                <PageTitle title={`Личный кабинет пользователя ${this.store.user.login}`} />
                <div className="profile-container">
                   <LeftBlock>
                       <AvatarPanel src={this.store.user.avatar} onUpdate$={this.store.onUpdate$} />
                       <DeleteUser role={this.store.user.role} />
                       {this.getCreateArticleButtonView()}
                       {this.getMyArticlesButtonView()}
                   </LeftBlock>
                    <RightBlock>
                        <InformationCard title={"Краткая информация"} data={this.store.getFormatData()} />
                        <ChangeLogin currentLogin={this.store.user.login} onUpdate$={this.store.onUpdate$} />
                        <ChangeEmail currentEmail={this.store.user.email} onUpdate$={this.store.onUpdate$} />
                        <ChangePassword/>
                    </RightBlock>
                </div>
            </MainContainer>
        );
    }

    private getCreateArticleButtonView(): ReactNode {
        if (this.store.user.role !== "user") {
            return (
                <div style={{marginBottom: 20}}>
                    <Button
                        title={"Создать статью"}
                        isDisable={false}
                        onClick={this.store.goToCreationArticle}
                    />
                </div>
            );
        }
        return <></>;
    }

    private getMyArticlesButtonView(): ReactNode {
        if (this.store.user.role !== "user") {
            return (
                <div style={{marginBottom: 20}}>
                    <Button
                        title={"Мои статьи"}
                        isDisable={false}
                        onClick={this.store.goToMyArticles}
                    />
                </div>
            );
        }
        return <></>;
    }
}
