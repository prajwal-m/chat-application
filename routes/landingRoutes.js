let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let googleUser = require("../models/google-user-schema"),
  user = require("../models/user-schema");

router.route("/").post((req, res, next) => {
  googleUser.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data) {
      console.log(data);
      res.json(data);
    } else {
      googleUser.create(req.body, (error, user) => {
        if (error) {
          return next(error);
        } else {
          res.json(user);
        }
      });
    }
  });
});

module.exports = router;
