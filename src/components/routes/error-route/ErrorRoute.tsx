import * as React from "react";
import { IErrorRouteProps } from "./IErrorRouteProps";
import { observer } from "mobx-react";
import { SFC } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { AppContext } from "@context";
import { isTokenValid } from "@helpers/helpers";

export const ErrorRoute = observer<SFC<IErrorRouteProps>>(({
    path,
    component: Component,
    ...rest
}) => {
    return(
        <Route
            {...rest}
            render={(props: RouteComponentProps) => {
                return isError() && isTokenValid(AppContext.getUserStore().getToken()) ? (
                    <Component {...props} />
                ) : (
                    <Redirect exact={true} push={true} to={"/"} />
                );
            }}
        />
    );
});

function isError(): boolean {
    const isDeleted = AppContext.getUserStore().isDeleted;
    const isBlocked = AppContext.getUserStore().isBlocked;
    return isBlocked || isDeleted;
}
