const User = require('../models/user');
const bcrypt = require('bcryptjs');
const config = require('../config');
const jwt = require('jsonwebtoken');

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
        User.findOne({
            where: {title: req.body.username}
        }).then(user => {
            if(!user){
                res.status(401).send();
            } else{
                bcrypt.compare(req.body.password, user.password)
                .then((response) => {
                    if(response){
                        tokenBody = {
                            id: req.body.id,
                            username: req.body.username,
                            tutor: req.body.tutor
                        }
                        token = jwt.sign(tokenBody, config.secret, {
                            expiresIn: 1209600 // 2 weeks
                        });
                        return res
                            .status(200)
                            .send({ auth: true, token: token });
                    } else {
                        return res
                        .status(401)
                        .send({
                            auth: false
                        })
                    }
                })
            }
        })
    }
}