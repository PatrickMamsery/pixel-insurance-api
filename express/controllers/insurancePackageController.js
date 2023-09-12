// Packages CRUD operations
// =============================================================

const path = require("path");
const models = require(path.join(__dirname, "..", "..", "models"));
const { paginate, sendResponse, sendError } = require(path.join(__dirname, "..", "..", "helpers")); // Import your pagination helper
const packageResource = require('../resources/insurancePackageResource'); // Resource for formatting data
const { validationResult, check } = require('express-validator');

class InsurancePackageController {
	// GET /packages
	static index (req, res) {
		const { page = 0, size = 10 } = req.query;

		models.Package.findAndCountAll({
			limit: size,
			offset: page * size,
			include: [
				// Include related models as needed
				// For example, include the Role model
				{
					model: models.PackageType,
					as: "packageType",
					attributes: ["id", "name"],
				},
			],
		})
			.then(({ count, rows: packages }) => {
				// Format the data before sending it
				const formattedPackages = packages.map((package) => new packageResource(package).formatData());

				const paginatedPackages = paginate(formattedPackages, count, page, size);

				// res.status(200).json(paginatedPackages);
				sendResponse(res, paginatedPackages, "Packages retrieved successfully", 200);
			})
			.catch((error) => {
				console.error(error);
				// res.status(500).json({ error: "Internal Server Error" });
				sendError(error, "Internal Server Error", 500);
			});
	}

	// GET /packages/:id
	static show (req, res) {
		const { id } = req.params; // Extract the 'id' parameter from the request URL

		models.Package.findByPk(id)
			.then((package) => {
				if (!package) {
					// package not found
					return res.status(404).json({ error: "package not found" });
				}

				// Format the data before sending it
				const formattedPackage = new packageResource(package).formatData();

				// res.status(200).json(formattedPackage);
				sendResponse(res, formattedPackage, "package retrieved successfully", 200);
			})
			.catch((error) => {
				console.error(error);
				// res.status(500).json({ error: "Internal Server Error" });
				sendError(error, "Internal Server Error", 500);
			});
	}

	// POST /packages
	// name, coverageFocus, deductible, claimProcessingTime
	static async store (req, res) {
		try {
			const validationRules = [
				check('name', 'name field is required').notEmpty(),
				check('coverageFocus', 'coverageFocus field is required').notEmpty(),
				check('deductible', 'deductible field is required').notEmpty(),
				check('claimProcessingTime', 'claimProcessingTime field is required').notEmpty(),
			];

			// Check for validation errors
			await Promise.all(validationRules.map(validation => validation.run(req)));

		} catch (error) {

		}
	}
}

module.exports = InsurancePackageController;
