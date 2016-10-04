var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;
var ObjectId = mongoose.ObjectId;

var UserSchema = new Schema({
  username: String,
  password: String,
  createdAt: Date
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
