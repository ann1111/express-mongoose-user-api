const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body.pass) {
        return res.status(400).send({
            pass: "Please enter password"
        });
    }

    // Create a User
    const user = new User({
        name: req.body.name || "Untitled", 
        email: req.body.email,
		phoneno: req.body.phoneno,
		username: req.body.username,
		pass: req.body.password,
		imageurl: req.body.imageurl,
		logintype: req.body.logintype,
		dateofbirth: req.body.dateofbirth,
		devicetype: req.body.devicetype,
		devicetoken: req.body.devicetoken,
		fcmtoken: req.body.fcmtoken,
		smltoken: req.body.smltoken,
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

// Retrieve and return all user from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Data."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};


// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
		name: req.body.name || "Untitled", 
        email: req.body.email,
		phoneno: req.body.phoneno,
		username: req.body.username,
		password: req.body.password,
		imageurl: req.body.imageurl,
		logintype: req.body.logintype,
		dateofbirth: req.body.dateofbirth,
		devicetype: req.body.devicetype,
		devicetoken: req.body.devicetoken,
		fcmtoken: req.body.fcmtoken,
		fcmtoken: req.body.fcmtoken
		
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};