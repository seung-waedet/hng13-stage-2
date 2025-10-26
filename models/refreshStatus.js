const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RefreshStatus = sequelize.define('RefreshStatus', {
    last_refreshed_at: {
        type: DataTypes.DATE
    }
});

module.exports = RefreshStatus;
