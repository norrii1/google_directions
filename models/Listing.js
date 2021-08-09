const { model, Schema } = require('mongoose')

const Listing = new Schema({
  title: String,
  recieve: Boolean,
  send: Boolean,
  initialAddress: String,
  destination: String,
  datePosted: Date,
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
})

module.exports = model('Listing', Listing)
