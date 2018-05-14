// Citations
// https://github.com/Createdd/authenticationIntro

// SCHEMA
const mongoose = require('mongoose')
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/equipment');
var db = mongoose.connection;

// mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost:27017/equipment')
const hardwareSchema = mongoose.Schema({
	user: {
		type: String,
		default: null
	},
	isOut: {
		type: Boolean,
		default: false
	}
})
const Url = mongoose.model('hardware', hardwareSchema);

var User = require('./models/User.js');

// EXPRESS
const express = require('express')
const hbs = require('hbs')
const path = require('path')

hbs.registerPartials(path.join(__dirname, "views"));
const bodyParser = require('body-parser')
const app = express();
const port = process.env.port || 3000

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var routes = require('./routes/router.js');
app.use('/', routes);

app.listen(port, () => {
	console.log('Listening on port' + port)
})