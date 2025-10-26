const logger = require("../config/logger");

const { Country } = require("../models");
const countryService = require("../services/countryService");
const fs = require("fs");

exports.refreshCountries = (req, res) => {
  countryService.refreshCountryData().catch(logger.error);
  res.status(202).json({ message: "Country data refresh initiated" });
};

exports.getAllCountries = async (req, res) => {
  try {
    const { region, currency, sort } = req.query;
    const options = { where: {} };

    if (region) {
      options.where.region = region;
    }

    if (currency) {
      options.where.currency_code = currency;
    }

    if (sort) {
      if (sort === "gdp_desc") {
        options.order = [["estimated_gdp", "DESC"]];
      } else if (sort === "gdp_asc") {
        options.order = [["estimated_gdp", "ASC"]];
      }
    }

    const countries = await Country.findAll(options);
    res.status(200).json(countries);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCountryByName = async (req, res) => {
  try {
    const { name } = req.params;
    const country = await Country.findOne({ where: { name } });

    if (!country) {
      return res.status(404).json({ error: "Country not found" });
    }

    res.status(200).json(country);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteCountryByName = async (req, res) => {
  try {
    const { name } = req.params;
    const result = await Country.destroy({ where: { name } });

    if (result === 0) {
      return res.status(404).json({ error: "Country not found" });
    }

    res.status(200).json({ message: "Country deleted successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const path = require("path");

exports.getSummaryImage = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../cache/summary.png");

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Summary image not found" });
    }

    res.sendFile(filePath);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
