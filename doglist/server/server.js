const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const _ = require('lodash');
const path = require('path');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');

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
// default options
app.use(fileUpload());

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

app.get('/dogs/new/:hidden', (req, res) => {
	console.log('/dogs/new')
	res.render('show.hbs', {
		name: req.query.name || '',
		age: req.query.age || '',
		description: req.query.description || '',
		image: req.query.image || '',
		personality: req.query.personality || '',
		hidden: req.params.hidden
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

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
 
 	console.log(path.join(__dirname, '../app/views/images/' + req.body.name + '.jpg'))
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(path.join(__dirname, '../app/views/images/' + req.body.name + '.jpg'), function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.redirect('/')
  });
});

app.listen(port, () => {
	console.log('listening on port' + port)
})