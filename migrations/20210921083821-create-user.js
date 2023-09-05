"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
			},
			phone: {
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.STRING,
			},
			roleId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "NO ACTION",
				onUpdate: "NO ACTION",
				references: {
					model: "roles",
					key: "id",
					as: "roleId",
				},
			},

			createdAt: {
				allowNull: true,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: true,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("users");
	},
};
