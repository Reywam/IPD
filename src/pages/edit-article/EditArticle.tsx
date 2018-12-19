import * as React from "react";
import { EditArticleStore } from "./EditArticleStore";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { last } from "lodash";
import { ArticleForm } from "@components/article-form";

@observer
@autobind
export class EditArticle extends React.Component {
    private readonly store = new EditArticleStore();

    componentDidMount(): void {
        const url = window.location.pathname;
        const articleId = last(url.split("/"));
        if (!articleId) {
            return;
        }
        this.store.articleId = articleId;
        this.store.getArticle(articleId);
        this.store.onUpdate$.subscribe(() => {
            this.store.getArticle(articleId);
        });
    }

    render() {
        return(
            <ArticleForm
                title={"Редактирование статьи"}
                placeholder={"Название статьи"}
                buttonText={"Опубликовать"}
                notificationText={"Статья обновлена!"}
                articleText={this.store.textEditor}
                isNotificationShown={!this.store.isPopupShown}
                isFormValid={this.store.isFormValid() && this.store.isEditorValid()}
                isClearField={this.store.isClearField}
                value={this.store.articleName}
                addField={this.store.addField}
                onChangeInput={this.store.onChange}
                onHideNotification={this.store.hideNotification}
                onChangeArticle={this.store.onChangeTextEditor}
                handler={this.store.editArticle}
            />
        );
     }
}
