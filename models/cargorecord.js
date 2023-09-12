'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CargoRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
			CargoRecord.belongsTo(models.UserPolicy, { as: "policy" });
    }
  };
  CargoRecord.init({
    policyId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			onDelete: "NO ACTION",
			onUpdate: "NO ACTION",
			references: {
				model: "userPolicies",
				key: "id",
				as: "policyId",
			},
		},
    itemValue: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0.0,
		},
    procumentDocument: {
			type: DataTypes.STRING,
		}
  }, {
    sequelize,
    modelName: 'CargoRecord',
    tableName: 'cargoRecords',
  });

  return CargoRecord;
};
