const logger = require("../config/logger");

const axios = require("axios");
const { Country, RefreshStatus } = require("../models");

const generateSummaryImage = require("../utils/generateSummaryImage");

exports.refreshCountryData = async () => {
  try {
    logger.info("Fetching country data...");
    const countriesResponse = await axios.get(
      "https://restcountries.com/v2/all?fields=name,capital,region,population,flag,currencies",
    );
    const exchangeRatesResponse = await axios.get(
      "https://open.er-api.com/v6/latest/USD",
    );

    const countries = countriesResponse.data;
    const exchangeRates = exchangeRatesResponse.data.rates;

    const countryData = [];

    for (const country of countries) {
      const currency =
        country.currencies && country.currencies.length > 0
          ? country.currencies[0]
          : null;
      const currencyCode = currency ? currency.code : null;
      const exchangeRate = currencyCode ? exchangeRates[currencyCode] : null;
      const estimatedGdp =
        (country.population * (Math.random() * (2000 - 1000) + 1000)) /
        (exchangeRate || 1);

      const [existingCountry, created] = await Country.findOrCreate({
        where: { name: country.name },
        defaults: {
          capital: country.capital,
          region: country.region,
          population: country.population,
          currency_code: currencyCode,
          exchange_rate: exchangeRate,
          estimated_gdp: estimatedGdp,
          flag_url: country.flag,
          last_refreshed_at: new Date(),
        },
      });

      if (!created) {
        await existingCountry.update({
          capital: country.capital,
          region: country.region,
          population: country.population,
          currency_code: currencyCode,
          exchange_rate: exchangeRate,
          estimated_gdp: estimatedGdp,
          flag_url: country.flag,
          last_refreshed_at: new Date(),
        });
      }
      countryData.push(existingCountry.get({ plain: true }));
    }

    const refreshStatus = await RefreshStatus.findOne();
    if (refreshStatus) {
      await refreshStatus.update({ last_refreshed_at: new Date() });
    } else {
      await RefreshStatus.create({ last_refreshed_at: new Date() });
    }

    await generateSummaryImage(countryData, new Date());
  } catch (error) {
    if (error.response) {
      logger.error(
        `Error fetching data from ${error.config.url}: ${error.response.status} ${error.response.statusText}`,
      );
      throw new Error(
        `External data source unavailable: Could not fetch data from ${error.config.url}`,
      );
    } else {
      logger.error("Error refreshing country data:", error);
      throw error;
    }
  }
};
