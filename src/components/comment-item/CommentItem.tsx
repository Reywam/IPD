import * as React from "react";
import { ICommentItemProps } from "./ICommentItemProps";
import "./CommentItem.scss";
import { Link } from "react-router-dom";
import { formatDate } from "@helpers/helpers";
import { Transport } from "@services/transport";
import { get } from "lodash";
import { autobind } from "core-decorators";
import { AppContext } from "@context";

const defaultAvatar = require("./img/default-avatar.jpg");

@autobind
export class CommentItem extends React.Component<ICommentItemProps> {
    private readonly transport = new Transport();

    render() {
        return(
            <div className="comment">
                <div className="comment__header">
                    <img
                        src={this.props.comment.avatar || defaultAvatar}
                        alt={this.props.comment.login}
                        onError={this.onLogoLoadError}
                        className="comment__header_image"
                    />
                    <div className="comment__header_info">
                        <div>
                            <Link
                                to={`/user/${this.props.comment.userId}`}
                                className="comment__header_name"
                            >
                                {this.props.comment.login}
                            </Link>
                        </div>
                        <div className="comment__header_date">
                            {formatDate(this.props.comment.created)}
                        </div>
                    </div>
                    {this.isCloseIconShow() && <div className="delete-comment" onClick={this.deleteComment}/>}
                </div>
                <div
                    className="comment__content"
                    dangerouslySetInnerHTML={{__html: this.props.comment.text}}
                />
            </div>
        );
    }

    private onLogoLoadError(event: React.SyntheticEvent<HTMLImageElement>): void {
        const target = event.target as HTMLImageElement;
        if (!target) {
            return;
        }
        target.setAttribute("src", defaultAvatar);
    }

    private deleteComment(): void {
        const token = AppContext.getUserStore().getToken();
        const commentId = this.props.comment.commentId;
        this.transport.deleteComment(token, commentId).then((response) => {
           const success = get(response.data, "success");
           if (success) {
               this.props.obUpdate$.next();
           }
        });
    }

    private isCloseIconShow(): boolean {
        const userId = AppContext.getUserStore().getUserId();
        return userId === this.props.comment.userId;
    }
}
