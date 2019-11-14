import React, { Component } from "react";
import "./chatroom.css";

import ChatList from "../../components/chatlist/ChatList";
import Form from "../../components/form/Form";

import { socket } from "../../utils/socketConn";

class ChatRoom extends Component {
  state = {
    message: "",
    grouptoSend: "",
    messageFromGroup: "",
    messageList: [],
    sender: ""
  };

  handleChange = ({ target }) => {
    this.setState({ message: target.value });
  };

  sendGroupMessage = () => {
    console.log("sent");
    socket.emit(
      "groupMessage",
      this.state.grouptoSend,
      this.state.message,
      this.state.sender
    );
  };

  componentDidMount = () => {
    const groupName = this.props.match.url.split("/");
    console.log(groupName[3]);
    this.setState({ grouptoSend: groupName[3] });

    let nameOfUser = JSON.parse(localStorage.getItem("userData"));

    this.setState({ sender: nameOfUser });
  };

  componentDidUpdate = prevProps => {
    let prevPropName = prevProps.history.location.pathname.split("/");
    console.log(prevProps);
    console.log(prevPropName[3]);
    if (this.state.grouptoSend !== prevPropName[3]) {
      this.setState({ grouptoSend: prevPropName[3] });
      console.log("inside update");
      console.log(prevProps.grpMsg);
      let stateGroupMsg = [...this.state.messageList]
    let groupTexts = [];
     groupTexts = prevProps.grpMsg.filter(elem => elem.receiver === prevPropName[3]);
    console.log(groupTexts);
    this.setState({messageList:groupTexts});
    }
  };

  componentWillReceiveProps = nextProps => {
    console.log(nextProps.grpMsg);
    let stateGroupMsg = [...this.state.messageList]
    let groupTexts = [];
    if(nextProps.grpMsg){
      groupTexts = nextProps.grpMsg.filter(elem => elem.receiver === this.state.grouptoSend);
    }
    groupTexts.forEach(msg => {
       let msgIndex = stateGroupMsg.findIndex(
        eachMsg =>
          eachMsg.sender === msg.sender && eachMsg.message === msg.message
      );
      if (msgIndex === -1) {
        stateGroupMsg.push(msg);
        return;
      }
    })
    console.log(groupTexts);
    console.log(stateGroupMsg);
    this.setState({ messageList: stateGroupMsg });
  };

  render() {
    return (
      <div className="chat-room">
        <div className="list-message">
          <h2 className="group-header">{this.state.grouptoSend}</h2>
          {this.state.messageList ? (
            <ChatList listText={this.state.messageList} />
          ) : null}
          <Form
            handleChange={this.handleChange}
            value={this.state.message}
            sendMessage={this.sendGroupMessage}
          />
        </div>
      </div>
    );
  }
}

export default ChatRoom;
