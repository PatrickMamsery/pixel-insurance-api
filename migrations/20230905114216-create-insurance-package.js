'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('insurancePackages', {
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('insurancePackages');
  }
};
