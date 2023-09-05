"use strict";
const fake = require("faker");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let roles = [{ name: "root" }, { name: "admin" }, { name: "user" }];

		await queryInterface.bulkInsert("roles", roles, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("roles", null, {});
	},
};
