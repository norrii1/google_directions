const { model, Schema } = require('mongoose')

const User = new Schema({
  name: String,
  email: String,
  listings: [{
    type: Schema.Types.ObjectId,
    ref: 'Listing'
  }],
  history: [{
    type: Schema.Types.ObjectId,
    ref: 'Listing'
  }]
})

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)