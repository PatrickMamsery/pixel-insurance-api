const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require("path");
const models = require(path.join(__dirname, "..", "..", "models"));
const { validationResult, check } = require('express-validator'); // Import the validationResult and check functions
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;
const mailUsername = process.env.MAIL_USERNAME;
const mailPassword = process.env.MAIL_PASSWORD;


const crypto = require('crypto');
  const nodemailer = require('nodemailer');

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
        check('userName', 'Username is required').notEmpty(),
        check('firstName', 'First name is required').notEmpty(),
        check('lastName', 'Last name is required').notEmpty(),
        check('email', 'Email is required').isEmail(),
        check('phone', 'Phone is required').notEmpty(),
        check('password', 'Password is required').notEmpty(),

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

  static async login(req, res) {
    try {
      // Validation rules for login
      const validationRules = [
        check('userName', 'Username is required').notEmpty(),
        check('password', 'Password is required').notEmpty()
      ];

      // Check for validation errors
      await Promise.all(validationRules.map(validation => validation.run(req)));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
      }

      const { userName, password } = req.body;

      // Find the user by their username
      const user = await models.User.findOne({ where: { userName } });

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

  //reset password function start here
  


  static async resetPassword(req, res) {
    try {
      const { userId } = req.params; // Get the userId from the request parameters
      const { email } = req.body;
  
      // Generate a 5-digit random OTP
      const otp = crypto.randomInt(10000, 99999);
      otpStore[userId] = otp; // Store the OTP with the userId
  
      // Create email content
      const mailOptions = {
        from: 'rubeajuma8@gmail.com',
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
}

module.exports = AuthController;
