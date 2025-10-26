const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Country = sequelize.define('Country', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capital: {
        type: DataTypes.STRING
    },
    region: {
        type: DataTypes.STRING
    },
    population: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    currency_code: {
        type: DataTypes.STRING
    },
    exchange_rate: {
        type: DataTypes.FLOAT
    },
    estimated_gdp: {
        type: DataTypes.DOUBLE
    },
    flag_url: {
        type: DataTypes.STRING
    },
    last_refreshed_at: {
        type: DataTypes.DATE
    }
});

module.exports = Country;
