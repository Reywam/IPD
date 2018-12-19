import * as React from "react";
import { IArticlePreviewProps } from "./IArticlePreviewProps";
import "./ArticlePreview.scss";
import { ArticleHeader } from "@components/article-header";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { SFC } from "react";

export const ArticlePreview = observer<SFC<IArticlePreviewProps>>(({
    nameArticle,
    text,
    articleId
}) => {
    return(
        <div className="article-preview">
            <ArticleHeader name={nameArticle} />
            <div className="article-preview__content" dangerouslySetInnerHTML={{__html: text}} />
            <div className="article-preview__footer">
                <Link to={`/article/${articleId}`} className="read-more-link">
                    читать далее
                </Link>
            </div>
        </div>
    );
});
