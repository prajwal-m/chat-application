import React from "react";
import "./individualtext.css";

export default function IndividualText({ msgObj, index }) {
  return (
    <div key={index}>
      <p className="message-data">
        <strong>{msgObj.sender} : </strong>
        {msgObj.message}
      </p>
    </div>
  );
}
