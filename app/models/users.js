var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
	firstName: String,
	lastName: String,
	email: String,
	createdAt: Date
});

module.exports = mongoose.model('User', UserSchema); 