const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require("path");
const models = require(path.join(__dirname, "..", "..", "models"));
const { validationResult, check } = require('express-validator'); // Import the validationResult and check functions
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

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
  static resetPassword(req, res) {
		const userId = req.params.userId;
		const { email, password } = req.body;

	
		models.User.update(
			{ email, password },
			{ where: { id: userId } }
		)
		.then(() => {
			console.log('You have successfully update your password!!');
			res.status(200).json({ message: 'You have successfully update your password!! isahau tena kuku wewe' });
		})
		.catch((err) => {
			console.error('Error updating user password:', err);
			res.status(500).json({ error: 'Internal server error' });
		});
	}
}

module.exports = AuthController;
