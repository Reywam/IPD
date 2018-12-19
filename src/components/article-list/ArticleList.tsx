import { IArticleListProps } from "./IArticleListProps";
import { observer } from "mobx-react";
import { SFC } from "react";
import { IArticlePreview } from "@interfaces/";
import { ArticlePreview } from "@components/article-preview";
import * as React from "react";

export const ArticleList = observer<SFC<IArticleListProps>>(({
    data
}) => {
    return(
        <>
            {data.map((item: IArticlePreview) => {
                return(
                    <ArticlePreview
                        key={item._id}
                        nameArticle={item.name}
                        text={item.text}
                        articleId={item._id}
                    />
                );
            })}
        </>
    );
});
