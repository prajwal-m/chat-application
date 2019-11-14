import React, { Component } from "react";
import "./login.css";

import InputField from "../../components/inputField/InputField";
import Button from "../../components/button/Button";

import * as ROUTES from "../../constants/Routes";
import { CommonHandler } from "../../common";
import { DataHandle } from "../../utils/dataHandler";
import { APICONSTANTS } from "../../constants/api";

class Login extends Component {
  state = {
    userName: "",
    password: "",
    userList: [],
    loggedUser: {}
  };

  handleBackRoute = () => {
    this.props.history.push(ROUTES.LANDING);
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleLogin = () => {
    DataHandle.authenticateUser(
      APICONSTANTS.GET_USER_DATA,
      {
        name: this.state.userName,
        password: this.state.password
      },
      this.handleLoginState
    );
  };

  handleLoginState = response => {
    this.setState({ loggedUser: response });
    CommonHandler.setCookie("userinfo", this.state.userName);
    localStorage.setItem("userData", JSON.stringify(this.state.userName));
    this.props.history.push(ROUTES.DASHBOARD);
  };

  handleStateUpdate = data => {
    this.setState({ userList: data });
  };

  componentDidMount = () => {
    DataHandle.getData(APICONSTANTS.GET_USER_DATA, this.handleStateUpdate);
  };

  render() {
    return (
      <div className="login-page">
        <InputField
          type="text"
          placeholder="enter name"
          label="Name"
          name="userName"
          value={this.state.userName}
          onChange={this.handleChange}
        />
        <InputField
          type="password"
          placeholder="enter password"
          label="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <Button buttonText="Login" onClick={this.handleLogin} />
        <Button
          className="back-btn"
          buttonText="Back"
          onClick={this.handleBackRoute}
        />
      </div>
    );
  }
}

export default Login;
