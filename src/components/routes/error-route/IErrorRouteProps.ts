import * as React from "react";
import { RouteComponentProps, RouteProps } from "react-router";

export type TComponent = React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;

export interface IErrorRouteProps extends RouteProps {
    component: TComponent;
}
