import React, { Component } from "react";
import "./landing.css";

import { Icon } from "antd";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";

import Button from "../../components/button/Button";
import { CommonHandler } from "../../common";
import { DataHandle } from "../../utils/dataHandler";
import { APICONSTANTS } from "../../constants/api";
import * as ROUTES from "../../constants/Routes";

export class Landing extends Component {
  state = {
    showDashboard: false,
    responseObj: {}
  };

  handleGoogleLogin = data => {
    localStorage.setItem("userData", JSON.stringify(data.name));
    this.setState({ showDashboard: true });
    CommonHandler.setCookie("userinfo", data.name);
    this.props.history.push(ROUTES.DASHBOARD);
  };

  responseFailure = response => {
    console.log(response);
  };

  responseGoogle = response => {
    let user = { name: response.profileObj.name };
    const userObject = {
      fullname: response.profileObj.name,
      name: response.profileObj.givenName,
      email: response.profileObj.email
    };
    DataHandle.googgleAuthentication(
      APICONSTANTS.GOOGLE_LOGIN_LANDING,
      userObject,
      this.handleGoogleLogin
    );
  };

  registerUser = () => {
    this.props.history.push(ROUTES.REGISTER);
  };

  loginUser = () => {
    this.props.history.push(ROUTES.LOGIN);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="landing-container">
            <h1 className="header-logo">Chat App</h1>
            <Icon className="App-logo" type="wechat" />
            <GoogleLogin
              clientId="447295909859-ru63noi89sgmqd80c7omvaa5qf7ls4sm.apps.googleusercontent.com"
              render={renderProps => (
                <button
                  className="login-btn"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <Icon className="google-icon" type="google" />
                  Google Login
                </button>
              )}
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseFailure}
              cookiePolicy={"single_host_origin"}
            />
            <div className="btn-wrapper">
              <Button
                className="custom-btn"
                buttonText="Register"
                onClick={this.registerUser}
              />
              <Button
                className="custom-btn"
                buttonText="Login"
                onClick={this.loginUser}
              />
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Landing;
