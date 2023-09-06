const express = require("express");
const path = require("path");

const AuthController = require(path.join(__dirname, "..", "controllers", "auth"));

const router = express.Router();

// ========= AUTH ROUTES =========

// GET all users
router.post("/register", AuthController.register);

// GET a single user
router.post("/login", AuthController.login);

module.exports = router;
