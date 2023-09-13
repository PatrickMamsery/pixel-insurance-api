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
}

module.exports = ItemController;
