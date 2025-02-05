require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// API Route to Log Data Instead of Saving
app.post("/submit", (req, res) => {
    const { name, email, age } = req.body;

    // Log the data instead of saving it to the database
    console.log("Received Data:", { name, email, age });

    res.json({ success: true, message: "Data logged successfully!" });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
