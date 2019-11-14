let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let chats = require("../models/chat-schema");

router.route("/").get((req, res) => {
  chats.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
