var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var emailSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String
});

userSchema.plugin(require('passport-local-mongoose'));

module.exports = mongoose.model('User', userSchema);
