import * as React from "react";
import { IPublicRouteProps } from "./IPublicRouteProps";
import { observer } from "mobx-react";
import { SFC } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { isTokenValid } from "../../../helpers/helpers";
import { AppContext } from "@context";

export const PublicRoute = observer<SFC<IPublicRouteProps>>(({
    path,
    component: Component,
    ...rest
}) => {
    return(
        <Route
            {...rest}
            render={(props: RouteComponentProps) => {
                return isTokenValid(AppContext.getUserStore().getToken()) ? (
                    <Redirect exact={true} push={true} to={"/"} />
                ) : (
                    <Component {...props} />
                );
            }}
        />
    );
});
