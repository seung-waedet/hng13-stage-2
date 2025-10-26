const express = require("express");
const router = express.Router();
const statusController = require("../controllers/statusController");

/**
 * @swagger
 * tags:
 *   name: Status
 *   description: API to get the status of the application
 */

/**
 * @swagger
 * /status:
 *   get:
 *     summary: Get the status of the application
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: The status of the application
 *       500:
 *         description: Internal server error
 */
router.get("/", statusController.getStatus);

module.exports = router;
