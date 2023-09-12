"use strict";
const path = require("path");
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.belongsTo(models.Role, { as: "role" });
		}
	}
	User.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userName: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			firstName: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			phone: {
				type: Sequelize.STRING,
			},
			gender: {
				type: Sequelize.ENUM("male", "female", "other"),
			},
			dateOfBirth: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			isVerified: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			roleId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "NO ACTION",
				onUpdate: "NO ACTION",
				references: {
					model: {
						tableName: "roles",
					},
					key: "id",
					as: "roleId",
				},
			},

			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		},
		{
			sequelize,
			modelName: "User",
			tableName: "users",
		}
	);

	return User;
};
