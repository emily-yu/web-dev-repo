const mongoose = require('mongoose')

const dogSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 1,
		unique: true
	},
	age: {
		type: Number,
		required: true
	},
	description: {
		type: String, 
		default: null
	},
	image: {
		type: String,
		default: 'https://www.dog-on-it-parks.com/images/z7294-Beagle-copy.jpg'
	},
	personality: {
		type: String,
		default: null
	}
})

const Dog = mongoose.model('Dog', dogSchema)

module.exports = {
	Dog
}