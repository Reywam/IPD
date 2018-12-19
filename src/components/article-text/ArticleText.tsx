import { IArticleTextProps } from "./IArticleTextProps";
import { observer } from "mobx-react";
import { SFC } from "react";
import "./ArticleText.scss";
import * as React from "react";

export const ArticleText = observer<SFC<IArticleTextProps>>(({
    text
 }) => {
    return(
        <div
            className="article-text"
            dangerouslySetInnerHTML={{__html: text}}
        />
    );
});
