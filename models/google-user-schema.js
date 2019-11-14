const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let googleUserSchema = new Schema(
  {
    fullname: {
      type: String
    },
    name: {
      type: String
    },
    email: {
      type: String
    }
  },
  {
    collection: "googleusers"
  }
);

module.exports = mongoose.model("GoogleUsers", googleUserSchema);
