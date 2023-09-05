'use strict';
const { Model, Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InsurancePackage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  InsurancePackage.init(
		{
			id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      coverageFocus: {
        type: Sequelize.STRING,
				allowNull: true,
      },
      deductible: {
        type: Sequelize.DECIMAL(13,2),
      },
			claimProcessingTime: {
				type: Sequelize.INTEGER,
			},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
  },
	{
    sequelize,
    modelName: 'InsurancePackage',
		tableName: 'insurancePackages',
  });
  return InsurancePackage;
};
