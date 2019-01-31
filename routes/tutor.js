const express = require("express");
const tutorRouter = express.Router();
const tutorController = require("../server/controllers/tutor");
const verifyToken = require("../server/auth/VerifyToken");
const verifyTutor = require("../server/auth/VerifyTutor");

// Retrieves tutor information - including students
// Parameter: userId (foreign key)
tutorRouter.get("/:id", verifyToken, verifyTutor, tutorController.getTutor)

module.exports = tutorRouter;