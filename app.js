// require modules
var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var logger = require('morgan');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
// instantiate new Express app:
var app = express();
// define view enginges and middleware:
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger('dev'));
app.use(methodOverride('method'));
app.use(express.static(__dirname + '/public'));
// specify mongo db:
mongoose.connect('mongodb://localhost/Bok-Burger-Blog');
var db = mongoose.connection;
//configure sessions & passport-local
app.use(require('express-session') ({
  secret: 'headphone horse',
  resave: false,
  saveUninitalized: false
}));
var User = require('./models/schema.js').User;
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//controllers
var ownersController = require('./controllers/ownersController.js');
app.use('/owner', ownersController);
var visitorsController = require('./controllers/visitorsController.js');
app.use('/visitor', visitorsController);

// save connection to db
db.on('error', function(err) {
  console.log(err);
});
// log - db connected if successful
db.once('open', function() {
  console.log('database successfully connected');
});

// basic root route '/': -- IS THIS RIGHT??
app.use('/', require('./controllers/visitorsController.js'));
app.use('/new', require('./controllers/ownersController.js'));

// instantiate node server:
app.listen(3000);
