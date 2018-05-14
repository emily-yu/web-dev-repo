// SCHEMA
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/equipment')
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

// EXPRESS
const express = require('express')
const hbs = require('hbs')
const path = require('path')

hbs.registerPartials(path.join(__dirname, "views"));
const bodyParser = require('body-parser')
const app = express();
const port = process.env.port || 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.render('index.hbs')
})

app.listen(port, () => {
	console.log('Listening on port' + port)
})