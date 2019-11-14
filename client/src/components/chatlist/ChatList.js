import React from "react";
import IndividualText from "../individualText/IndividualText";
import "./chatlist.css";
import PropTypes from "prop-types";

const ChatList = ({ listText }) => {
  return (
    <div className="chat-item">
      {listText.map((msgObj, index) => (
        <IndividualText msgObj={msgObj} key={index} />
      ))}
    </div>
  );
};

ChatList.propTypes = {
  listText: PropTypes.array
};

ChatList.defaultProps = {
  listText: []
};

export default ChatList;
