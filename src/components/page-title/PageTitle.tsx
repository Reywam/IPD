import * as React from "react";
import { IPageTitleProps } from "./IPageTitleProps";
import "./PageTitle.scss";
import { observer } from "mobx-react";
import { SFC } from "react";

export const PageTitle = observer<SFC<IPageTitleProps>>(({
    title
}) => {
    return (
        <div className="page-title">
            <div className="page-title_background-left"/>
            <div className="page-title_text">{title}</div>
            <div className="page-title_background-right"/>
        </div>
    );
});
