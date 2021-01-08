import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectCurrentUserId , selectIsAdmin} from "./redux/user/user.selector";

const mapStateToProps = createStructuredSelector({
    loggedIn : selectCurrentUserId,
    isAdmin : selectIsAdmin
})

const Auth = ({ loggedIn, path, component: Component }) => (
  <Route
    path={path}
    render={props => (
      loggedIn ?
      <Redirect to='/home' /> :
      <Component {...props} />
    )}
  />
);

const Protected = ({ loggedIn, isAdmin , path, component: Component }) => (
  <Route
    path={path}
    render={
      props => (
      loggedIn && isAdmin? 
      <Component {...props} /> :
      <Redirect to='/my-account' />
    )
  }
  />
);

export const AuthRoute = withRouter(
  connect(mapStateToProps)(Auth)
);

export const ProtectedRoute = withRouter(
  connect(mapStateToProps)(Protected)
);

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
});

export const serverUrl = "https://server-808.herokuapp.com";
export const clientUrl = "http://localhost:3000";