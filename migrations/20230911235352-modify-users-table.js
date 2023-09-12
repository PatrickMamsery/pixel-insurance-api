'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Modify the table structure
    await queryInterface.changeColumn('users', 'userName', {
      type: Sequelize.STRING,
      allowNull: true, // Make userName nullable
    });

    await queryInterface.changeColumn('users', 'firstName', {
      type: Sequelize.STRING,
      allowNull: true, // Make firstName nullable
    });

    await queryInterface.changeColumn('users', 'lastName', {
      type: Sequelize.STRING,
      allowNull: true, // Make lastName nullable
    });

    // Add a new column called nidaId
    await queryInterface.addColumn('users', 'nidaId', {
      type: Sequelize.STRING,
      allowNull: true, // Make nidaId nullable
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes made in the up function
    await queryInterface.changeColumn('users', 'userName', {
      type: Sequelize.STRING,
      allowNull: false, // Restore userName to not nullable
    });

    await queryInterface.changeColumn('users', 'firstName', {
      type: Sequelize.STRING,
      allowNull: false, // Restore firstName to not nullable
    });

    await queryInterface.changeColumn('users', 'lastName', {
      type: Sequelize.STRING,
      allowNull: false, // Restore lastName to not nullable
    });

    // Remove the nidaId column
    await queryInterface.removeColumn('users', 'nidaId');
  },
};
