var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');
var Schema = require('../models/schema.js');
var Burger = require('../models/schema.js').Burger;
var Email = Schema.Email


//for Admin -- must hard code later
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
          console.log(User.username);
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
  console.log(req.user);
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

// router.get('/joints', function(req, res) {
//   var user = User.findById({id: req.params.id});
//     // console.log(req.user);
//   // res.send('Working? JOINTS');
//     res.render('visitor/indexByRes.hbs', user);
// });

router.get('/joints', function(req, res) {
    console.log(req.user);
  // res.send('Working? JOINTS');
  User.findOne({_id: req.params.id}).exec()
  .then(function(user) {
    res.render('visitor/indexByRes.hbs', {user: User.findOne({_id: req.params.id})});
  });
});

router.get('/about', function(req, res) {
  // res.send('Working? ABOUT BOK');
  res.render('visitor/about.hbs');
});

//would like to move this to ownersController
router.get('/new', function(req, res) {
  // res.send('Working? NEW NEW');
  User.findOne({_id: req.params.id}).exec()
  .then(function(user) {
        console.log(req.user);
    res.render('visitor/new.hbs', {user: User.findOne({_id: req.params.id})});
  });
});

// update burgers
router.post('/joints', function(req, res) {
  console.log(req.user);
  var burgerId = req.params.id;
  var burger = new Burger({
    restaurantName: req.body.restaurantName,
    burgerName: req.body.burgerName,
    eatenOn: req.body.eatenOn,
    typeOfMeat: req.body.typeOfMeat,
    rating: req.body.rating,
    review: req.body.review,
    burgerPic: req.body.burgerPic
  });
  burger.save(function(err, newBurger) {
    console.log(burger.burgerName);
    res.redirect('/joints');
  });

  // User.findById(req.params.id, function(err, user) {
  //   user.burgers.push(new Burger({body: req.body.newBurger}))
  //   user.save(function(err) {
  //     res.redirect('/joints');
  //   })
  // })
});

router.get('/burgers', function(req, res) {
  res.render('visitor/indexByImg.hbs');
});

router.get('/email', function(req, res) {
  res.render('visitor/email.hbs');
});

router.get('/:id', function(req, res) {
  // res.send('Working? SHOW BURGER');
  res.render('visitor/show.hbs');
});

//would like to move this to ownersController
router.get('/:id/edit', function(req, res) {
  res.send('Working? EDIT BURGER');
  // res.render('visitor/_____/edit.hbs');
});




module.exports = router;
