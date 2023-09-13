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
				const formattedPackages = packages.map((item) => new packageResource(item).formatData());

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
			.then((item) => {
				// instead of 'package' use item to resolve error
				if (!item) {
					// package not found
					return res.status(404).json({ error: "package not found" });
				}

				// Format the data before sending it
				const formattedPackage = new packageResource(item).formatData();

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

	// PUT /packages/:id
	static update (req, res) {
		const { id } = req.params; // Extract the 'id' parameter from the request URL

		models.Package.findByPk(id)
			.then((item) => {
				if (!item) {
					// package not found
					return res.status(404).json({ error: "package not found" });
				}

				// Update the package
				item
					.update(req.body)
					.then((updatedItem) => {
						// Format the data before sending it
						const formattedPackage = new packageResource(updatedItem).formatData();

						// res.status(200).json(formattedPackage);
						sendResponse(res, formattedPackage, "package updated successfully", 200);
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

	// DELETE /packages/:id
	static destroy (req, res) {
		const { id } = req.params; // Extract the 'id' parameter from the request URL

		models.Package.findByPk(id)
			.then((item) => {
				if (!item) {
					// package not found
					return res.status(404).json({ error: "Package not found" });
				}

				// Delete the package
				item
					.destroy()
					.then(() => {
						// res.status(200).json({ message: "package deleted successfully" });
						sendResponse(res, null, "package deleted successfully", 200);
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
}

module.exports = InsurancePackageController;
