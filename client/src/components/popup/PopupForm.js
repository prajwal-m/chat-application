import React, { Component } from "react";
import "./popupform.css";
import PropTypes from "prop-types";
import { socket } from "../../utils/socketConn";

class PopupForm extends Component {
  state = {
    groupName: ""
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  handleSend = () => {
    this.props.handleChatRoomState(this.state.groupName);
    socket.emit("addRoom", this.state.groupName);
    this.props.handleClose();
  };

  render() {
    return (
      <div className="popup">
        <div className="popup-inner">
          <h1 className="form-header">{this.props.text}</h1>
          <form id="popupform" onClick={this.handleSubmit}>
            <textarea
              placeholder="enter group name"
              name="groupName"
              value={this.state.groupName}
              onChange={this.handleInputChange}
            />

            <button className="submit-group" onClick={() => this.handleSend()}>
              Send
            </button>
          </form>
          <button
            className="close-btn"
            onClick={() => this.props.handleClose()}
          >
            X
          </button>
        </div>
      </div>
    );
  }
}

PopupForm.propTypes = {
  text: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired
};

PopupForm.defaultProps = {
  text: "",
  handleClose: () => {}
};

export default PopupForm;
