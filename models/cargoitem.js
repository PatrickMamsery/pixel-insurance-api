"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class CargoItem extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			CargoItem.belongsTo(models.CargoRecord, { as: "cargo" });
			CargoItem.belongsTo(models.Item, { as: "item" });
		}
	}
	CargoItem.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			cargoId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "NO ACTION",
				onUpdate: "NO ACTION",
				references: {
					model: "cargoRecords",
					key: "id",
					as: "cargoId",
				},
			},
			itemId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "NO ACTION",
				onUpdate: "NO ACTION",
				references: {
					model: "items",
					key: "id",
					as: "itemId",
				},
			},
		},
		{
			sequelize,
			modelName: "CargoItem",
			tableName: "cargoItems",
		}
	);

	return CargoItem;
};
