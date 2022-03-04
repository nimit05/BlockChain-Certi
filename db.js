var mongoose = require("mongoose");

var User = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: true
  },
  email: {
    type: String,
    index: true,
    unique: true
  },
  password: {
    type: String,
    index: true
  }
});

var Item = mongoose.model('User', User);

module.exports = {
  User: Item
}