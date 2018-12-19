import * as React from "react";
import Helmet from "react-helmet";
import { PageTitle } from "@components/page-title";
import { MainContainer } from "@components/main-container";
import { MainStore } from "./MainStore";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { ArticleList } from "@components/article-list/";
import { Pagination } from "@components/pagination";

@observer
@autobind
export class Main extends React.Component {
    private readonly store = new MainStore();

    componentDidMount(): void {
        this.store.handler();
        this.store.onUpdate$.subscribe(this.store.handler);
    }

    render() {
        return(
            <MainContainer>
                <Helmet>
                    <title>Главная</title>
                </Helmet>
                <PageTitle title={"Главная"} />
                <ArticleList data={this.store.articles}  />
                <Pagination
                    quantityArticles={this.store.length}
                    onUpdate$={this.store.onUpdate$}
                    currentPage={this.store.currentPage}
                />
            </MainContainer>
        );
    }
}
