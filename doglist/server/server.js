const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const _ = require('lodash');
const path = require('path');
const methodOverride = require('method-override');

const mongoose = require('mongoose');

const {Dog} = require('./models/dog.js');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../app/views'));
hbs.registerPartials(path.join(__dirname, '/app/views/partials'));

const port = process.env.PORT || 5000;
mongoose.Promise = global.Promise;
const database = process.env.MONGODB_URI || 'mongodb://localhost:27017/Doglist';
mongoose.connect(database)
	.then(() => {
console.log('connected');
}).catch(() => {
	console.log('unablve to conet');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../app/views')));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.redirect('/dogs');
});

app.get('/dogs', (req, res) => {
	console.log('get: /dogs')
	Dog.find()
	.then(data => {
		res.render('index.hbs', {
			response: data
		});
	}, e => {
		res.status(404).send(e)
	})
	// res.render('index.hbs')
})

app.get('/dogs/new', (req, res) => {
	console.log('/dogs/new')
	res.render('show.hbs', {
		name: req.query.name || '',
		age: req.query.age || '',
		description: req.query.description || '',
		image: req.query.image || '',
		personality: req.query.personality || ''
	})
})

app.get('/dogs/save', (req, res) => {
	console.log(req.query)
	Dog.findOneAndUpdate({'name': req.query.name}, req.query, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
	    res.redirect('/')
	});
})

app.get('/dogs/:id', (req, res) => {
	console.log('get: /dogs/:id')
	const name_input = req.params.id
	Dog.find({
		name: name_input
	}, function (err, data) {
		console.log(data)
	   res.render('new.hbs', {
	   		response: data[0]
	   })
	});
})

// only one not complete
app.get('/dogs/remove/:name', (req, res) => {
	Dog.remove({ name: req.params.name }, function(err) {
	    res.redirect('/')
	});
})

app.post('/dogs/new', (req, res) => {
	// res.send('POST /')
	console.log('post: /dogs/new')
	const dog = new Dog({
		name: 'asdf',
		age: 2,
		description: 'adsf',
		image: 'https://www.dog-on-it-parks.com/images/z7294-Beagle-copy.jpg', 
		personality: 'bad'
	})
	dog.save()
	.then(dog =>{
		res.send(dog)
	}).catch(e => {
		res.status(400).send()
	})
})

app.listen(port, () => {
	console.log('listening on port' + port)
})