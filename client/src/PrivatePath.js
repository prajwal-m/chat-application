import React from "react";
import { Route, Redirect } from "react-router-dom";
import { CommonHandler } from "./common";

export const PrivatePath = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        CommonHandler.getCookie("userinfo") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
