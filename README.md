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
