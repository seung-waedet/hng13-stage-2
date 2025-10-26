# Country Currency & Exchange API

This is a RESTful API that fetches country data from an external API, stores it in a database, and provides CRUD operations.

## Functionalities

- Fetch country data from: `https://restcountries.com/v2/all?fields=name,capital,region,population,flag,currencies`
- For each country, extract the currency code (e.g. NGN, USD, GBP).
- Then fetch the exchange rate from: `https://open.er-api.com/v6/latest/USD`
- Match each country's currency with its rate (e.g. NGN → 1600).
- Compute a field `estimated_gdp` = `population` × `random(1000–2000)` ÷ `exchange_rate`.
- Store or update everything in MySQL as cached data.

## Endpoints

- `POST /countries/refresh` → Fetch all countries and exchange rates, then cache them in the database
- `GET /countries` → Get all countries from the DB (support filters and sorting) - `?region=Africa` | `?currency=NGN` | `?sort=gdp_desc`
- `GET /countries/:name` → Get one country by name
- `DELETE /countries/:name` → Delete a country record
- `GET /status` → Show total countries and last refresh timestamp
- `GET /countries/image` → serve summary image

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up the database:**

    - Make sure you have a MySQL database hosted and get the database connection URL.

4.  **Create a `.env` file:**

    Create a `.env` file in the root of the project and add the following environment variables:

    ```
    DB_URL=mysql://user:password@host:port/database
    PORT=3000
    ```

5.  **Run migrations:**

    This command will use the `.sequelizerc` file to load the environment variables from the `.env` file and run the migrations.

    ```bash
    npx sequelize-cli db:migrate
    ```

6.  **Run the application:**

    ```bash
    npm start
    ```

    For development with auto-restarting the server on file changes:

    ```bash
    npm run dev
    ```

## Dependencies

- `axios`: ^1.7.2
- `canvas`: ^2.11.2
- `dotenv`: ^16.4.5
- `express`: ^4.19.2
- `mysql2`: ^3.10.0
- `sequelize`: ^6.37.3

## Logging

The application uses `winston` for logging. Logs are stored in `combined.log` and errors are stored in `error.log`.

## API Documentation

To access the API documentation, run the application and go to `http://localhost:3000/api-docs` in your browser.
