import React from "react";
import "./dashboard.css";

import UserList from "../../components/userlist/UserList";
import ChatList from "../../components/chatlist/ChatList";
import Form from "../../components/form/Form";
import PrivateDashboard from "../privateDashboard/PrivateDashboard";
import ChatRoom from "../../pages/chatroom/ChatRoom";
import { APICONSTANTS } from "../../constants/api";
import { DataHandle } from "../../utils/dataHandler";

import { Route, Switch, Router, withRouter } from "react-router-dom";
import { socket } from "../../utils/socketConn";

class Dashboard extends React.Component {
  state = {
    message: "",
    chatList: [],
    username: "",
    userlist: [],
    userObj: {},
    msgList: [],
    finalMsg: [],
    privateMsgs: [],
    privateList: [],
    prvObj: {},
    roomList: [],
    groupMsg: []
  };

  handleChatState = data => {
    let broadCastChat = data.filter(elem => elem.reciever === "all");
    this.setState({ finalMsg: broadCastChat });
  };

  componentDidMount = () => {
    let nameOfUser = JSON.parse(localStorage.getItem("userData"));

    this.setState({ username: nameOfUser }, () => {
      socket.emit("addUser", this.state.username);
    });

    DataHandle.getData(APICONSTANTS.GET_CHATS, this.handleChatState);

    socket.on("addUser", userData => {
      this.setState({ userObj: userData }, () => {
        console.log(this.state.userObj);
      });
    });

    let tempChat = [];

    socket.on("chat message", (msg, uname, receiver) => {
      tempChat = [...this.state.finalMsg];
      tempChat.push({ message: msg, sender: uname, receiver: receiver });
      this.setState({ finalMsg: tempChat });
    });

    let privateChat = [];
    socket.on("private", (pmsg, sender, receiver, privateList) => {
      console.log("inside private chat");
      privateChat = [...this.state.privateMsgs];
      tempChat = [...this.state.finalMsg];
      tempChat.push({ message: pmsg, sender: sender, receiver: receiver });
      privateChat.push({ message: pmsg, sender: sender, receiver: receiver });
      this.setState({ privateMsgs: privateChat,privateList: privateList,prvObj: { message: pmsg, sender: sender, receiver: receiver } });
      
    });

    socket.on("addRoom", roomList => {
      console.log("room added");
      console.log(roomList);
      this.setState({ roomList: roomList });
    });

    socket.on("groupMessage", (msg, sender, groupName) => {
      console.log("message group");
      console.log(msg);
      let tempGroup = [...this.state.groupMsg];
      tempGroup.push({ message: msg, sender: sender, receiver: groupName });
      this.setState({ groupMsg: tempGroup });
    });
  };

  handleChange = ({ target }) => {
    this.setState({ message: target.value });
  };

  sendMessage = () => {
    socket.emit("chat message", this.state.message, this.state.username);
  };

  sendPrivateMessage = (receiver, pvtMsg) => {
    socket.emit("private", pvtMsg, receiver, this.state.username);
  };

  render() {
    let ulist = Object.keys(this.state.userObj);
    return (
      <div className="dashboard">
        <h1 className="dashboard-header">Chat App</h1>
        <div className="wrapper">
          <div className="list-user">
            <UserList
              userlist={ulist}
              sendPrivateMessage={this.sendPrivateMessage}
              joinGroup={this.joinGroup}
              roomList={this.state.roomList}
            />
          </div>
          <Switch>
            <Route
              exact
              path="/dashboard"
              render={() => (
                <div className="list-message">
                  <ChatList listText={this.state.finalMsg} />
                  <Form
                    handleChange={this.handleChange}
                    value={this.state.message}
                    sendMessage={this.sendMessage}
                  />
                </div>
              )}
            />

            <Route
              exact
              path="/dashboard/group/:room"
              render={routeProps => (
                <ChatRoom {...routeProps} grpMsg={this.state.groupMsg} />
              )}
            />

            <Route
              path="/dashboard/:name"
              render={routeProps => (
                <PrivateDashboard
                  {...routeProps}
                  pvtMsg={this.state.privateMsgs}
                  pvtList={this.state.privateList}
                  prvObj={this.state.prvObj}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
