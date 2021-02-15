const Gift = mongoose.model('gifts', {
  name: String,
  description: String,
  location: String,
  img: String,
  author: [{ type: Types.ObjectId, ref: 'users' }]
})

module.exports = Gift;
