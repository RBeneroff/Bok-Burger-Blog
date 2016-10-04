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
  res.render('visitor/homepage.hbs');
});

router.get('/joints', function(req, res) {
  // res.send('Working? JOINTS');
  res.render('visitor/indexByRes.hbs');
});

router.get('/burgers', function(req, res) {
  // res.send('Working? BURGERS');
  res.render('visitor/indexByImg.hbs');
});

router.get('/about', function(req, res) {
  // res.send('Working? ABOUT BOK');
  res.render('visitor/about.hbs');
});

//would like to move this to ownersController
router.get('/new', function(req, res) {
  // res.send('Working? NEW NEW');
  res.render('owner/new.hbs');
});

router.get('/:id', function(req, res) {
  // res.send('Working? SHOW BURGER');
  res.render('visitor/show.hbs');
});

//would like to move this to ownersController
router.get('/:id/edit', function(req, res) {
  res.send('Working? EDIT BURGER');
  // res.render('owner/_____/edit.hbs');
});




module.exports = router;
