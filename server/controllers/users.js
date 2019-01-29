const User = require('../models/user');
const bcrypt = require('bcryptjs');
const config = require('../config');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const emailValidator = require('email-validator');
const tutorController = require('./tutor');
const studentController = require('./student');

// Password Validator Schema
let schema = new passwordValidator();
schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()
    .has().symbols();


module.exports = {
    create(req, res) {
        // Check against password requirements
        let passwordErrors = schema.validate(req.body.password, {list: true});
        if(passwordErrors.length > 0 ){
            return res
                    .status(400).send({error: passwordErrors})
        }
        // Check for well-formed email
        if(!emailValidator.validate(req.body.email)){
            return res
                    .status(400).send({error: "Bad email"});
        }
        // See if username is taken
        User.findOne({
            where: {title: req.body.username}
        }).then(user => {
            if(user){
                return res
                    .status(409)
                    .send({error: "Username already exists"})
            }
        })
        // Encrypt password and create user
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash){
                return User.create({
                    username: req.body.username,
                    password: hash,
                    email: req.body.email,
                    tutor: req.body.isTutor
                })
                .then(user => {
                    if (user.tutor){
                        tutorController.create(req.body.firstName, req.body.lastName, user.id);
                    } else {
                        studentController.create(req.body.firstName, req.body.lastName, user.id);
                    }
                    let tokenBody = {
                        id: user.id,
                        username: user.username,
                        tutor: user.tutor
                    }
                    return jwt.sign(tokenBody, config.secret, {
                        expiresIn: 1209600 // 2 weeks
                    })
                })
                .then(token => res.status(201).send(token))
                .catch(err => res.status(500).send(err));
            })
        })
    },

    login(req, res) {
        // Find user
        User.findOne({
            where: {title: req.body.username}
        }).then(user => {
            if(!user){
                res.status(401).send({auth: false, error: "Invalid Username / Password"});
            } else{
                // Decrypt password
                bcrypt.compare(req.body.password, user.password)
                .then((response) => {
                    // Create token and pass to user
                    if(response){
                        tokenBody = {
                            id: user.id,
                            username: user.username,
                            tutor: req.body.tutor
                        }
                        token = jwt.sign(tokenBody, config.secret, {
                            expiresIn: 1209600 // 2 weeks
                        });
                        return res
                            .status(200)
                            .send({ auth: true, token: token });
                    } else {
                        // Failed login
                        return res
                        .status(401)
                        .send({
                            auth: false,
                            error: "Invalid Username / Password"
                        })
                    }
                })
            }
        })
    }
}