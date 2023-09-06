'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Transaction.init({
    userId: DataTypes.INTEGER,
    transactionType: DataTypes.STRING,
    channel: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    transactionDetails: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
  });
  return Transaction;
};