'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // remove column from table
		await queryInterface.removeColumn('cargoRecords', 'itemId');
  },

  down: async (queryInterface, Sequelize) => {
		// add column to table
		await queryInterface.addColumn('cargoRecords', 'itemId', {
			type: Sequelize.INTEGER,
			allowNull: false,
		});
  }
};
