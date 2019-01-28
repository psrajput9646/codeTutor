var express = require('express');
var router = express.Router();
const userController = require('../server/controllers/users');

/* GET users listing. */
router.post('/create', function(req, res, next) {
  userController.create(req, res);
});

module.exports = router;
