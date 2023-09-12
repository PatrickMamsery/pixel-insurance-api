// claimcontroller CRUD
// =============================================================

const path = require("path");
const models = require(path.join(__dirname, "..", "..", "models"));
const { paginate, sendResponse, sendError } = require(path.join(__dirname, "..", "..", "helpers")); // Import your pagination helper
const ClaimResource = require('./../resources/claimResource'); // Resource for formatting data
const { validationResult, check } = require('express-validator');

class ClaimController {
	// GET /claims
	static index (req, res) {
		const { page = 0, size = 10 } = req.query;

		models.Claim.findAndCountAll({
			limit: size,
			offset: page * size,
			include: [
				// Include related models as needed
				// For example, include the Role model
				{
					model: models.claimType,
					as: "claimType",
					attributes: ["id", "name"],
				},
			],
		})
			.then(({ count, rows: claims }) => {
				// Format the data before sending it
				const formattedClaims = claims.map((claim) => new ClaimResource(claim).formatData());

				const paginatedClaims = paginate(formattedClaims, count, page, size);

				// res.status(200).json(paginatedClaims);
				sendResponse(res, paginatedClaims, "Claims retrieved successfully", 200);
			})
			.catch((error) => {
				console.error(error);
				// res.status(500).json({ error: "Internal Server Error" });
				sendError(error, "Internal Server Error", 500);
			});
	}

	// GET /claims/:id
	static show (req, res) {
		const { id } = req.params; // Extract the 'id' parameter from the request URL

		models.Claim.findByPk(id)
			.then((claim) => {
				if (!claim) {
					// Claim not found
					return res.status(404).json({ error: "Claim not found" });
				}

				// Format the data before sending it
				const formattedClaim = new ClaimResource(claim).formatData();

				// res.status(200).json(formattedClaim);
				sendResponse(res, formattedClaim, "Claim retrieved successfully", 200);

			})
			.catch((error) => {
				console.error(error);
				// res.status(500).json({ error: "Internal Server Error" });
				sendError(error, "Internal Server Error", 500);
			});
	}

	// POST /claims
	static async store (req, res) {
		try {
			const validationRules = [
				check('policyId', 'policyId field is required').notEmpty(),
				check('claimTypeId', 'claimTypeId field is required').notEmpty(),
				check('claimAmount', 'claimAmount field is required').notEmpty(),
				check('claimDate', 'claimDate field is required').notEmpty(),
				check('claimStatus', 'claimStatus field is required').notEmpty(),
			];

			// Check for validation errors
			await Promise.all(validationRules.map(validation => validation.run(req)));

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				const errorMessages = errors.array().map(error => error.msg);
				return res.status(400).json({ errors: errorMessages });
			}

			const { policyId, claimTypeId, claimAmount, claimDate, claimStatus } = req.body;

			const claim = await models.Claim.create({
				policyId,
				claimTypeId,
				claimAmount,
				claimDate,
				claimStatus,
			});

			// Format the data before sending it
			const formattedClaim = new ClaimResource(claim).formatData();

			// res.status(201).json(formattedClaim);
			sendResponse(res, formattedClaim, "Claim created successfully", 201);

		} catch (error) {
			console.error(error);
			// res.status(500).json({ error: "Internal Server Error" });
			sendError(error, "Internal Server Error", 500);
		}
	}

	// PUT /claims/:id
	static async update (req, res) {
		try {
			const validationRules = [
				check('policyId', 'policyId field is required').notEmpty(),
				check('claimTypeId', 'claimTypeId field is required').notEmpty(),
				check('claimAmount', 'claimAmount field is required').notEmpty(),
				check('claimDate', 'claimDate field is required').notEmpty(),
				check('claimStatus', 'claimStatus field is required').notEmpty(),

				// custom checking for policyId and claimTypeId
				check('policyId').custom(async (value) => {
					const policy = await models.UserPolicy.findByPk(value);
					if (!policy) {
						return Promise.reject('Policy not found');
					}
				}),
				check('claimTypeId').custom(async (value) => {
					const claimType = await models.ClaimType.findByPk(value);
					if (!claimType) {
						return Promise.reject('ClaimType not found');
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

			const { id } = req.params;

			const { policyId, claimType, claimAmount, claimDate, claimStatus } = req.body;

			const claim = await models.Claim.findByPk(id);

			if (!claim) {
				return res.status(404).json({ error: 'Claim not found' });
			}

			await claim.update({
				policyId,
				claimType,
				claimAmount,
				claimDate,
				claimStatus,
			});

			// Format the data before sending it
			const formattedClaim = new ClaimResource(claim).formatData();

			// res.status(200).json(formattedClaim);
			sendResponse(res, formattedClaim, "Claim updated successfully", 200);

		} catch (error) {
			console.error(error);
			// res.status(500).json({ error: "Internal Server Error" });
			sendError(error, "Internal Server Error", 500);
		}
	}

	// DELETE /claims/:id
	static async destroy (req, res) {
		try {
			const { id } = req.params;

			const claim = await models.Claim.findByPk(id);

			if (!claim) {
				return res.status(404).json({ error: 'Claim not found' });
			}

			await claim.destroy();

			// res.status(200).json({ message: 'Claim deleted successfully' });
			sendResponse(res, null, "Claim deleted successfully", 200);

		} catch (error) {
			console.error(error);
			// res.status(500).json({ error: "Internal Server Error" });
			sendError(error, "Internal Server Error", 500);
		}
	}
}

module.exports = ClaimController;
