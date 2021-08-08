module.exports = require('mongoose').connect(process.env.MONGODB_URI || 'mongodb://localhost/courier', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})