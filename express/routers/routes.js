// routes.js

const express = require('express');
const router = express.Router();
const AuthController = require('./../controllers/authController');
const UserController = require('./../controllers/userController');
const PackageController = require('./../controllers/insurancePackageController');

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

// ================== MISC ROUTES ==================
	// ================== ROLES ROUTES ==================
	router.get("/api/roles", UserController.indexRoles);
	router.get("/api/roles/:id", UserController.showRole);
	router.post("/api/roles", UserController.storeRole);
	router.put("/api/roles/:id", UserController.updateRole);
	router.delete("/api/roles/:id", UserController.destroyRole);

	// ================== PACKAGE ROUTES ==================
	router.get("/api/packages", PackageController.index);
	router.get("/api/packages/:id", PackageController.show);
	router.post("/api/packages", PackageController.store);
	router.put("/api/packages/:id", PackageController.update);
	router.delete("/api/packages/:id", PackageController.destroy);

	// ================== CLAIM ROUTES ==================
	// For Dashboard use
	router.get("/api/claims", ClaimController.index);
	router.get("/api/claims/:id", ClaimController.show);

	// For User use
	router.get("/api/user/:id/claims", ClaimController.indexUserClaims);
	router.get("/api/user/:id/claims/:id", ClaimController.showUserClaim);

	// TODO: Add authentication middleware to the routes below, customize it to user
	router.post("/api/claims", ClaimController.store);
	router.put("/api/claims/:id", ClaimController.update);
	router.delete("/api/claims/:id", ClaimController.destroy);

	// ================== ROUTES ==================


module.exports = router;
