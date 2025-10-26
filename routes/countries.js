const express = require("express");
const router = express.Router();
const countryController = require("../controllers/countryController");

/**
 * @swagger
 * tags:
 *   name: Countries
 *   description: API to manage countries
 */

/**
 * @swagger
 * /countries/refresh:
 *   post:
 *     summary: Refresh country data
 *     tags: [Countries]
 *     responses:
 *       200:
 *         description: Country data refreshed successfully
 *       500:
 *         description: Internal server error
 */
router.post("/refresh", countryController.refreshCountries);

/**
 * @swagger
 * /countries:
 *   get:
 *     summary: Get all countries
 *     tags: [Countries]
 *     parameters:
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: Filter by region
 *       - in: query
 *         name: currency
 *         schema:
 *           type: string
 *         description: Filter by currency code
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [gdp_desc, gdp_asc]
 *         description: Sort by estimated GDP
 *     responses:
 *       200:
 *         description: A list of countries
 *       500:
 *         description: Internal server error
 */
router.get("/", countryController.getAllCountries);

/**
 * @swagger
 * /countries/{name}:
 *   get:
 *     summary: Get a country by name
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the country
 *     responses:
 *       200:
 *         description: The country data
 *       404:
 *         description: Country not found
 *       500:
 *         description: Internal server error
 */
router.get("/image", countryController.getSummaryImage);
router.get("/:name", countryController.getCountryByName);

module.exports = router;
