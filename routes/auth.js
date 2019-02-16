const express = require("express");
const authRouter = express.Router();
const userController = require("../server/controllers/users");

// Logins the User
// Parameter: username, password
// Returns: token
authRouter.post("/login", function(req, res) {
    userController.login(req, res);
})

module.exports = authRouter;