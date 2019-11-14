import React from "react";
import { withRouter, Redirect, Link, NavLink } from "react-router-dom";
import Button from "../button/Button";
import { CommonHandler } from "../../common";
import "./userlist.css";
import PopupForm from "../popup/PopupForm";
import * as ROUTES from "../../constants/Routes";

import { socket } from "../../utils/socketConn";
import { Icon } from "antd";

class UserList extends React.Component {
  state = {
    showPopup: false,
    message: "",
    reciever: "",
    chatRooms: ["cricket", "football"]
  };

  handleLogout = () => {
    CommonHandler.removeCookie("userinfo");
    this.props.history.push(ROUTES.LANDING);
  };

  handleClick = user => {
    this.setState({ reciever: user });
    this.setState({ showPopup: true });
  };

  handlePopUpDisplay = () => {
    this.setState({ showPopup: true });
  };

  handleClose = () => {
    this.setState({ showPopup: false });
  };

  handleRoute = () => {
    this.props.history.push(ROUTES.DASHBOARD);
  };

  handleChatRoomState = data => {
    console.log(data);
    let rooms = [...this.state.chatRooms];
    rooms.push(data);
    this.setState({ chatRooms: rooms });
  };

  addToGroup = room => {
    console.log("added to room", room);
    socket.emit("joinGroup", room);
    alert("you joined the group");
  };

  componentDidMount = () => {};

  componentWillReceiveProps = nextProps => {
    let tempRooms = [...this.state.chatRooms];
    console.log(nextProps.roomList);

    nextProps.roomList.forEach(grp => {
      let roomIndex = tempRooms.findIndex(room => room === grp);
      if (roomIndex === -1) {
        tempRooms.push(grp);
        return;
      }
    });

    console.log(tempRooms);
    this.setState({ chatRooms: tempRooms });
  };

  render() {
    console.log(this.props.roomList);
    return (
      <div className="user">
        <ul className="ulist">
          {this.props.userlist.map((user, index) => (
            <NavLink
              className="active-link"
              to={`${this.props.match.path}/${user}`}
              key={index}
            >
              <li className="name-list" key={index}>
                {user}
              </li>
            </NavLink>
          ))}
        </ul>
        <Button buttonText="Logout" onClick={this.handleLogout} />
        <Button buttonText="Broadcast" onClick={this.handleRoute} />
        <Button buttonText="Create Group" onClick={this.handlePopUpDisplay} />

        <ul className="ulist">
          {this.state.chatRooms.map((room, index) => (
            <div
              key={Math.random()
                .toString(36)
                .substring(2, 15)}
            >
              <NavLink
                className="active-link"
                to={`${this.props.match.path}/group/${room}`}
                key={Math.random()
                  .toString(36)
                  .substring(2, 15)}
              >
                <li
                  className="group-list"
                  key={Math.random()
                    .toString(36)
                    .substring(2, 15)}
                >
                  {room}
                </li>
              </NavLink>
              <Icon
                key={Math.random()
                  .toString(36)
                  .substring(2, 15)}
                type="plus-circle"
                className="add-icon"
                onClick={() => this.addToGroup(room)}
              />
            </div>
          ))}
        </ul>

        {this.state.showPopup ? (
          <PopupForm
            text="Enter Group Name"
            handleChatRoomState={this.handleChatRoomState}
            handleClose={this.handleClose}
          />
        ) : null}
      </div>
    );
  }
}

export default withRouter(UserList);
