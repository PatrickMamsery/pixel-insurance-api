// routes.js

const express = require('express');
const router = express.Router();
const AuthController = require('./../controllers/authController');
const UserController = require('./../controllers/userController');

// ================== MIDDLEWARE ==================
// router.use(express.json());

// ================== TEST ROUTES ==================
router.get("/", (req, res) => {
	  res.status(200).json({ message: "Welcome to the API" });
});

// ================== USER ROUTES ==================
router.get("/api/users", UserController.index);
router.get("/api/users/:id", UserController.show);

// ================== AUTH ROUTES ==================
router.post("/api/register", AuthController.register);
router.post("/api/login", AuthController.login);

// ================== PROFILE ROUTES ===================
router.put("/api/profile/:userId", UserController.updateProfile);

// ==================RESET PASSWORD ROUTES===============

module.exports = router;
