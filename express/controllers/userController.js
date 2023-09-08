// controllers/UserController.js
const path = require("path");
const models = require(path.join(__dirname, "..", "..", "models")); // Import your User model
const { paginate, sendResponse, sendError } = require(path.join(__dirname, "..", "..", "helpers")); // Import your pagination helper
const UserResource = require('./../resources/userResource'); // Resource for formatting data
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
				const formattedUsers = users.map((user) => new UserResource(user).formatData());

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

	// UPDATE user

	// DELETE user

	// UPDATE PROFILE
	static updateProfile(req, res) {
		const userId = req.params.userId;
		const { email, phone, firstName, lastName } = req.body;
	
		models.User.update(
			{ email, phone, firstName, lastName },
			{ where: { id: userId } }
		)
		.then(() => {
			console.log('User profile updated successfully');
			res.status(200).json({ message: 'User profile updated successfully' });
		})
		.catch((err) => {
			console.error('Error updating user profile:', err);
			res.status(500).json({ error: 'Internal server error' });
		});
	}
	
}

module.exports = UserController;
