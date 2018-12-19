import * as React from "react";
import "../../components/article-form/ArticleForm.scss";
import { CreateArticleStore } from "./CreateArticleStore";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { ArticleForm } from "@components/article-form";

@observer
@autobind
export class CreateArticle extends React.Component {
    private readonly store = new CreateArticleStore();

    render() {
        return(
            <ArticleForm
                title={"Создание статьи"}
                placeholder={"Название статьи"}
                buttonText={"Опубликовать"}
                notificationText={"Статья добавлена!"}
                articleText={this.store.textEditor}
                isNotificationShown={!this.store.isPopupShown}
                isFormValid={this.store.isFormValid() && this.store.isEditorValid()}
                isClearField={this.store.isClearField}
                addField={this.store.addField}
                onChangeInput={this.store.onChange}
                onHideNotification={this.store.hideNotification}
                onChangeArticle={this.store.onChangeTextEditor}
                handler={this.store.uploadArticle}
            />
        );
     }
}
