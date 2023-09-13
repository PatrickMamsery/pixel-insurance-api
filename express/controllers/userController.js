// controllers/UserController.js
const path = require("path");
const models = require(path.join(__dirname, "..", "..", "models")); // Import your User model
const { paginate, sendResponse, sendError } = require(path.join(
	__dirname,
	"..",
	"..",
	"helpers"
)); // Import your pagination helper
const UserResource = require("./../resources/userResource"); // Resource for formatting data
const { sequelize } = require("../../models");

class UserController {
	static index(req, res) {
		const { page = 0, size = 10, role } = req.query;

		const filter = {};
		if (role) {
			filter.role = role;
		}

		models.User.findAndCountAll({
			where: filter,
			limit: size,
			offset: page * size,
			include: [
				// Include related models as needed
				// For example, include the Role model
				{
					model: models.Role,
					as: "role",
					attributes: ["id", "name"],
				},
			],
		})
			.then(({ count, rows: users }) => {
				// Format the data before sending it
				const formattedUsers = users.map((user) =>
					new UserResource(user).formatData()
				);

				const paginatedUsers = paginate(formattedUsers, count, page, size);

				// res.status(200).json(paginatedUsers);
				sendResponse(res, paginatedUsers, "Users retrieved successfully", 200);
			})
			.catch((error) => {
				console.error(error);
				// res.status(500).json({ error: "Internal Server Error" });
				sendError(error, "Internal Server Error", 500);
			});
	}

	// GET a single user
	static show(req, res) {
		const { id } = req.params; // Extract the 'id' parameter from the request URL

		models.User.findByPk(id)
			.then((user) => {
				if (!user) {
					// User not found
					return res.status(404).json({ error: "User not found" });
				}

				// Format the data before sending it
				const formattedUser = new UserResource(user).formatData();

				// res.status(200).json(formattedUser);
				sendResponse(res, formattedUser, "User retrieved successfully", 200);
			})
			.catch((error) => {
				console.error(error);
				// res.status(500).json({ error: "Internal Server Error" });
				sendError(error, "Internal Server Error", 500);
			});
	}

	// CREATE user
	static async store(req, res) {
		const { email, phone, firstName, lastName, gender, password, role } = req.body;

		// check if user already exists by checking username and phone number
		const existingUser = await models.User.findOne({ where: { userName, phone } });
		if (existingUser) {
			return res.status(400).json({ error: "User already exists" });
		}

		// Hash the password before saving it
		const hashedPassword = await bcrypt.hash(password, 10);

		models.User.create({
			email,
			phone,
			firstName,
			lastName,
			gender,
			password: hashedPassword,
			roleId: role,
		})
			.then((user) => {
				// Format the data before sending it
				const formattedUser = new UserResource(user).formatData();

				sendResponse(res, formattedUser, "User created successfully", 201);
			})
			.catch((error) => {
				console.error(error);
				sendError(error, "Internal Server Error", 500);
			});
	}

	// UPDATE user
	static update (req, res) {
		// TODO::Implement this
		return res.status(501).json({ error: "Not Implemented" });
	}

	// DELETE user
	static destroy (req, res) {
		// TODO::Implement this
		return res.status(501).json({ error: "Not Implemented" });
	}

	// UPDATE PROFILE
	static updateProfile(req, res) {
		const userId = req.params.userId;
		const { email, phone, firstName, lastName } = req.body;

		models.User.update(
			{ email, phone, firstName, lastName },
			{ where: { id: userId } }
		)
			.then(() => {
				console.log("User profile updated successfully");
				res.status(200).json({ message: "User profile updated successfully" });
			})
			.catch((err) => {
				console.error("Error updating user profile:", err);
				res.status(500).json({ error: "Internal server error" });
			});
	}

	// CHANGE PASSWORD
	static changePassword(req, res) {
		const userId = req.params.userId;
		const { oldPassword, newPassword } = req.body;

		models.User.findByPk(userId)
			.then(async (user) => {
				if (!user) {
					return res.status(404).json({ error: "User not found" });
				}

				// Check if old password matches
				const isMatch = await bcrypt.compare(oldPassword, user.password);
				if (!isMatch) {
					return res.status(400).json({ error: "Old password is incorrect" });
				}

				// Hash the new password
				const hashedPassword = await bcrypt.hash(newPassword, 10);

				// Update the user's password
				models.User.update(
					{ password: hashedPassword },
					{ where: { id: userId } }
				)
					.then(() => {
						console.log("User password updated successfully");
						res
							.status(200)
							.json({ message: "User password updated successfully" });
					})
					.catch((err) => {
						console.error("Error updating user password:", err);
						res.status(500).json({ error: "Internal server error" });
					});
			})
			.catch((err) => {
				console.error("Error finding user:", err);
				res.status(500).json({ error: "Internal server error" });
			});
	}

	// GET all roles
	static indexRoles(req, res) {
		models.Role.findAll()
			.then((roles) => {
				res.status(200).json(roles);
			})
			.catch((error) => {
				console.error(error);
				res.status(500).json({ error: "Internal Server Error" });
			});
	}

	// GET a single role
	static showRole(req, res) {
		const { id } = req.params; // Extract the 'id' parameter from the request URL

		models.Role.findByPk(id)
			.then((role) => {
				if (!role) {
					// Role not found
					return res.status(404).json({ error: "Role not found" });
				}

				res.status(200).json(role);
			})
			.catch((error) => {
				console.error(error);
				res.status(500).json({ error: "Internal Server Error" });
			});
	}

	// CREATE role
	static storeRole(req, res) {
		const { name } = req.body;

		models.Role.create({ name })
			.then((role) => {
				res.status(201).json(role);
			})
			.catch((error) => {
				console.error(error);
				res.status(500).json({ error: "Internal Server Error" });
			});
	}

	// UPDATE role
	static updateRole(req, res) {
		const { id } = req.params; // Extract the 'id' parameter from the request URL
		const { name } = req.body;

		models.Role.update({ name }, { where: { id } })
			.then(() => {
				console.log("Role updated successfully");
				res.status(200).json({ message: "Role updated successfully" });
			})
			.catch((error) => {
				console.error(error);
				res.status(500).json({ error: "Internal Server Error" });
			});
	}

	// DELETE role
	static destroyRole(req, res) {
		const { id } = req.params; // Extract the 'id' parameter from the request URL

		models.Role.destroy({ where: { id } })
			.then(() => {
				console.log("Role deleted successfully");
				res.status(200).json({ message: "Role deleted successfully" });
			})
			.catch((error) => {
				console.error(error);
				res.status(500).json({ error: "Internal Server Error" });
			});
	}
}

module.exports = UserController;
