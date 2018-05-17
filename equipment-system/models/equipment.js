const mongoose = require('mongoose')

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

module.exports = Url;