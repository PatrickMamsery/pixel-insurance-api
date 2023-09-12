'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cargoItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cargoId: {
        type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "NO ACTION",
				onUpdate: "NO ACTION",
				references: {
					model: "cargoRecords",
					key: "id",
					as: "cargoId",
				},
      },
      itemId: {
        type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "NO ACTION",
				onUpdate: "NO ACTION",
				references: {
					model: "items",
					key: "id",
					as: "itemId",
				},
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cargoItems');
  }
};
