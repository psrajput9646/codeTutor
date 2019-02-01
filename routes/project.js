const express = require("express");
const projectRouter = express.Router();
const projectController = require("../server/controllers/project");
const verifyToken = require("../server/auth/VerifyToken");

// Retrieves Project
// Parameter: Id
projectRouter.get("/:id", verifyToken, projectController.getProject)

// Creates a Project
// Parameters: name, studentId (grabbed from token)
projectRouter.post("/create", verifyToken, projectController.create)

module.exports = projectRouter;