import React, { Component } from "react";
import "./privatedashboard.css";

import ChatList from "../../components/chatlist/ChatList";
import Form from "../../components/form/Form";

import { DataHandle } from "../../utils/dataHandler";
import { APICONSTANTS } from "../../constants/api";

import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:4000");

class PrivateDashboard extends Component {
  state = {
    sender: "",
    reciever: "",
    messageList: [],
    message: "",
    newList: [],
    tempList: []
  };

  handleChange = ({ target }) => {
    this.setState({ message: target.value });
  };

  handleChatState = data => {
    let pvtConversation = data.filter(elem => this.handleIncomingMsg(elem));
    this.setState({ messageList: pvtConversation });
  };

  handleIncomingMsg = elem => {
    if (this.state.reciever !== this.state.sender) {
      return (
        (elem.sender === this.state.sender ||
          elem.reciever === this.state.sender) &&
        (elem.sender === this.state.reciever ||
          elem.reciever === this.state.reciever)
      );
    } else {
      return (
        elem.sender === this.state.sender && elem.reciever === this.state.sender
      );
    }
  };

  componentDidMount = () => {
    const recieverName = this.props.match.url.split("/");
    let recName = recieverName[2];
    this.setState({ reciever: recName });

    let nameOfUser = JSON.parse(localStorage.getItem("userData"));

    this.setState({ sender: nameOfUser });

    DataHandle.getData(APICONSTANTS.GET_CHATS, this.handleChatState);
  };

  sendIndividualMessage = () => {
    socket.emit(
      "private",
      this.state.message,
      this.state.sender,
      this.state.reciever
    );
    let showTxt = [...this.state.messageList];
    let chatObj = {
      sender: this.state.sender,
      message: this.state.message,
      reciever: this.state.reciever
    };
    showTxt.push(chatObj);
  };

  componentDidUpdate = prevProps => {
    let prevPropName = prevProps.history.location.pathname.split("/");
    if (this.state.reciever !== prevPropName[2]) {
      this.setState({ reciever: prevPropName[2] });
      DataHandle.getData(APICONSTANTS.GET_CHATS, this.handleChatState);
    }
  };

  componentWillReceiveProps = nextProps => {
    let finList = [...this.state.messageList];
    let incMsg = nextProps.pvtMsg; // incoming private messages
    let msgFinal = incMsg.filter(elem => this.handleMsg(elem));

    msgFinal.forEach(msg => {
      let msgIndex = finList.findIndex(
        eachMsg =>
          eachMsg.sender === msg.sender && eachMsg.message === msg.message
      );
      if (msgIndex === -1) {
        finList.push(msg);
        return;
      }
    });
    this.setState({ messageList: finList });
  };

  handleMsg = elem => {
    if (this.state.reciever !== this.state.sender) {
      return (
        (elem.sender === this.state.sender ||
          elem.receiver === this.state.sender) &&
        (elem.sender === this.state.reciever ||
          elem.receiver === this.state.reciever)
      );
    } else {
      return (
        elem.sender === this.state.sender && elem.receiver === this.state.sender
      );
    }
  };

  render() {
    return (
      <div className="private-dashboard">
        <div className="list-message">
          <h2 className="private-header">{this.state.reciever}</h2>
          <ChatList listText={this.state.messageList} />
          <Form
            handleChange={this.handleChange}
            value={this.state.message}
            sendMessage={this.sendIndividualMessage}
          />
        </div>
      </div>
    );
  }
}

export default PrivateDashboard;
