import * as React from "react";
import "./MainContainer.scss";
import { AppContext } from "@context";
import { Header } from "@components/header";

export class MainContainer extends React.Component {
    render() {
        return(
            <div className={"container"}>
                <Header current={AppContext.getHistory().location.pathname}/>
                {this.props.children}
            </div>
        );
    }
}
