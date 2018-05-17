// URL SCHEMA
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/tinyurl-clone')
const UrlSchema = mongoose.Schema({
	shortenedUrl: {
		type: String,
		required: true,
		minlength: 1
	},
	originalUrl: {
		type: String,
		required: true
	}
})
const Url = mongoose.model('Url', UrlSchema);

var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('config').secret;

var UserSchema = new mongoose.Schema({
	username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
	email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},	email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
	bio: String,
	image: String,
	hash: String,
	salt: String
}, {timestamps: true});
UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});
UserSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};
UserSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	return this.hash === hash;
};

mongoose.model('User', UserSchema);

// EXPRESS
const express = require('express')
const hbs = require('hbs')
const path = require('path')
const open = require("openurl")
hbs.registerPartials(path.join(__dirname, "views"));
const bodyParser = require('body-parser')
const app = express();
const port = process.env.port || 3000
app.use(bodyParser.json())

// ROUTES

// The root route should redirect you to '/urls'
app.get('/', (req, res) => {
	res.redirect('/urls');
})

// link to create a new url which sends you to /urls/new.
// Below the link to create a new shortend url, display all of the shortened urls. Just have a link to each one with the text of the link being the shortend url.
// Make sure you pass all of your Urls to your hbs template as local variables. That way you can interpolate in the appropriate href property for each link (the href will be a link to the original url).
app.get('/urls', (req, res) => {
	Url.find()
	.then(response => {
		res.render('display.hbs', {
			data: response
		});
	}, e => {
		res.status(404).send(e)
	})
})

// Display a form to create a new shortened url. You should have one input box for the original url and one box for the new url. When you click submit, have it send a post request to '/urls'.
app.get('/urls/new', (req, res) => {
	res.render('new.hbs');
})

// https://stackoverflow.com/questions/44703803/nodejs-post-request-not-working
app.use(function(req, res, next) {
  var data = '';
  req.setEncoding('utf8');
    req.on('data', function(part) {      // while there is incoming data,
       data += part;                     // collect parts in `data` variable
    }); 

    req.on('end', function() {           // when request is done,
        req.raw_body = data;                 // save collected data in req.body
        next();
    });
});

// Grab the information off of req.params and create a new instance of Url (the mongoose model class that you created). Save it into your database and then redirect to '/'.
app.post('/urls', (req, res) => {
	const long = req.raw_body.split('=')[2]
	const short = req.raw_body.split('=')[1].split('&long')[0]

	const Data = new Url({
    	shortenedUrl: req.raw_body.split('=')[1].split('&long')[0],
    	originalUrl: req.raw_body.split('=')[2]
    })

	Data.save().then(doc => {
		res.redirect('/urls')
	}), e => {
		res.status(404).send(e)
	}
})

// Query your database for the Url object that has a shortenedUrl property that is equal to res.params.short. Then redirect to that Url object's originalURL property.
app.get('/:short', (req, res) => {
	const short = req.params.short
	Url.find({
		shortenedUrl: short
	}, function (err, response) {
	   res.redirect(response[0].originalUrl)
	});
})

app.listen(port, () => {
	console.log('Listening on port' + port)
})