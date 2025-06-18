const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = 3001;

// PostgreSQL setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
   ssl: {
    rejectUnauthorized: false // allow self-signed certs or default cloud certs
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (optional)
app.use(express.static("public"));

// Handle form POST
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, password]
    );
    res.send("Login data stored successfully!");
  } catch (error) {
    console.error("Error saving data:", error.toString());
    res.status(500).send("Error saving data");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
