const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

async function generateSummaryImage(countries, lastRefreshedAt) {
  const totalCountries = countries.length;

  // Sort countries by estimated_gdp descending
  const top5 = [...countries]
    .filter((c) => c.estimated_gdp)
    .sort((a, b) => b.estimated_gdp - a.estimated_gdp)
    .slice(0, 5);

  const templatePath = path.join(
    __dirname,
    "../templates/summary-template.html",
  );
  const templateSource = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(templateSource);

  const data = {
    totalCountries,
    lastRefreshedAt: new Date(lastRefreshedAt).toLocaleString(),
    top5: top5.map((c) => ({
      ...c,
      estimated_gdp: c.estimated_gdp.toLocaleString(),
    })),
  };

  const html = template(data);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html);
  await page.setViewport({ width: 800, height: 600 });

  const filePath = path.join(__dirname, "../cache/summary.png");

  // Ensure cache directory exists
  if (!fs.existsSync(path.join(__dirname, "../cache"))) {
    fs.mkdirSync(path.join(__dirname, "../cache"));
  }

  await page.screenshot({ path: filePath });

  await browser.close();

  console.log("✅ Summary image generated at:", filePath);
}

module.exports = generateSummaryImage;
