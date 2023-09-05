'use strict';
const { Model, Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Claim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
			Claim.belongsTo(models.ClaimType);
    }
  };
  Claim.init({
    id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		policyId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			onDelete: "NO ACTION",
			onUpdate: "NO ACTION",
			references: {
				model: "userPolicies",
				key: "id",
				as: "policyId",
			},
		},
		claimTypeId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			onDelete: "NO ACTION",
			onUpdate: "NO ACTION",
			references: {
				model: "claimType",
				key: "id",
				as: "claimTypeId",
			},
		},
		claimStatus: {
			type: Sequelize.STRING
		},
		submissionDate: {
			type: Sequelize.DATE
		},
		amount: {
			type: Sequelize.DECIMAL
		},
		claimDetails: {
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
    modelName: 'Claim',
		tableName: 'claims',
  });
  return Claim;
};
