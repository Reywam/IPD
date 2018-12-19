import * as React from "react";
import { MainContainer } from "@components/main-container";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import Helmet from "react-helmet";
import { PageTitle } from "@components/page-title";
import { MyArticleStore } from "./MyArticleStore";
import { IMyArticle, MyArticleItem } from "@components/my-article-item";
import { ConfirmPopup } from "@components/popups/confirm-popup";

@observer
@autobind
export class MyArticles extends React.Component {
    private readonly store = new MyArticleStore();

    componentDidMount() {
        this.store.getArticles();
        this.store.onUpdate$.subscribe(this.store.getArticles);
    }

    render() {
        return(
            <MainContainer>
                <Helmet>
                    <title>Мои статьи</title>
                </Helmet>
                <PageTitle title={"Мои статьи"} />
                {this.store.articles.map((data: IMyArticle) => {
                    return(
                        <MyArticleItem
                            key={data.articleId}
                            name={data.name}
                            created={data.created}
                            articleId={data.articleId}
                            onEditArticle={this.store.goToEditPage}
                            onShowPopup={this.store.showPopup}
                        />
                    );
                })}
                {this.store.isPopupShown &&
                    <ConfirmPopup
                        title={"Вы действтельно хотите удалить статью?"}
                        onSubmit={this.store.deleteArticle}
                        onCancel={this.store.hidePopup}
                    />
                }
            </MainContainer>
        );
    }
}
