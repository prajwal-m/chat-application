import React, { Component } from "react";
import "./registeration.css";

import InputField from "../../components/inputField/InputField";
import Button from "../../components/button/Button";
import PopupForm from "../../components/popup/PopupForm";

import * as ROUTES from "../../constants/Routes";
import { DataHandle } from "../../utils/dataHandler";
import { APICONSTANTS } from "../../constants/api";
import { socket } from "../../utils/socketConn";

class Registeration extends Component {
  state = {
    fullName: "",
    userName: "",
    password: "",
    email: "",
    showPopup: false,
    loading: false
  };

  handleBackRoute = () => {
    this.props.history.push(ROUTES.LANDING);
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleUniqueRegister = () => {
    this.props.history.push("/register");
    alert("username already exists register again");
  };

  handleSubmit = () => {
    let nameData = this.state.userName,
      passwordData = this.state.password,
      emailData = this.state.email,
      fullNameData = this.state.fullName;

    if (
      fullNameData !== "" &&
      nameData !== "" &&
      passwordData !== "" &&
      emailData !== ""
    ) {
      const userObject = {
        fullname: fullNameData,
        name: nameData,
        password: passwordData,
        email: emailData
      };

      DataHandle.postData(
        APICONSTANTS.REGISTER_USER,
        userObject,
        this.handleUniqueRegister
      );
      this.props.history.push("/");
    } else {
      alert("enter the data");
    }
  };

  enterLoading = () => {
    this.setState({ loading: true });
    this.handleSubmit();
  };

  render() {
    return (
      <div className="registeration-page">
        <InputField
          type="text"
          placeholder="enter Full name"
          label="Full Name"
          name="fullName"
          value={this.state.fullName}
          onChange={this.handleChange}
        />

        <InputField
          type="text"
          placeholder="enter username"
          label="User Name"
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
        <InputField
          type="email"
          placeholder="enter email"
          label="Email ID"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <Button
          className="submit-btn"
          buttonText="Submit"
          onClick={this.handleSubmit}
        />
        <Button
          className="back-btn"
          buttonText="Back"
          onClick={this.handleBackRoute}
        />
      </div>
    );
  }
}

export default Registeration;
