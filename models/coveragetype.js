'use strict';
const { Model, Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CoverageType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
			// CoverageType.hasMany(models.CoverageLimit)
    }
  };
  CoverageType.init(
		{
			id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    	title: {
				type: Sequelize.STRING,
			},
			createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
  }, {
    sequelize,
    modelName: 'CoverageType',
		tableName: 'coverageTypes',
  });
  return CoverageType;
};
