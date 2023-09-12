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

// ================== AUTH ROUTES ==================
	// ================== USER ROUTES ==================
	router.get("/api/users", UserController.index);
	router.get("/api/users/:id", UserController.show);

	// ================== AUTH ROUTES ==================
	router.post("/api/register", AuthController.registerV2);
	router.post("/api/login", AuthController.login);

	// ================== PROFILE ROUTES ===================
	router.put("/api/profile/:userId", UserController.updateProfile);

	// ==================RESET PASSWORD ROUTES===============
	router.put("/api/reset_password/:userId", AuthController.resetPassword);

	//=================VERIFY OTP=====================
	router.post("/api/verify_otp", AuthController.verifyOTP)

// ================== END AUTH ROUTES ==================


module.exports = router;
