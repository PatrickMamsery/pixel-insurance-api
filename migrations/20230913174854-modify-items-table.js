'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('items', 'value', {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		});

		await queryInterface.addColumn('items', 'riskFactorScore', {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		});

		await queryInterface.addColumn('items', 'weightFactorScore', {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		});

		await queryInterface.addColumn('items', 'sizeFactorScore', {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		});

		await queryInterface.addColumn('items', 'typeFactorScore', {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		});

		await queryInterface.addColumn('items', 'transitDurationFactorScore', {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		});

		await queryInterface.addColumn('items', 'transitDistanceFactorScore', {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		});

		await queryInterface.addColumn('items', 'transitRouteFactorScore', {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		});

		await queryInterface.addColumn('items', 'transitModeFactorScore', {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		});

		await queryInterface.addColumn('items', 'transitHandlingFactorScore', {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		});

		await queryInterface.addColumn('items', 'weatherFactorScore', {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		});

		await queryInterface.addColumn('items', 'temperaturFactorScore', {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		});

		await queryInterface.addColumn('items', 'humidityFactorScore', {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		});

		await queryInterface.addColumn('items', 'altitudeFactorScore', {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		});

		await queryInterface.addColumn('items', 'securityRiskFactorScore', {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		});

		await queryInterface.addColumn('items', 'humanRiskFactorScore', {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		});

		await queryInterface.addColumn('items', 'totalRiskScore', {
			type: Sequelize.DECIMAL(3,2),
			allowNull: false,
			defaultValue: 0.00
		});
  },

  down: async (queryInterface, Sequelize) => {
	await queryInterface.removeColumn('items', 'value');
	await queryInterface.removeColumn('items', 'riskFactorScore');
	await queryInterface.removeColumn('items', 'weightFactorScore');
	await queryInterface.removeColumn('items', 'sizeFactorScore');
	await queryInterface.removeColumn('items', 'typeFactorScore');
	await queryInterface.removeColumn('items', 'transitDurationFactorScore');
	await queryInterface.removeColumn('items', 'transitDistanceFactorScore');
	await queryInterface.removeColumn('items', 'transitRouteFactorScore');
	await queryInterface.removeColumn('items', 'transitModeFactorScore');
	await queryInterface.removeColumn('items', 'transitHandlingFactorScore');
	await queryInterface.removeColumn('items', 'weatherFactorScore');
	await queryInterface.removeColumn('items', 'temperaturFactorScore');
	await queryInterface.removeColumn('items', 'humidityFactorScore');
	await queryInterface.removeColumn('items', 'altitudeFactorScore');
	await queryInterface.removeColumn('items', 'securityRiskFactorScore');
	await queryInterface.removeColumn('items', 'humanRiskFactorScore');
	await queryInterface.removeColumn('items', 'totalRiskScore');
  }
};
