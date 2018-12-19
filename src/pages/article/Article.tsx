import * as React from "react";
import { MainContainer } from "@components/main-container";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import Helmet from "react-helmet";
import { PageTitle } from "@components/page-title";
import { ArticleStore } from "./ArticleStore";
import { last } from "lodash";
import { ArticleInfo } from "@components/article-info";
import { ArticleText } from "@components/article-text";
import { AddComment } from "@components/add-comment";
import { Subject } from "rxjs/internal/Subject";
import { ICommentItem } from "@components/comment-item/ICommentItem";
import { CommentItem } from "@components/comment-item/CommentItem";

@observer
@autobind
export class Article extends React.Component {
    private readonly store = new ArticleStore();
    private readonly onUpdate$ = new Subject<void>();

    componentDidMount(): void {
        const url = window.location.pathname;
        const articleId = last(url.split("/"));
        if (!articleId) {
            return;
        }
        this.store.articleId = articleId;
        this.store.getArticle(articleId);
        this.store.getComments(articleId);
        this.onUpdate$.subscribe(() => {
            this.store.getComments(articleId);
        });
    }

    render() {
        return(
            <MainContainer>
                <Helmet>
                    <title>{this.store.article.name}</title>
                </Helmet>
                <PageTitle title={this.store.article.name} />
                <ArticleInfo
                    date={this.store.article.created}
                    authorId={this.store.article.ownerId}
                    authorName={this.store.article.ownerName}
                />
                <ArticleText text={this.store.article.text} />
                {this.store.isCommentFormShow() &&
                    <AddComment onUpdate$={this.onUpdate$} articleId={this.store.articleId}/>
                }
                {this.store.comments.map((data: ICommentItem) => {
                    return(
                        <CommentItem
                            key={data.commentId}
                            comment={data}
                            obUpdate$={this.onUpdate$}
                        />
                    );
                })}
            </MainContainer>
        );
    }
}
