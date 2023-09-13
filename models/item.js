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
		value: {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		},
		riskFactorScore: {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		},
		weightFactorScore: {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		},
		sizeFactorScore: {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		},
		typeFactorScore: {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		},
		transitDurationFactorScore: {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		},
		transitDistanceFactorScore: {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		},
		transitRouteFactorScore: {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		},
		transitModeFactorScore: {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		},
		transitHandlingFactorScore: {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		},
		weatherFactorScore: {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		},
		temperatureFactorScore: {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		},
		humidityFactorScore: {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		},
		altitudeFactorScore: {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		},
		securityRiskFactorScore: {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		},
		humanRiskFactorScore: {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		},
		totalRiskScore: {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
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
