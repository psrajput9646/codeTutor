const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
    create(req, res) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash){
                return User
                .create({
                    username: req.body.username,
                    password: hash,
                    tutor: req.body.isTutor
                })
                .then(user => res.status(201).send(user))
                .catch(error => res.status(400).send(error));
            })
        })
    },

    login(req, res) {

    }
}