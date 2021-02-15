///users model
const mongoose = require("mongoose");
const { Types } = require("mongoose");

const User = mongoose.model('users', {
  name: String,
  email: String,
  password: String,
  createdGift: [{ type: Types.ObjectId, ref: 'gifts' }],
  recievedGift: [{ type: Types.ObjectId, ref: 'gifts' }]
})

module.exports = User;
