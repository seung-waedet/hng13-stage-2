'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Countries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      capital: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      },
      population: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      currency_code: {
        type: Sequelize.STRING
      },
      exchange_rate: {
        type: Sequelize.FLOAT
      },
      estimated_gdp: {
        type: Sequelize.DOUBLE
      },
      flag_url: {
        type: Sequelize.STRING
      },
      last_refreshed_at: {
        type: Sequelize.DATE
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

    await queryInterface.createTable('RefreshStatuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      last_refreshed_at: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Countries');
    await queryInterface.dropTable('RefreshStatuses');
  }
};
