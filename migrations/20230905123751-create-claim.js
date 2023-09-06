'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('claims', {
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
					model: "claimTypes",
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('claims');
  }
};
