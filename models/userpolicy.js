'use strict';
const { Model, Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserPolicy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
			UserPolicy.belongsTo(models.User);
			UserPolicy.belongsTo(models.InsurancePackage);
    }
  };
  UserPolicy.init(
		{
			id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
			userId: {
        type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "NO ACTION",
				onUpdate: "NO ACTION",
				references: {
					model: {
						tableName: "users",
					},
					key: "id",
					as: "userId",
				},
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
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
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
			modelName: 'UserPolicy',
			tableName: 'userPolicies',
		});
  return UserPolicy;
};
