const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 3001;

// PostgreSQL setup
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "0000",
  port: 5432,
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
    console.error("Error saving data:", error);
    res.status(500).send("Error saving data");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
