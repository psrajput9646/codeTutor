const express = require("express");
const projectRouter = express.Router();
const projectController = require("../server/controllers/project");
const verifyToken = require("../server/auth/VerifyToken");

// Retrieves Project
// Parameter: Id
projectRouter.get("/:id", verifyToken, projectController.getProjectById)

// Retrieves Projects owned by a particular user
// Parameter: userId
projectRouter.get("/projects:userId", verifyToken, projectController.getProjectsByUserId)

// Creates a Project
// Parameters: name, userId (grabbed from token)
projectRouter.post("/create", verifyToken, function(req, res, next) {
    projectController.create(req, res);
  })

// Deletes a Project and its files
// Parameter: projectId, userId (grabbed from token)
projectRouter.post("/delete", verifyToken, projectController.delete)

module.exports = projectRouter;