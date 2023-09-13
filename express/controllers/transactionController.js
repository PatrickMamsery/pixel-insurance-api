const path = require("path");
const models = require(path.join(__dirname, "..", "..", "models"));
const { paginate, sendResponse, sendError } = require(path.join(__dirname, "..", "..", "helpers")); // Import your pagination helper
const transactionResource = require('../resources/transactionResource');

class TransactionController {
	// GET /transactions
	static index (req, res) {
		const { page = 0, size = 10 } = req.query;

		models.Transaction.findAndCountAll({
			limit: size,
			offset: page * size,
			include: [
				// Include related models as needed
				// For example, include the Role model
				{
					model: models.User,
					as: "user",
					attributes: ["id", "name"],
				},
			],
		})
			.then(({ count, rows: transactions }) => {
				// Format the data before sending it
				const formattedTransactions = transactions.map((item) => new transactionResource(item).formatData());

				const paginatedTransactions = paginate(formattedTransactions, count, page, size);

				// res.status(200).json(paginatedTransactions);
				sendResponse(res, paginatedTransactions, "Transactions retrieved successfully", 200);
			})
			.catch((error) => {
				console.error(error);
				// res.status(500).json({ error: "Internal Server Error" });
				sendError(error, "Internal Server Error", 500);
			});
	}

	// GET /transactions/:id
	static show (req, res) {
		const { id } = req.params; // Extract the 'id' parameter from the request URL

		models.Transaction.findByPk(id)
			.then((item) => {
				// instead of 'transaction' use item to resolve error
				if (!item) {
					// transaction not found
					return res.status(404).json({ error: "transaction not found" });
				}

				// Format the data before sending it
				const formattedTransaction = new transactionResource(item).formatData();

				// res.status(200).json(formattedTransaction);
				sendResponse(res, formattedTransaction, "transaction retrieved successfully", 200);
			})
			.catch((error) => {
				console.error(error);
				// res.status(500).json({ error: "Internal Server Error" });
				sendError(error, "Internal Server Error", 500);
			});
	}

	// POST /transactions
	static store (req, res) {
		const { user_id, package_id, amount, status } = req.body;

		models.Transaction.create({ user_id, package_id, amount, status })
			.then((transaction) => {
				// Format the data before sending it
				const formattedTransaction = new transactionResource(transaction).formatData();

				// res.status(201).json(formattedTransaction);
				sendResponse(res, formattedTransaction, "transaction created successfully", 201);
			})
			.catch((error) => {
				console.error(error);
				// res.status(500).json({ error: "Internal Server Error" });
				sendError(error, "Internal Server Error", 500);
			});
	}

	// GET /user/:id/transactions
	static indexUserTransactions (req, res) {
		const { id } = req.params; // Extract the 'id' parameter from the request URL
		const { page = 0, size = 10 } = req.query;

		models.Transaction.findAndCountAll({
			where: { user_id: id },
			limit: size,
			offset: page * size,
			include: [
				// Include related models as needed
				// For example, include the Role model
				{
					model: models.User,
					as: "user",
					attributes: ["id", "name"],
				},
			],
		})
			.then(({ count, rows: transactions }) => {
				// Format the data before sending it
				const formattedTransactions = transactions.map((item) => new transactionResource(item).formatData());

				const paginatedTransactions = paginate(formattedTransactions, count, page, size);

				// res.status(200).json(paginatedTransactions);
				sendResponse(res, paginatedTransactions, "Transactions retrieved successfully", 200);
			})
			.catch((error) => {
				console.error(error);
				// res.status(500).json({ error: "Internal Server Error" });
				sendError(error, "Internal Server Error", 500);
			});
	}

	// GET /user/:id/transactions/:id
	static showUserTransaction (req, res) {
		const { id, transactionId } = req.params; // Extract the 'id' parameter from the request URL

		models.Transaction.findOne({ where: { id: transactionId, user_id: id } })
			.then((transaction) => {
				if (!transaction) {
					// transaction not found
					return res.status(404).json({ error: "transaction not found" });
				}

				// Format the data before sending it
				const formattedTransaction = new transactionResource(transaction).formatData();

				// res.status(200).json(formattedTransaction);
				sendResponse(res, formattedTransaction, "transaction retrieved successfully", 200);
			})
			.catch((error) => {
				console.error(error);
				// res.status(500).json({ error: "Internal Server Error" });
				sendError(error, "Internal Server Error", 500);
			});
	}
}

module.exports = TransactionController;
