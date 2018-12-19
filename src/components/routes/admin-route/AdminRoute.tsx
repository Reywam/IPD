import * as React from "react";
import { IAdminRouteProps } from "./IAdminRouteProps";
import { observer } from "mobx-react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { autobind } from "core-decorators";
import { RouteStore } from "@components/routes/store/";

@observer
@autobind
export class AdminRoute extends React.Component<IAdminRouteProps> {
    private readonly store = new RouteStore();

    componentDidMount() {
        this.store.getRole();
    }

    render() {
        return(
            <>
                {this.store.succes &&
                    <Route
                        render={(props: RouteComponentProps) => {
                            return this.store.role === "admin" ? (
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
