import * as React from "react";
import Helmet from "react-helmet";
import { PageTitle } from "@components/page-title";
import { MainContainer } from "@components/main-container";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { AboutMeStore } from "./AboutMeStore";
import { ArticleText } from "@components/article-text";

@observer
@autobind
export class AboutMe extends React.Component {
    private readonly store = new AboutMeStore();

    componentDidMount(): void {
        this.store.getInfo();
    }

    render() {
        return(
            <MainContainer>
                <Helmet>
                    <title>Обо мне</title>
                </Helmet>
                <PageTitle title={"Обо мне"} />
                <ArticleText text={this.store.text} />
            </MainContainer>
        );
    }
}
