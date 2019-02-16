var express = require('express');
var router = express.Router();
const userController = require('../server/controllers/users');

// Creates user
// Parameters: username, password, email, firstName, lastName
router.post('/create', function(req, res, next) {
  userController.create(req, res);
});

module.exports = router;
