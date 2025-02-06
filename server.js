require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "your_database"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL Database");
});

// Insert Data into MySQL
app.post("/submit", (req, res) => {
    const { name, email, age } = req.body;

    const query = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
    db.query(query, [name, email, age], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }
        res.json({ success: true, message: "Data saved successfully!" });
    });
});

// Fetch Data from MySQL
app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }
        res.json(results);
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
