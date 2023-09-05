'use strict';
const { Model, Sequelize, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
			UserDocument.belongsTo(models.Document, { as: "user" });
			UserDocument.belongsTo(models.Document);
    }
  };
  UserDocument.init({
    userId: DataTypes.INTEGER,
    documentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserDocument',
		tableName: 'userDocuments',
  });
  return UserDocument;
};
