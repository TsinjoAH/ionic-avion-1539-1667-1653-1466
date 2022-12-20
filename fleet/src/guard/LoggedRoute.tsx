import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import {isLoggedIn} from "../data/login.service";

export function LoggedRoute(props: {
    component: any,
    path: string,
    exact: boolean
}): JSX.Element {
  const { component: Component, ...rest} = props;
  return (
    <Route
        {...rest}
        render={(props) => (
            isLoggedIn() ? <Component {...props} /> : <Redirect to="/login"/>
        )}
    />
  );
}