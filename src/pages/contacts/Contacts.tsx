import * as React from "react";
import { MainContainer } from "@components/main-container";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import Helmet from "react-helmet";
import { PageTitle } from "@components/page-title";
import { ContactsStore } from "@pages/contacts/ContactsStore";
import { ArticleText } from "@components/article-text";
import { EFormTypes } from "@config/EFormTypes";
import { EmailField } from "@components/email-field";
import { Button } from "@components/button";
import { PushNotification } from "@components/push-notification";

const CKEditor = require("@ckeditor/ckeditor5-react");
const ClassicEditor  = require("@ckeditor/ckeditor5-build-classic");

@observer
@autobind
export class Contacts extends React.Component {
    private readonly store = new ContactsStore();

    componentDidMount(): void {
        this.store.getInfo();
    }

    render() {
        return(
            <MainContainer>
                <Helmet>
                    <title>Контакты</title>
                </Helmet>
                <PageTitle title={"Контакты"} />
                <ArticleText text={this.store.text} />
                <h2>Написать админу</h2>
                <EmailField
                    addField={this.store.addField}
                    formType={EFormTypes.EMAIL}
                    placeholder={"Ваш e-mail"}
                    isReadonly={false}
                    isRequired={true}
                    isClear={this.store.isClearField}
                    className={"sign-up__content_item"}
                    onChange={this.store.onChange}
                />
                <CKEditor
                    editor={ClassicEditor}
                    data={this.store.textEditor}
                    onChange={(event: any, editor: any) => {
                        this.store.onChangeTextEditor(editor.getData());
                    }}
                />
                <div style={{marginTop: 20}}>
                    <Button
                        title={"Отправить"}
                        isDisable={!this.store.isFormValid() || !this.store.isEditorValid()}
                        onClick={this.store.sendEmail}
                    />
                </div>
                <PushNotification
                    title={"Письмо успешно отправлено!"}
                    onClick={this.store.hidePopup}
                    isHidden={!this.store.isPopupShown}
                />
            </MainContainer>
        );
    }
}
