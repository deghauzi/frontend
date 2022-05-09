import React from "react";
import { Route, Switch,withRouter } from "react-router-dom";
import AuthMain from "./containers/auth/AuthMain";
import PrivateRoute from "util/PrivateRoute";
import TheLayout from './containers/dashboard/containers/TheLayout'
import Page404 from "util/pages/page404/Page404";


const MainApp = () => {
  return (
    <>
      <Switch>
        <PrivateRoute
          path="/dashboard"
          name="Home"
          render={props => <TheLayout {...props} />}
        />     
        <Route exact path="/" component={AuthMain} />
        <Route exact path="*" component={Page404} />

      </Switch>
    </>
  );
};

export default withRouter(MainApp);

   
     