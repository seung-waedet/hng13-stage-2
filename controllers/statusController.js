const { Country, RefreshStatus } = require("../models");
const logger = require("../config/logger");

exports.getStatus = async (req, res) => {
  try {
    const totalCountries = await Country.count();
    const lastRefreshed = await RefreshStatus.findOne();

    res.status(200).json({
      total_countries: totalCountries,
      last_refreshed_at: lastRefreshed.last_refreshed_at,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
