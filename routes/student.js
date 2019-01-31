const express = require("express");
const studentRouter = express.Router();
const studentController = require("../server/controllers/student");
const verifyToken = require("../server/auth/VerifyToken");
const verifyStudent = require("../server/auth/VerifyStudent");

// Retrieves student information - including projects and file namess
// Parameter: userId (foreign key)
studentRouter.get("/:id", verifyToken, verifyStudent, studentController.getStudent)

module.exports = studentRouter;