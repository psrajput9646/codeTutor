var express = require('express');
var router = express.Router();
const userController = require('../server/controllers/users');
const verifyToken = require('../server/auth/VerifyToken');

// Creates user
// Parameters: username, password, email, firstName, lastName
router.post('/create', userController.create);

// Creates user
// Parameters: bio
router.post('/update', verifyToken, userController.update);

router.get('/:id', verifyToken, userController.getById);

module.exports = router;