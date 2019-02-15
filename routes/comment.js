const express = require("express");
const commentRouter = express.Router();
const commentController = require("../server/controllers/comment");
const verifyToken = require("../server/auth/VerifyToken");

// Retrieves all comments
// Parameter: projectId
commentRouter.get("/comments:projectId", verifyToken, commentController.getComments)

// Creates a comment
// Parameter: userId, content, projectId
commentRouter.post("/create", verifyToken, commentController.create)

// Modifies Vote on a comment
//Parameters: userId, commentId
commentRouter.post("/vote", verifyToken, commentController.vote)

module.exports = commentRouter;