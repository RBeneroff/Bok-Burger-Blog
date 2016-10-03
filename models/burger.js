var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var burgerSchema = new Schema({
  restaurantName: String,
  burgername: String,
  typeOfMeat: String,
  rating: Number,
  review: String,
  postedAt: new Date();
  updatedAt: Date,
  burgerPic: URL,
});

burgerSchema.plugin(require('passport-local-mongoose'));

module.exports = mongoose.model('Burger', burgerSchema);
