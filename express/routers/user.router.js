const express = require("express");
const path = require("path");

const UserController = require(path.join(__dirname, "..", "controllers", "userController"));

const router = express.Router();

// ========= USER ROUTES =========

// GET all users
router.get("/", UserController.index);

// GET a single user
router.get("/:id", UserController.show);

module.exports = router;
