const express = require("express");
const projectRouter = express.Router();
const projectController = require("../server/controllers/project");
const verifyToken = require("../server/auth/VerifyToken");
const verifyProject = require("../server/auth/VerifyProject");

// Retrieves student information - including projects and file namess
// Parameter: userId (foreign key)
studentRouter.get("/:id", verifyToken, verifyStudent, studentController.getStudent)

module.exports = studentRouter;