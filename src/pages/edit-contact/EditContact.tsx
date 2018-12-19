import * as React from "react";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { MainContainer } from "@components/main-container";
import Helmet from "react-helmet";
import { PageTitle } from "@components/page-title";
import { Button } from "@components/button";
import { EditContactStore } from "./EditContactStore";
import { PushNotification } from "@components/push-notification";

const CKEditor = require("@ckeditor/ckeditor5-react");
const ClassicEditor  = require("@ckeditor/ckeditor5-build-classic");

@observer
@autobind
export class EditContact extends React.Component {
    private readonly store = new EditContactStore();

    componentDidMount(): void {
        this.store.getInfo();
        this.store.onUpdate$.subscribe(this.store.getInfo);
    }

    render() {
        return(
            <MainContainer>
                <Helmet>
                    <title>{`Редактирование страницы "Контакты" `}</title>
                </Helmet>
                <PageTitle title={`Редактирование страницы "Контакты" `} />
                <CKEditor
                    editor={ClassicEditor}
                    data={this.store.textEditor}
                    onChange={(event: any, editor: any) => {
                        this.store.onChangeTextEditor(editor.getData());
                    }}
                />
               <div style={{marginTop: 30, marginBottom: 30}}>
                   <Button
                       title={"Обоновить"}
                       isDisable={false}
                       onClick={this.store.upload}
                   />
               </div>
                <PushNotification
                    title={"Обновлено"}
                    onClick={this.store.hidePopup}
                    isHidden={!this.store.isPopupShown}
                />
            </MainContainer>
        );
    }
}
