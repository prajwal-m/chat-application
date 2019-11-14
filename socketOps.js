let mongoose = require("mongoose"),
  express = require("express");

let chats = require("./models/chat-schema"),
  user = require("./models/user-schema");

const allSocketOps = io => {
  const userData = {},
    privateList = [],
    userList = [],
    rooms = [];

  io.on("connection", socket => {
    console.log("New client connected");

    socket.on("addUser", name => {
      socket.username = name;
      console.log(socket.id);
      userData[name] = socket.id;
      userList.push({ username: name, socketID: socket.id });
      console.log(userData);
      io.emit("addUser", userData);
    });

    socket.on("chat message", (msg, username) => {
      let chatRecord = new chats({
        sender: username,
        message: msg,
        reciever: "all"
      });
      chatRecord.save(function(err, chatData) {
        if (err) return console.error(err);
        console.log("saved to collection.");
      });

      io.emit("chat message", msg, username, "all");
    });

    socket.on("private", (pvtMsg, sender, reciever) => {
      let senderId = userData[String(reciever)];
      let recieverId = userData[String(sender)];

      let sid = userList.filter(
        elem => elem.username === sender || elem.username === reciever
      );

      let privateRecord = new chats({
        sender: sender,
        message: pvtMsg,
        reciever: reciever
      });
      privateRecord.save(function(err, chatData) {
        if (err) return console.error(err);
        console.log("saved to collection.");
      });
      privateList.push({ sender: sender, message: pvtMsg, reciever: reciever });

      sid.forEach(elm =>
        io
          .to(`${elm.socketID}`)
          .emit("private", pvtMsg, sender, reciever, privateList)
      );

      // io.to(`${senderId}`).emit(
      //   "private",
      //   pvtMsg,
      //   sender,
      //   reciever,
      //   privateList
      // );
      // io.to(`${recieverId}`).emit(
      //   "private",
      //   pvtMsg,
      //   sender,
      //   reciever,
      //   privateList
      // );
    });

    socket.on("addRoom", roomName => {
      rooms.push(roomName);
      console.log(rooms);
      io.emit("addRoom", rooms);
    });

    socket.on("joinGroup", room => {
      socket.join(room);
      console.log(socket.id + "joined" + room);
    });

    socket.on("groupMessage", (groupName, msg, sender) => {
      console.log("sending messages to groups");
      io.to(groupName).emit("groupMessage", msg, sender, groupName);
    });

    // disconnect is fired when a client leaves the server
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
module.exports = {
  allSocketOps
};
