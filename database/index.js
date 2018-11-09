const mongoose = require('mongoose');
const keys = require('../config/keys');


mongoose.connect(keys.mongoDB.dbURI, { useNewUrlParser: true }, console.log('connected to db'));

const userSchema = mongoose.Schema({
  userID: String,
  userName: String
});

let User = mongoose.model('User', userSchema);

module.exports = User;