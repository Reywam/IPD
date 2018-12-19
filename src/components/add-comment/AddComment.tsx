import * as React from "react";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import "./AddComment.scss";
import { IAddCommentProps } from "./IAddCommentProps";
import { AppContext } from "@context";
import { ICommentData } from "@interfaces/";
import { Transport } from "@services/transport";
import { get } from "lodash";
import { TextEditorStore } from "@pages/text-editor-store";

const CKEditor = require("@ckeditor/ckeditor5-react");
const ClassicEditor  = require("@ckeditor/ckeditor5-build-classic");

@observer
@autobind
export class AddComment extends React.Component<IAddCommentProps> {
    private readonly store = new TextEditorStore();
    private readonly transport = new Transport();

    render() {
        return(
            <div className="add-comment">
                <div style={{marginBottom: 20}}>Оставить комментарий</div>
                <CKEditor
                    editor={ClassicEditor}
                    data={this.store.textEditor}
                    onChange={(event: any, editor: any) => {
                        this.store.onChangeTextEditor(editor.getData());
                    }}
                    config={
                        {
                            toolbar: [ "heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote" ],
                        }
                    }
                />
                <div className="add-comment__footer">
                    <div className="send-comment" onClick={this.addComment}>Отправить</div>
                </div>
            </div>
        );
    }

    private addComment(): void {
        if (this.store.isEditorValid()) {
            const token = AppContext.getUserStore().getToken();
            const data: ICommentData = {
                token: token.toString(),
                articleId: this.props.articleId,
                text: this.store.textEditor
            };
            this.transport.addComment(data).then((response) => {
                const success = get(response.data, "success");
                if (success) {
                    this.store.textEditor = "";
                    this.props.onUpdate$.next();
                }
            });
        }
    }
}
