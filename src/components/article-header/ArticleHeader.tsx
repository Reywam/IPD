import * as React from "react";
import { IArticleHeaderProps } from "./IArticleHeaderProps";
import { observer } from "mobx-react";
import { SFC } from "react";
import "./ArticleHeader.scss";

export const ArticleHeader = observer<SFC<IArticleHeaderProps>>(({
    name
}) => {
    return(
        <div className="article-header">
            <div className="article-header_left"/>
            <div className="article-header_text">{name}</div>
            <div className="article-header_right"/>
        </div>
    );
});
