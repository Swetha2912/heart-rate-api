# Heart Rate API

This is a Node.js based API to receive, process, and store Heart Rate data.

## Prerequisites

- Node.js
- PostgreSQL

## Steps to run

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd heart-rate-api
   ```

2. Install Dependencies:
    ```bash
    npm install
    ```
3. Set up PostgreSQL:
- Update the database configuration in `config/database.js` with your PostgreSQL credentials

## Running the API

1. Start the server:
    ```bash
    node server.js
    ```
2. The API will be available at `http://localhost:3000`.

## API Endpoints

1. Send a POST request to /api/heart-rate with the JSON payload to test the API.




