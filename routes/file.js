const express = require("express");
const fileRouter = express.Router();
const fileController = require("../server/controllers/file");
const verifyToken = require("../server/auth/VerifyToken");

// Retrieves file information
// Parameter: Id
fileRouter.get("/:id", verifyToken, fileController.getFile)
// Creates a file
// Parameter: Name, Type, projectId
fileRouter.post("/create", verifyToken, fileController.create)

module.exports = fileRouter;