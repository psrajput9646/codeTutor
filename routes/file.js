const express = require("express");
const fileRouter = express.Router();
const fileController = require("../server/controllers/file");
const projectController = require("../server/controllers/project");
const verifyToken = require("../server/auth/VerifyToken");

// Retrieves file information
// Parameter: Id
fileRouter.get("/:id", verifyToken, fileController.getFile)

// Creates a file
// Parameter: Name, Type, projectId
fileRouter.post("/create", verifyToken, fileController.create)

// Saves a file
   // Parameter: (file)id, content, userId (grabbed from token)
fileRouter.post("/save", verifyToken, fileController.save)

// Deletes a file
   // Parameter: (file)id, userId (grabbed from token)
fileRouter.post("/delete", verifyToken, fileController.delete)

module.exports = fileRouter;