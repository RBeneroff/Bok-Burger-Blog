var express = require('express');
var router = express.Router();

var Schema = require('../models/schema.js');
var Burger = Schema.Burger
var User = Schema.User
var Email = Schema.Email

router.get('/', function(req,res) {
  res.send('Working?');
});





module.exports = router;
