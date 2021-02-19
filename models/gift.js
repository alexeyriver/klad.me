const mongoose = require("mongoose");
const { Types } = require("mongoose");

const Gift = mongoose.model('gifts', {
  name: String,
  description: String,
  location: String,
  img: String,
  author: { type: Types.ObjectId, ref: 'users' },
  flag: { type: Boolean, default: true },
  done: { type: String, default: 'create'},
  private:{type: Boolean, default:false }
  })

module.exports = Gift;
