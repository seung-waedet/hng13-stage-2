const { Sequelize } = require("sequelize");
require("dotenv").config();
const logger = require("./logger");

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "mysql",
  logging: (msg) => logger.debug(msg),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
