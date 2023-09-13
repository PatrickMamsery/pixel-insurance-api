const path = require("path");
const models = require(path.join(__dirname, "..", "..", "models"));
const { paginate, sendResponse, sendError } = require(path.join(__dirname, "..", "..", "helpers")); // Import your pagination helper
const cargoRecordResource = require('../resources/cargoRecordResource');

class CargoRecordController {
	// GET /cargo_records
	static index (req, res) {
		const { page = 0, size = 10 } = req.query;

		models.CargoRecord.findAndCountAll({
			limit: size,
			offset: page * size,
			include: [
				// Include related models as needed
				// For example, include the Role model
				{
					model: models.Item,
					as: "item",
					attributes: ["id", "name"],
				},
			],
		})
			.then(({ count, rows: cargo_records }) => {
				// Format the data before sending it
				const formattedCargoRecords = cargo_records.map((item) => new cargoRecordResource(item).formatData());

				const paginatedCargoRecords = paginate(formattedCargoRecords, count, page, size);

				// res.status(200).json(paginatedCargoRecords);
				sendResponse(res, paginatedCargoRecords, "Cargo Records retrieved successfully", 200);
			})
			.catch((error) => {
				console.error(error);
				// res.status(500).json({ error: "Internal Server Error" });
				sendError(error, "Internal Server Error", 500);
			});
	}

	// GET /cargo_records/:id
	static show (req, res) {
		const { id } = req.params; // Extract the 'id' parameter from the request URL

		models.CargoRecord.findByPk(id)
			.then((item) => {
				// instead of 'cargo_record' use item to resolve error
				if (!item) {
					// cargo_record not found
					return res.status(404).json({ error: "cargo_record not found" });
				}

				// Format the data before sending it
				const formattedCargoRecord = new cargoRecordResource(item).formatData();

				// res.status(200).json(formattedCargoRecord);
				sendResponse(res, formattedCargoRecord, "Cargo Record retrieved successfully", 200);
			})
			.catch((error) => {
				console.error(error);
				// res.status(500).json({ error: "Internal Server Error" });
				sendError(error, "Internal Server Error", 500);
			});
	}
}

module.exports = CargoRecordController;
