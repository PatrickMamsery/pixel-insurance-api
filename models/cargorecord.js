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
    }
  };
  CargoRecord.init({
    policyId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    itemValue: DataTypes.DECIMAL,
    procumentDocument: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CargoRecord',
  });
  return CargoRecord;
};