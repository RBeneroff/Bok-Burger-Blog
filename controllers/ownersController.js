var express = require('express');
var router = express.Router();
var passport = require('passport');
// var User = require('../models/schems.js').User;

var Schema = require('../models/schema.js');
var Burger = Schema.Burger
var User = Schema.User
var Email = Schema.Email

router.get('/', function(req,res) {
  // res.send('Working? HOME');
  res.render('visitor/homepage');
});

router.get('/joints', function(req, res) {
  res.send('Working? JOINTS');
});

router.get('/burgers', function(req, res) {
  res.send('Working? BURGERS');
});

router.get('/about', function(req, res) {
  res.send('Working? ABOUT BOK');
});

router.get('/new', function(req, res) {
  res.send('Working? NEW NEW');
});

router.get('/:id', function(req, res) {
  res.send('Working? SHOW BURGER');
});

router.get('/:id/edit', function(req, res) {
  res.send('Working? EDIT BURGER');
})



module.exports = router;
