"use strict";
const fake = require("faker");
module.exports = {
	up: async (queryInterface, Sequelize) => {
		let roles = await queryInterface.sequelize.query(`SELECT id from roles;`);

		let users = [];
		for (let i = 0; i <= 100; i++) {
			users.push({
				name: fake.name.firstName(),
				email: fake.internet.email(),
				phone: fake.phone.phoneNumber(),
				password: fake.internet.password(),
				roleId: fake.random.arrayElement(roles[0]).id,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}
		await queryInterface.bulkInsert("users", users, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("users", null, {});
	},
};
