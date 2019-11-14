import React, { Fragment } from "react";
import "./form.css";

import Button from "../button/Button";
import { Icon } from "antd";

export default function Form({ handleChange, msgValue, sendMessage }) {
  const handleSubmit = event => {
    event.preventDefault();
    document.querySelector(".msg-form").reset();
  };

  return (
    <Fragment>
      <form className="msg-form" onSubmit={handleSubmit}>
        <input
          className="message-field"
          type="text"
          onChange={handleChange}
          value={msgValue}
        />
        <button className="send-btn" onClick={sendMessage}>
          Send
        </button>
      </form>
    </Fragment>
  );
}
