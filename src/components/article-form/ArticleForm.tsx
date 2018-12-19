import { observer } from "mobx-react";
import { SFC } from "react";
import { IArticleFormProps } from "./IArticleFormProps";
import * as React from "react";
import { EFormTypes } from "@config/EFormTypes";
import { MainContainer } from "@components/main-container";
import Helmet from "react-helmet";
import { PageTitle } from "@components/page-title";
import { InputField } from "@components/input-field";
import { Button } from "@components/button";
import { PushNotification } from "@components/push-notification";
import "./ArticleForm.scss";
import { toString } from "lodash";

const CKEditor = require("@ckeditor/ckeditor5-react");
const ClassicEditor  = require("@ckeditor/ckeditor5-build-classic");

export const ArticleForm = observer<SFC<IArticleFormProps>>(({
    title,
    placeholder,
    buttonText,
    notificationText,
    articleText,
    isNotificationShown,
    isFormValid,
    isClearField,
    value,
    onChangeInput,
    onChangeArticle,
    handler,
    onHideNotification,
    addField
}) => {
    return(
        <MainContainer>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <PageTitle title={title} />
            <div className="create-article">
                <InputField
                    addField={addField}
                    formType={EFormTypes.TEXT}
                    placeholder={"Название статьи"}
                    isReadonly={false}
                    isRequired={true}
                    value={toString(value)}
                    isClear={isClearField}
                    className={"sign-up__content_item"}
                    onChange={onChangeInput}
                />
                <div className={"create-article__editor"}>
                    <CKEditor
                        editor={ClassicEditor}
                        data={articleText}
                        onChange={(event: any, editor: any) => {
                            onChangeArticle(editor.getData());
                        }}
                        config={
                            {
                                cloudServices: {
                                    tokenUrl: "https://36330.cke-cs.com/token/dev/QlCMbp7lryi0iAwUt43OXHziNwBoeie7lnLAXaGLFjZc94ZOWme0f6fuPDVV",
                                    uploadUrl: "https://36330.cke-cs.com/easyimage/upload/"
                                },
                            }
                        }
                    />
                </div>
                <Button
                    title={buttonText}
                    isDisable={!isFormValid}
                    onClick={handler}
                />
                <PushNotification
                    title={notificationText}
                    onClick={onHideNotification}
                    isHidden={isNotificationShown}
                />
            </div>
        </MainContainer>
    );
});
