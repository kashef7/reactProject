import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";

const app = express();
const port = 5000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "users",
    password: "qwsa9988",
    port: "5432"
});

// Connect to the PostgreSQL database
db.connect(err => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to the database');
    }
});

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to serve static files from the "public" directory
app.use(express.static("public"));

// Middleware to enable CORS (Cross-Origin Resource Sharing)
// This allows your frontend to communicate with the backend from a different origin
app.use(cors());

// Middleware to parse JSON bodies
// bodyParser.json() parses incoming requests with JSON payloads and is based on body-parser
app.use(bodyParser.json());

// Endpoint to fetch all users from the database
app.get("/users", (req, res) => {
    db.query("SELECT * FROM projectuser", (err, result) => {
        if (err) {
            console.error('Query error', err.stack);
            res.status(500).send("Error fetching users");
        } else {
            res.json(result.rows); // Send the fetched users as a JSON response
        }
    });
});

// Endpoint to add a new user to the database
app.post("/add", (req, res) => {
    const { username, password } = req.body;
    db.query(
        "INSERT INTO projectuser (username, password) VALUES ($1, $2) RETURNING *",
        [username, password],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error inserting values");
            } else {
                res.json(result.rows[0]); // Send the inserted user as a JSON response
            }
        }
    );
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
