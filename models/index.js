const sequelize = require('../config/database');
const Country = require('./country');
const RefreshStatus = require('./refreshStatus');

const db = {
    sequelize,
    Country,
    RefreshStatus
};

sequelize.sync({ force: false });

module.exports = db;
