require("dotenv").config();
const express = require("express");
const countryRoutes = require("./routes/countries");
const statusRoutes = require("./routes/status");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const logger = require("./config/logger");

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use("/countries", countryRoutes);
app.use("/status", statusRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
