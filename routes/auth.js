const express = require("express");
const authRouter = express.Router();
const userController = require("../server/controllers/users");

authRouter.post("/login", function(req, res) {
    userController.login(req, res);
})

module.exports = authRouter;