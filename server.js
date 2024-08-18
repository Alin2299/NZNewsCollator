// JavaScript file that contains the backend code for the news collator program

// Import the necessary modules
const express = require("express");
const mysql = require("mysql2");
const path = require("path");

// Create an app instance and define the port for the app
const app = express();
const port = 3000;

// Define the database configuration
const db = mysql.createConnection({
    user: process.env.NEWS_COLLATOR_DB_USER,
    password: process.env.NEWS_COLLATOR_DB_PASSWORD,
    host: process.env.NEWS_COLLATOR_DB_HOST,
    database: process.env.NEWS_COLLATOR_DB_NAME
});

// Make the app serve files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Ensures that the app properly parses JSON
app.use(express.json())

// Endpoint that fetches all articles from the appropriate database
app.get("/articles", (req, res) => {
    db.query("SELECT * FROM nz_news_collator", (error, results) => {
        if (error) {
            throw error;
        }
        // Send the results in JSON format
        res.json(results);
    });
});

// Start the server/app on the specific port
app.listen(port, () => {
    console.log(`App running at localhost:${port}`)
});