// controllers/UserController.js
const path = require("path");
const models = require(path.join(__dirname, "..", "..", "models")); // Import your User model
const { paginate } = require(path.join(__dirname, "..", "..", "helpers")); // Import your pagination helper

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
				const paginatedUsers = paginate(users, count, page, size);

				res.status(200).json(paginatedUsers);
			})
			.catch((error) => {
				console.error(error);
				res.status(500).json({ error: "Internal Server Error" });
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

				res.status(200).json(user);
			})
			.catch((error) => {
				console.error(error);
				res.status(500).json({ error: "Internal Server Error" });
			});
	}
}

module.exports = UserController;
