const app = require("./express/app");
const path = require("path");
const { getNumber } = require("@lykmapipo/env");
require("dotenv").config();
// const app = require(path.join(__dirname, "express/app"));
// const sequelize = require("./sequelize");
const { sequelize } = require(path.join(__dirname, "models"));

const PORT = getNumber("PORT", process.env.API_PORT);

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log("Database connection OK!");
	} catch (error) {
		console.log("Unable to connect to the database:");
		console.log(error.message);
		process.exit(1);
	}
}

async function init() {
	await assertDatabaseConnectionOk();

	console.log(`Starting API server on port ${PORT}...`);

	app.listen(PORT, () => {
		console.log(
			`Express server started on port ${PORT}. Try some routes, such as '/api/users'.`
		);
	});
}

init();
