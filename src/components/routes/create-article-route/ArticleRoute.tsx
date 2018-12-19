import * as React from "react";
import { observer } from "mobx-react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { autobind } from "core-decorators";
import { RouteStore } from "@components/routes/store/";
import { AppContext } from "@context";
import { ICreateArticleRouteProps } from "./ICreateArticleRouteProps";

@observer
@autobind
export class ArticleRoute extends React.Component<ICreateArticleRouteProps> {
    private readonly store = new RouteStore();

    componentDidMount() {
        this.store.getRole();
    }

    render() {
        return(
            <>
                {this.store.succes && AppContext.getUserStore().isLoggedIn &&
                    <Route
                        render={(props: RouteComponentProps) => {
                            return this.store.role === "author" || this.store.role === "admin" ? (
                                React.createElement(this.props.component, {...props})
                            ) : (
                                <Redirect exact={true} push={true} to={"/"} />
                            );
                        }}
                    />
                }
            </>
        );
    }
}
