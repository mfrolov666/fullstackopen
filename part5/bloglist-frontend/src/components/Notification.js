import React from "react";

const Notification = ({ message, state }) => {
  var style = {
    padding: "3px",
    color: "green",
    border: "2px solid green",
    borderRadius: "3px",
    backgroundColor: "WhiteSmoke",
  };
  if (state === 1) {
    style.color = "red";
    style.border = "2px solid red";
  }

  if (message === null) {
    return null;
  }

  return <div style={style}>{message}</div>;
};

export default Notification;
