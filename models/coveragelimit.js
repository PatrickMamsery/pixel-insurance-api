'use strict';
const { Model, Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CoverageLimit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
			CoverageLimit.belongsTo(models.CoverageType);
    }
  };
  CoverageLimit.init(
		{
			id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      packageId: {
        type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "NO ACTION",
				onUpdate: "NO ACTION",
				references: {
					model: {
						tableName: "insurancePackages",
					},
					key: "id",
					as: "packageId",
				},
      },
      coverageTypeId: {
        type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "NO ACTION",
				onUpdate: "NO ACTION",
				references: {
					model: {
						tableName: "coverageTypes",
					},
					key: "id",
					as: "coverageTypeId",
				}
      },
      amount: {
        type: Sequelize.DECIMAL(13,2)
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
			modelName: 'CoverageLimit',
			tableName: 'coverageLimits',
		});

  return CoverageLimit;
};
