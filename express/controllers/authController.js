const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require("path");
const models = require(path.join(__dirname, "..", "..", "models"));
const { validationResult, check } = require('express-validator'); // Import the validationResult and check functions
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const mailUsername = process.env.MAIL_USERNAME;
const mailPassword = process.env.MAIL_PASSWORD;



  // Initialize the transporter for sending emails
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service
    auth: {
      user: mailUsername, // Replace with your email address
      pass: mailPassword, // Replace with your email password
    },
  });

  // Store OTPs temporarily (you should use a database in production)
  const otpStore = {};

class AuthController {
  static async register(req, res) {
    try {
      // Validation rules for registration
      const validationRules = [
        check('userName', 'userName is required').notEmpty(),
        check('firstName', 'firstName is required').notEmpty(),
        check('lastName', 'lastName is required').notEmpty(),
        check('email', 'email is required').isEmail(),
        check('phone', 'phone is required').notEmpty(),
        check('password', 'password is required').notEmpty(),

        check('roleId').custom(async (roleId, { req }) => {
          // Check if roleId exists in the roles table
          const role = await models.Role.findOne({ where: { id: roleId } });
          if (!role) {
            throw new Error('Invalid roleId');
          }
        }),
      ];

      // Check for validation errors
      await Promise.all(validationRules.map(validation => validation.run(req)));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
      }

      const { userName, password, firstName, lastName, email, phone, roleId } = req.body;

      // Check if the user already exists
      const existingUser = await models.User.findOne({ where: { userName } });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = await models.User.create(
        {
          userName,
          password: hashedPassword,
          firstName,
          lastName,
          email,
          phone,
          gender,
          roleId
        }
      );

      // Generate a JWT token for the user
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '7d' });

      res.status(201).json({ user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

	// ========== REGISTER V2 ==========
	static async registerV2(req, res) {
		try {
			// Validation rules for registration
			const validationRules = [
				check('phone', 'phone field is required').notEmpty(),
				check('nidaNumber', 'nidaNumber field is required').notEmpty(),

				// check('roleId').custom(async (roleId, { req }) => {
				// 	// Check if roleId exists in the roles table
				// 	const role = await models.Role.findOne({ where: { id: roleId } });
				// 	if (!role) {
				// 		throw new Error('Invalid roleId');
				// 	}
				// }).notEmpty(),
			];

			// Check for validation errors
			await Promise.all(validationRules.map(validation => validation.run(req)));

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const errorMessages = errors.array().map(error => error.msg);
				return res.status(400).json({ errors: errorMessages });
			}

			const { phone, nidaNumber } = req.body;

			// Check if the user already exists
			const existingUser = await models.User.findOne({ where: { phone } });
			if (existingUser) {
				return res.status(400).json({ error: 'User already exists' });
			}

			// Generate a 5-digit random OTP
			// const otp = crypto.randomInt(10000, 99999);
			// otpStore[phone] = otp; // Store the OTP with the phone number

			// Create email content
			// const mailOptions = {
			// 	from: mailUsername,
			// 	to: email,
			// 	subject: 'OTP for Registration',
			// 	text: `Your OTP for registration is: ${otp}`,
			// };

			// Send the email
			// await transporter.sendMail(mailOptions);

			// Get other details from API call to NIDA
			// getNidaDetails(nidaNumber);

			// Hash the password before saving it
			const hashedPassword = await bcrypt.hash(phone, 10);

			// create role or find role
			const role = await models.Role.findOne({ where: { name: "user" } });
			const roleId = role ? role.id : 3; // Get the id if a role with the name "user" was found, otherwise use the default id of 3

			// Generate a random email address of the form: phone@localhost
			const email = `${phone}@localhost`;

			// Create a new user
			const user = await models.User.create(
				{
					phone,
					password: hashedPassword,
					nidaNumber,
					email,
					roleId
				}
			);

			// Generate a JWT token for the user
			const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '7d' });

			res.status(201).json({ user, token });

		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}

	// ========== LOGIN ==========

  static async login(req, res) {
    try {
      // Validation rules for login
      const validationRules = [
        check('phone', 'phone field is required').notEmpty(),
        check('password', 'password field is required').notEmpty()
      ];

      // Check for validation errors
      await Promise.all(validationRules.map(validation => validation.run(req)));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
      }

      const { phone, password } = req.body;

      // Find the user by their phone number
      const user = await models.User.findOne({ where: { phone } });

      if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }

      // Check if the provided password matches the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed' });
      }

      // Generate a JWT token for the user
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '7d' });

      res.status(200).json({ user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // ========== RESET PASSWORD ==========

  static async resetPassword(req, res) {
    try {
      const { userId } = req.params; // Get the userId from the request parameters
      const { email } = req.body;

      // Generate a 5-digit random OTP
      const otp = crypto.randomInt(10000, 99999);
      otpStore[userId] = otp; // Store the OTP with the userId

      // Create email content
      const mailOptions = {
        from: mailUsername,
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      res.json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(500).json({ message: 'Failed to send OTP' });
    }
  }

	// ========== VERIFY OTP ==========
  static verifyOTP(req, res) {
    try {
      const { email, otp } = req.body;

      // Check if the OTP matches the stored OTP
      if (otpStore[email] && otpStore[email] === parseInt(otp)) {
        // OTP is valid, you can allow the user to reset their password here
        // You should also delete the OTP from otpStore after successful verification
        delete otpStore[email];

        res.json({ message: 'OTP verified successfully' });
      } else {
        res.status(400).json({ message: 'Invalid OTP' });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ message: 'Failed to verify OTP' });
    }
  }

	// ========== CHANGE PASSWORD ==========
	static async changePassword(req, res) {
		try {
			const { userId } = req.params; // Get the userId from the request parameters
			const { password } = req.body;

			// Hash the password before saving it
			const hashedPassword = await bcrypt.hash(password, 10);

			// Update the user's password
			await models.User.update(
				{ password: hashedPassword },
				{ where: { id: userId } }
			);

			res.json({ message: 'Password changed successfully' });
		} catch (error) {
			console.error('Error changing password:', error);
			res.status(500).json({ message: 'Failed to change password' });
		}
	}

	// ========== GET USER DETAILS ==========
	static async getNidaDetails(nidaNumber) {
		try {
			const response = await fetch(`https://nida.go.tz/api/kyc/${nidaNumber}`);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error getting NIDA details:', error);
		}
	}
}

module.exports = AuthController;
