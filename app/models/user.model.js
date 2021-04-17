const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
	phoneno: String,
	username: String,
	pass: String,
	imageurl: String,
	logintype: String,
	dateofbirth: String,
	devicetype: String,
	devicetoken: String,
	fcmtoken: String,
	smtoken: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);