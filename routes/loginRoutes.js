let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let user = require("../models/user-schema");

router.route("/").get((req, res) => {
  user.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route("/").post((req, res) => {
  let username = req.body.name,
    password = req.body.password;

  user.findOne({ name: username }, function(err, user) {
    if (err) {
      console.log(err);
    }
    console.log(user);
    try {
      user.comparePassword(password, function(err, isMatch) {
        if (err) throw err;
        console.log(password, isMatch);
        if (isMatch) {
          res.json(user);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
});

module.exports = router;
