var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var BurgerSchema = new Schema({
  restaurantName: String,
  burgername: String,
  typeOfMeat: String,
  rating: Number,
  review: String,
  postedAt: Date,
  updatedAt: Date,
  burgerPic: String,
});

var UserSchema = new Schema({
  username: String,
  password: String
});

var EmailSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String
});

BurgerSchema.plugin(require('passport-local-mongoose'));
UserSchema.plugin(require('passport-local-mongoose'));
EmailSchema.plugin(require('passport-local-mongoose'));

var BurgerModel = mongoose.model('Burger', BurgerSchema);
var UserModel = mongoose.model('User', UserSchema);
var EmailModel = mongoose.model('Email', EmailSchema);

module.exports = {
  Burger: BurgerModel,
  User: UserModel,
  Email: EmailModel
}
