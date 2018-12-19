import * as React from "react";
import { IArticleInfoProps } from "./IArticleInfoProps";
import { observer } from "mobx-react";
import { SFC } from "react";
import { formatDate } from "@helpers/helpers";
import { Link } from "react-router-dom";
import "./ArticleInfo.scss";

export const ArticleInfo = observer<SFC<IArticleInfoProps>>(({
    date,
    authorId,
    authorName
}) => {
    return(
        <div className="article-info">
            <div className="article-info_item">{`Добавлено: ${formatDate(date)}`}</div>
            <div className="article-info_item">
                Добавил:
                <Link to={`/user/${authorId}`} className="article-info_link">{authorName}</Link>
            </div>
        </div>
    );
});
