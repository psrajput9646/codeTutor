const User = require("../models").user;
const Project = require("../models").project;
const Comment = require("../models").comment;
const File = require("../models").file;
const bcrypt = require("bcryptjs");
const config = require("../config");
const jwt = require("jsonwebtoken");
const passwordValidator = require("password-validator");
const emailValidator = require("email-validator");
const mkdirp = require("mkdirp");

// Password Validator Schema
let schema = new passwordValidator();
schema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces()
  .has()
  .symbols();

module.exports = {
  create(req, res) {
    // Check against password requirements
    let passwordErrors = schema.validate(req.body.password, { list: true });
    if (passwordErrors.length > 0) {
      return res.status(400).send({ error: passwordErrors });
    }
    // Check for well-formed email
    if (!emailValidator.validate(req.body.email)) {
      return res.status(400).send({ error: "Bad email" });
    }

    // See if username is taken
    User.findOne({
      where: { username: req.body.username }
    }).then(user => {
      if (user) {
        return res.status(409).send({ error: "Username already exists" });
      }
    
      // Encrypt password and create user
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          User.create({
            username: req.body.username,
            password: hash,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
          })
            .then(user => {
              let tokenBody = {
                id: user.id,
                username: user.username
              };
              return mkdirp("projects/" + user.id, err => {
                if (err) {
                  throw new Error(err);
                } else {
                  let token= jwt.sign(tokenBody, config.secret, {
                    expiresIn: 1209600 // 2 weeks
                  });
                  res.status(201).send({ auth: true, token })
                }
              })
            })
            .catch(err =>{
              res.status(500).send(err)
            });
        });
      });
    });
  },

  // Parameter: id
  getById(req, res) {
    User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Project,
          include: [File]
        }
      ],
      order: [[Project, "createdAt", "DESC"]]
    })
    .then(user => {
      res.status(200).send(user)
    })
    .catch(err => {
      res.status(500).send(err)
    })
  },

  update(req, res) {
    User.findOne({
      where: { id: req.decoded.id },
      include: [
        {
          model: Project,
          order: [["createdAt", "DESC"]]
        }
      ]
    })
      .then(user => {
        let index;
        if(user.favoritedProjects === null){
          index = -1;
          user.favoritedProjects = [];
        }else{
          index = user.favoritedProjects.indexOf(req.body.projectId);
        }
        if(index === -1){
          user.favoritedProjects.push(req.body.projectId);
        }else{
          user.favoritedProjects.splice(index, 1);
        }
        user.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            bio: req.body.bio,
            favoritedProjects: user.favoritedProjects
          },
          {
            fields: req.body.fields
          })
          .then(user => {
            res.status(200).send(user);
          })
          .catch(err => {
            console.log(err);
            res.status(500).send(err);
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  login(req, res) {
    // Find user
    User.findOne({
      where: { username: req.body.username }
    }).then(user => {
      if (!user) {
        res
          .status(401)
          .send({ auth: false, error: "Invalid Username / Password" });
      } else {
        // Decrypt password
        bcrypt.compare(req.body.password, user.password).then(response => {
          // Create token and pass to user
          if (response) {
            let tokenBody = {
              id: user.id,
              username: user.username
            };
            let token = jwt.sign(tokenBody, config.secret, {
              expiresIn: 1209600 // 2 weeks
            });
            return res.status(200).send({ auth: true, token: token });
          } else {
            // Failed login
            return res.status(401).send({
              auth: false,
              error: "Invalid Username / Password"
            });
          }
        });
      }
    });
  }
};
