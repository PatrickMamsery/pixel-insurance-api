'use strict';
const { Model, Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Item.init({
    id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		name: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.TEXT
		},
		createdAt: {
			allowNull: true,
			type: Sequelize.DATE
		},
		updatedAt: {
			allowNull: true,
			type: Sequelize.DATE
		}
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};
