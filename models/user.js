var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String
});

userSchema.plugin(require('passport-local-mongoose'));

module.exports = mongoose.model('User', userSchema);
