import * as React from "react";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { MainContainer } from "@components/main-container";
import Helmet from "react-helmet";
import { PageTitle } from "@components/page-title";
import { Button } from "@components/button";
import { EditAboutMeStore } from "./EditAboutMeStore";
import { PushNotification } from "@components/push-notification";

const CKEditor = require("@ckeditor/ckeditor5-react");
const ClassicEditor  = require("@ckeditor/ckeditor5-build-classic");

@observer
@autobind
export class EditAboutMe extends React.Component {
    private readonly store = new EditAboutMeStore();

    componentDidMount(): void {
        this.store.getInfo();
        this.store.onUpdate$.subscribe(this.store.getInfo);
    }

    render() {
        return(
            <MainContainer>
                <Helmet>
                    <title>{`Редактирование страницы "Обо мне" `}</title>
                </Helmet>
                <PageTitle title={`Редактирование страницы "Обо мне" `} />
                <CKEditor
                    editor={ClassicEditor}
                    data={this.store.textEditor}
                    onChange={(event: any, editor: any) => {
                        this.store.onChangeTextEditor(editor.getData());
                    }}
                />
               <div style={{marginTop: 30, marginBottom: 30}}>
                   <Button
                       title={"Обновить"}
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
