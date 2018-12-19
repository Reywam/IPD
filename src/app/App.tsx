import * as React from "react";
import { Route, Router, Switch } from "react-router";
import DevTools from "mobx-react-devtools";
import { PublicRoute } from "@components/routes/public-route";
import { AppContext } from "@context";
import { autobind } from "core-decorators";
import { EAppPaths } from "@config/EAppPaths";
import { observer } from "mobx-react";
import { PrivateRoute } from "@components/routes/private-route";
import { Profile } from "@pages/profile";
import { AdminRoute } from "@components/routes/admin-route";
import { Admin } from "@pages/admin";
import { Main } from "@pages/main";
import { AboutMe } from "@pages/about-me";
import { Contacts } from "@pages/contacts";
import { Registration } from "@pages/registartion";
import { NotFound } from "@pages/404";
import { ErrorRoute } from "@components/routes/error-route";
import { ErrorPage } from "@pages/error-page";
import { CreateArticle } from "@pages/create-article";
import { ArticleRoute } from "@components/routes/create-article-route";
import { Article } from "@pages/article";
import { MyArticles } from "@pages/my-articles";
import { EditArticle } from "@pages/edit-article";
import { EditAboutMe } from "@pages/edit-about-me";
import { EditContact } from "@pages/edit-contact";
import { UserProfile } from "@components/../pages/user-profile/";

@autobind
@observer
export class App extends React.Component {
    constructor(props: any) {
        super(props);
        AppContext.getUserStore().login();
    }

    render() {
        return (
              <Router history={AppContext.getHistory()}>
                  <>
                      <DevTools />
                      <Switch>
                          <Route exact={true} path={EAppPaths.MAIN} component={Main}/>
                          <Route exact={true} path={EAppPaths.MAIN_PAGES} component={Main}/>
                          <Route exact={true} path={EAppPaths.ABOUT} component={AboutMe}/>
                          <Route exact={true} path={EAppPaths.CONTACT} component={Contacts}/>
                          <Route path={EAppPaths.ARTICLE} component={Article}/>
                          <Route path={EAppPaths.USER} component={UserProfile}/>
                          <PublicRoute path={EAppPaths.LOGIN} component={Registration}/>
                          <PrivateRoute path={EAppPaths.PROFILE} component={Profile}/>
                          <AdminRoute path={EAppPaths.ADMIN} component={Admin}/>
                          <AdminRoute path={EAppPaths.EDIT_ABOUT_ME} component={EditAboutMe}/>
                          <AdminRoute path={EAppPaths.EDIT_CONTACTS} component={EditContact}/>
                          <ErrorRoute path={EAppPaths.ERROR} component={ErrorPage}/>
                          <ArticleRoute path={EAppPaths.CREATE_ARTICLE} component={CreateArticle}/>
                          <ArticleRoute path={EAppPaths.MY_ARTICLES} component={MyArticles}/>
                          <ArticleRoute path={EAppPaths.EDIT_ARTICLE} component={EditArticle}/>
                          <Route path={"*"} component={NotFound}/>
                      </Switch>
                  </>
              </Router>
        );
    }
}
