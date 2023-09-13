// Item Controller (CRUD)

const path = require("path");
const models = require(path.join(__dirname, "..", "..", "models"));
const { paginate, sendResponse, sendError } = require(path.join(__dirname, "..", "..", "helpers")); // Import your pagination helper
const itemResource = require('../resources/itemResource');

class ItemController {
	// GET /items
	static index (req, res) {
		const { page = 0, size = 10 } = req.query;

		models.Item.findAndCountAll({
			limit: size,
			offset: page * size,
			include: [
				// Include related models as needed
				// For example, include the Role model
				{
					model: models.ItemType,
					as: "itemType",
					attributes: ["id", "name"],
				},
			],
		})
			.then(({ count, rows: items }) => {
				// Format the data before sending it
				const formattedItems = items.map((item) => new itemResource(item).formatData());

				const paginatedItems = paginate(formattedItems, count, page, size);

				// res.status(200).json(paginatedItems);
				sendResponse(res, paginatedItems, "Items retrieved successfully", 200);
			})
			.catch((error) => {
				console.error(error);
				// res.status(500).json({ error: "Internal Server Error" });
				sendError(error, "Internal Server Error", 500);
			});
	}

	// GET /items/:id
	static show (req, res) {
		const { id } = req.params; // Extract the 'id' parameter from the request URL

		models.Item.findByPk(id)
			.then((item) => {
				// instead of 'item' use item to resolve error
				if (!item) {
					// item not found
					return res.status(404).json({ error: "item not found" });
				}

				// Format the data before sending it
				const formattedItem = new itemResource(item).formatData();

				// res.status(200).json(formattedItem);
				sendResponse(res, formattedItem, "item retrieved successfully", 200);
			})
			.catch((error) => {
				console.error(error);
				// res.status(500).json({ error: "Internal Server Error" });
				sendError(error, "Internal Server Error", 500);
			});
	}

	// POST /items
	static store (req, res) {
		const { name, description, price, itemTypeId } = req.body;

		models.Item.create({ name, description, price, itemTypeId })
			.then((item) => {
				// Format the data before sending it
				const formattedItem = new itemResource(item).formatData();

				// res.status(201).json(formattedItem);
				sendResponse(res, formattedItem, "item created successfully", 201);
			})
			.catch((error) => {
				console.error(error);
				// res.status(500).json({ error: "Internal Server Error" });
				sendError(error, "Internal Server Error", 500);
			});
	}

	// PUT /items/:id
	static update (req, res) {
		const { id } = req.params; // Extract the 'id' parameter from the request URL
		const { name, description, price, itemTypeId } = req.body;

		models.Item.findByPk(id)
			.then((item) => {
				// instead of 'item' use item to resolve error
				if (!item) {
					// item not found
					return res.status(404).json({ error: "item not found" });
				}

				// Update the item
				item
					.update({ name, description, price, itemTypeId })
					.then((updatedItem) => {
						// Format the data before sending it
						const formattedItem = new itemResource(updatedItem).formatData();

						// res.status(200).json(formattedItem);
						sendResponse(res, formattedItem, "item updated successfully", 200);
					})
					.catch((error) => {
						console.error(error);
						// res.status(500).json({ error: "Internal Server Error" });
						sendError(error, "Internal Server Error", 500);
					});
			})
			.catch((error) => {
				console.error(error);
				// res.status(500).json({ error: "Internal Server Error" });
				sendError(error, "Internal Server Error", 500);
			});
	}

	// DELETE /items/:id
	static destroy (req, res) {
		const { id } = req.params; // Extract the 'id' parameter from the request URL

		models.Item.findByPk(id)
			.then((item) => {
				// instead of 'item' use item to resolve error
				if (!item) {
					// item not found
					return res.status(404).json({ error: "item not found" });
				}

				// Delete the item
				item
					.destroy()
					.then(() => {
						// res.status(200).json({ message: "item deleted successfully" });
						sendResponse(res, null, "item deleted successfully", 200);
					})
					.catch((error) => {
						console.error(error);
						// res.status(500).json({ error: "Internal Server Error" });
						sendError(error, "Internal Server Error", 500);
					});
			})
			.catch((error) => {
				console.error(error);
				// res.status(500).json({ error: "Internal Server Error" });
				sendError(error, "Internal Server Error", 500);
			});
	}

	// GET /user/:id/items
	static indexUserItems (req, res) {
		const { id } = req.params; // Extract the 'id' parameter from the request URL

		models.User.findByPk(id, {
			include: [
				{
					model: models.Item,
					as: "items",
					attributes: ["id", "name", "description", "price"],
				},
			],
		})
			.then((user) => {
				// instead of 'user' use user to resolve error
				if (!user) {
					// user not found
					return res.status(404).json({ error: "user not found" });
				}

				// Format the data before sending it
				const formattedItems = user.items.map((item) => new itemResource(item).formatData());

				// res.status(200).json(formattedItems);
				sendResponse(res, formattedItems, "Items retrieved successfully", 200);
			})
			.catch((error) => {
				console.error(error);
				// res.status(500).json({ error: "Internal Server Error" });
				sendError(error, "Internal Server Error", 500);
			});
	}
}

module.exports = ItemController;
