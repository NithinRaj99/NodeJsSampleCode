## Working of the Node.js Site
This Node.js project creates a simple web server using Express.js that serves an HTML form and logs user input to the console.

## How It Works
Serves the HTML Form

The server serves index.html from the public folder when you visit http://localhost:5000/.
The form allows users to enter their name, email, and age and submit the data.
Handles Form Submission

When the user submits the form, it sends the data to the backend via a POST request to /submit.
Logs the Data Instead of Saving to Database

The server receives the form data and logs it to the console instead of storing it in a database.
Responds with Success Message

After logging the data, the server sends a response confirming that the data was received.
Example Workflow
User opens http://localhost:5000/ and sees the form.
Fills in details and submits the form.
The server logs the data like this:
sh
Copy
Edit
Received Data: { name: 'John Doe', email: 'john@example.com', age: 25 }
User gets a success alert on the page.



## code to add express to node

```
npm init -y
npm install express pg body-parser cors dotenv

```
## code to run server

```
node server.js

```
## For adding mysql support

```
npm install mysql2 dotenv

```

- create .env and add 

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database

```
- add this code in server.js

    - //top as import

```
    const mysql = require("mysql2");

```

```

    // MySQL Database Connection
    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    // Connect to MySQL
    db.connect((err) => {
        if (err) {
            console.error("Database connection failed:", err);
            return;
        }
        console.log("Connected to MySQL database");
    });

```
    - inside API route
```

    const query = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
    db.query(query, [name, email, age], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }
        res.json({ success: true, message: "Data saved successfully!" });
    });

```

## For adding pgsql support

```
npm install pg dotenv

```

- create .env and add 

```
PG_HOST=localhost
PG_USER=your_username
PG_PASSWORD=your_password
PG_DATABASE=your_database
PG_PORT=5432

```
- add this code in server.js

    - //top as import

```
    const { Pool } = require("pg"); // Import PostgreSQL client

```

```

   // PostgreSQL Database Connection
const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT
});

// Test Database Connection
pool.connect((err, client, release) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to PostgreSQL database");
    release(); // Release the client back to the pool
});

```
    - inside API route
```

    try {
        const query = "INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *";
        const values = [name, email, age];

        const result = await pool.query(query, values);
        res.json({ success: true, message: "Data saved successfully!", data: result.rows[0] });
    } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).json({ success: false, message: "Database error" });
    }

```