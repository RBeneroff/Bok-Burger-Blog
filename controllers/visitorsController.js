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

// router.get('/joints', function(req, res) {
//   var user = User.findById({id: req.params.id});
//     // console.log(req.user);
//   // res.send('Working? JOINTS');
//     res.render('visitor/indexByRes.hbs', user);
// });

// Index by Restaurant //WORKING CODE
router.get('/joints', function(req, res) {
  // if (User.username === 'test') {
    var test = User.find({username: 'req.user.username'});
      // console.log(test);
    // }
  var burger = Burger.find({}, function(err, burger){
    res.render('visitor/indexByRes.hbs', {burger: burger, test: test});
  });
});

router.get('/about', function(req, res) {
  res.render('visitor/about.hbs');
});


// router.get('/joints', function(req, res) {
//   var test = User.findOne({username: 'test'})
//   .then(function() {
//     var burger = Burger.find({}, function(err, burger){
//       console.log(test);
//       res.render('visitor/indexByRes.hbs', {burger: burger, test: test});
//     })});
// });

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

// update/create burgers
// router.post('/joints', function(req, res) {
//   console.log(req.user);
//   var burgerId = req.params.id;
//   var burger = new Burger({
//     restaurantName: req.body.restaurantName,
//     burgerName: req.body.burgerName,
//     eatenOn: req.body.eatenOn,
//     typeOfMeat: req.body.typeOfMeat,
//     rating: req.body.rating,
//     review: req.body.review,
//     burgerPic: req.body.burgerPic
//   });
//   console.log(burger.burgerName);
//   burger.save(function(err, burger) {
//     res.redirect('/joints');
//   });

// working code -- except not updating and deleting properly - changes first burger only
// router.post('/joints', function(req, res) {
//   // console.log(req.user);
//   var burgerId = req.params.id;
//   var burger = new Burger({
//     restaurantName: req.body.restaurantName,
//     burgerName: req.body.burgerName,
//     eatenOn: req.body.eatenOn,
//     typeOfMeat: req.body.typeOfMeat,
//     rating: req.body.rating,
//     review: req.body.review,
//     burgerPic: req.body.burgerPic
//   });
//   console.log(burger.burgerName);
//   console.log(burger.burgerId);
//   burger.save(function(err, burger) {
//     res.redirect('/joints');
//   });
// });

// code i'm working on -- fix burger bug
router.post('/joints', function(req, res) {
  // console.log(req.user);
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
  console.log(burger.burgerName);
  console.log(burger.burgerId);
  burger.save(function(err, burger) {
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

router.get('/:id', function(req, res) {
  // res.send('Working? SHOW BURGER');
    console.log(req.params.id); //grabs id
    // console.log(req.burger.id);
  var burger = Burger.findById({_id:req.params.id}, function(err, burger){
    res.render('visitor/show.hbs', { burger: burger});
  });
});

//updating first one only -- no matter which one you click on // WORKING CODE
// router.put('/:id', function(req, res) {
//   console.log(req.params.id);
//   var burger = Burger.findOneAndUpdate( req.params.id, {
//     restaurantName: req.body.restaurantName,
//     burgerName: req.body.burgerName,
//     eatenOn: req.body.eatenOn,
//     typeOfMeat: req.body.typeOfMeat,
//     rating: req.body.rating,
//     review: req.body.review,
//     burgerPic: req.body.burgerPic
//   }, {new: true}, function(err, burger) {
//     res.render('visitor/show', {burger: burger});
//   });
// });


// WORKING UPDATE BURGER ROUTE
router.put('/:id', function(req, res) {
  console.log(req.params.id);
  Burger.findByIdAndUpdate(req.params.id, {
      restaurantName: req.body.restaurantName,
      burgerName: req.body.burgerName,
      eatenOn: req.body.eatenOn,
      typeOfMeat: req.body.typeOfMeat,
      rating: req.body.rating,
      review: req.body.review,
      burgerPic: req.body.burgerPic
  }, {new: true}, function(err, burger) {
    res.render('visitor/show', {burger: burger});
  });
});

// // delete burger --not working
// router.delete('/:id', function(req, res) {
//   var burger = Burger.findById({_id:req.params.id}, function(err, burger){
//     res.redirect('/joints', {burger: burger});
//   });
// });

//delete route -- not working
// router.delete('/:id', function(req, res) {
//   Burger.findByIdAndRemove(req.params.id,
//     function(err, burger) {
//       if (err) console.log(err);
//       console.log('Burger Deleted');
//       res.redirect('/joints', {burger: burger});
//       // res.render('visitor/joints', {burger: burger});
//   });
// });

//WORKING delete route
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

    // res.render('visitor/' + req.params.id + '/edit', {burger: burger});


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
