import * as React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import App from "../App";
import LoginComponent from "../pages/logincomponent";
import RegisterComponent from "../pages/registercomponent";
import DashboardComponent from "../pages/dashboardcomponent";

const AppRouter: React.FC = () => {
  let renderComponent = (component: any) => {
    return () =>
      localStorage.getItem("isLoggedIn") === "true" ? (
        component
      ) : (
        <Redirect to="/login" />
      );
  };
  return (
    <Router>
      <App>
        <Route
          path="/login"
          render={() =>
            localStorage.getItem("isLoggedIn") === "true" ? (
              <Redirect to="/dashboard" />
            ) : (
              <LoginComponent />
            )
          }
        />
        <Route
          path="/register"
          render={() =>
            localStorage.getItem("isLoggedIn") === "true" ? (
              <Redirect to="/dashboard" />
            ) : (
              <RegisterComponent />
            )
          }
        />
        <Route
          path="/dashboard"
          render={renderComponent(<DashboardComponent />)}
        />
        <Route
          exact
          path="/"
          render={() =>
            localStorage.getItem("isLoggedIn") === "true" ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </App>
    </Router>
  );
};
export default AppRouter;
