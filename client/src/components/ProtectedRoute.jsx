import React from "react";
import { Redirect, Route } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";

const ProtectedRoute = ({ component: Component, context, ...rest }) => {
  if (context.isLoading) {
    return null;
  } else if (context.isLoggedIn) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    return <Redirect to="/signin" />;
  }
};

export default withUser(ProtectedRoute);
