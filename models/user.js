"use strict";
const path = require("path");
const { Model, Sequelize, DataTypes } = require("sequelize");
const { paginate } = require(path.join(__dirname, "..", "helpers"));
var _ = require("lodash");
const models = require(path.join(__dirname, "."));

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
				allowNull: false,
			},
			firstName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
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
			},
			roleId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "NO ACTION",
				onUpdate: "NO ACTION",
				references: {
					model: "Roles",
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
		}
	);

	User.index = (filter, page = 0, size = 10, models, callback) => {
		page = _.parseInt(page);
		size = _.parseInt(size);

		let filterValues = {};

		if (_.has(filter, "role")) {
			filterValues = { ...filterValues, roleId: filter.role };
		}

		User.findAndCountAll({
			where: filterValues,
			limit: size,
			offset: page * size,
			include: [
				{
					model: models.Role,
					as: "role",
					attributes: ["id", "name"],
				},
			],
		})
			.then(({ count, rows: res }) => {
				const results = _.map(res, (userModel) =>
					userModel.get({ plain: true })
				);

				let users = paginate(results, count, page, size);
				callback(null, users);
			})
			.catch((err) => {
				console.log(err);
				callback(err);
			});
	};

	User.show = (id, callback) => {
		User.findByPk(id)
			.then((res) => {
				callback(null, res);
			})
			.catch((err) => {
				callback(err);
			});
	};
	return User;
};
