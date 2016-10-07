var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var BurgerSchema = new Schema({
  restaurantName: String,
  burgerName: String,
  eatenOn: Date,
  typeOfMeat: String,
  rating: Number,
  review: String,
  postedAt: Date,
  updatedAt: Date,
  burgerPic: String,
});

var EmailSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String
});

var BurgerModel = mongoose.model('Burger', BurgerSchema);
var EmailModel = mongoose.model('Email', EmailSchema);

module.exports = {
  Burger : BurgerModel,
  Email: EmailModel
}
