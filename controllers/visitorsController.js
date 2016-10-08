var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');
var Schema = require('../models/schema.js');
var Burger = require('../models/schema.js').Burger;
var Email = Schema.Email

//for Admin
router.post('/register', function(req, res) {
  // console.log(req.user);
  User.register(
    new User({
      username: req.body.username,
      createdAt: new Date()
    }),
    req.body.password,
    function(err, user) {
      if (err)
        {
        return res.status(400).send('Could not register');
        }
        passport.authenticate('local')(req, res, function(){
          res.redirect('/');
          console.log(req.user);
        });
    });
});

//login for Admin
router.post('/login', passport.authenticate('local', {failureRedirect: '/'}), function(req, res) {
  req.session.save(function(err) {
    if (err) {return next(err);}
    User.findOne({username: req.session.passport.user}).exec()
    .then(function(user) {
      console.log(req.user);
      res.redirect('/');
    })
    .catch(function(err) {
      console.log('ERROR: ', err);
    })
  })
});

// Admin log out
router.delete('/logout', function(req, res) {
  console.log('logged out: ' + req.user);
  req.logout();
  res.redirect('/');
});

// if unauthorized
var authenticate = function(req, res, next) {
  if (!req.user || req.user.id != req.params.id) {
    res.json({status: 401, message: 'unauthorized'})
  } else {
    next()
  }
}

router.get('/', function(req, res) {
  // res.send('Working? HOME');
  // console.log(req.user);
  var query = User.find({});
  query.then(function(users) {
    res.render('visitor/homepage.hbs', { users: users, user: req.user});
  })
  .catch(function(err) {
    console.log(err)
  });
});

// Admin Sign Up page
router.get('/register', function(req, res) {
  // res.send('registering');
  res.render('visitor/adminSignUp.hbs');
});

//index by Res WORKING CODE
router.get('/joints', function(req, res) {
  console.log(req.user);
  var user = User.findById({id: req.params.id});
  if (req.user) {
    // console.log(req.user.username);
    var test = User.findOne({username: req.user.username});
    }

  var burger = Burger.find({}, null, {sort: {restaurantName: 1}}, function(err, burger){
    res.render('visitor/indexByRes.hbs', {burger: burger, user: user, test: test});
  });
});

router.get('/about', function(req, res) {
  res.render('visitor/about.hbs');
});

router.get('/about', function(req, res) {
  res.render('visitor/about.hbs');
});

//would like to move this to ownersController
router.get('/new', function(req, res) {
  // res.send('Working? NEW NEW');
  User.findOne({_id: req.params.id}).exec()
  .then(function(user) {
        // console.log(req.user);
    res.render('visitor/new.hbs', {user: User.findOne({_id: req.params.id})});
  });
});

// update burger
router.post('/joints', function(req, res) {
  // console.log(req.user);
  // var burgerId = req.params.id;
  var burger = new Burger({
    restaurantName: req.body.restaurantName,
    burgerName: req.body.burgerName,
    eatenOn: req.body.eatenOn,
    typeOfMeat: req.body.typeOfMeat,
    rating: req.body.rating,
    review: req.body.review,
    burgerPic: req.body.burgerPic
  });
  console.log(burger.burgerName);
  // console.log(burger.burgerId);
  burger.save(function(err, burger) {
    console.log(err);
    res.redirect('/joints');
  });
});

router.get('/burgers', function(req, res) {
  Burger.findById(req.params.id,
  function(err, burger) {
    res.render('visitor/indexByImg.hbs', burger);
  })
});

router.get('/email', function(req, res) {
  res.render('visitor/email.hbs');
});


// show page, with burgers & if Admin
router.get('/:id', function(req, res) {
    console.log(req.params.id); //grabs id
    var user = User.findById({id: req.params.id});
    if (req.user) {
      var test = User.findOne({username: req.user.username});
    }
    // console.log(req.burger.id);
  var burger = Burger.findById({_id:req.params.id},
    function(err, burger){
    res.render('visitor/show.hbs', { burger: burger, user: user, test: test});
  });
});

// WORKING UPDATE BURGER ROUTE
router.put('/:id', function(req, res) {
  console.log(req.params.id);
  var user = User.findById({id: req.params.id});
  if (req.user) {
    var test = User.findOne({username: req.user.username});
  }
  Burger.findByIdAndUpdate(req.params.id, {
      restaurantName: req.body.restaurantName,
      burgerName: req.body.burgerName,
      eatenOn: req.body.eatenOn,
      typeOfMeat: req.body.typeOfMeat,
      rating: req.body.rating,
      review: req.body.review,
      burgerPic: req.body.burgerPic
  }, {new: true}, function(err, burger) {
    res.render('visitor/show', {burger: burger, user: user, test: test});
  });
});

// delete route
router.delete('/:id', function(req, res) {
  Burger.findByIdAndRemove(req.params.id,
    function(err, burger) {
      if (err) console.log(err);
      console.log('Burger Deleted');
      res.redirect('/joints');
      // res.render('visitor/joints', {burger: burger});
  });
});

//would like to move this to ownersController
router.get('/:id/edit', function(req, res) {
  // res.send('Working? EDIT BURGER');
  // console.log(req.params.id);
  console.log(req.params.id);
  var burger = Burger.findById({_id:req.params.id}, function(err, burger){
    res.render('visitor/edit', {burger: burger});
  });
});


// emai list sign up update
router.post('/email', function(req, res) {
  var email = new Email ({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });
  console.log(email.email);
  email.save(function(err, email) {
    res.redirect('/joints');
  });
});

module.exports = router;
