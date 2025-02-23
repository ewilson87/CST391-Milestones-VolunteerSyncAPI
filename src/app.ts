// Import necessary libraries
import express, { Request, Response } from "express";
import eventsRouter from "./events/events.routes";
import usersRouter from "./users/users.routes";
import signupsRouter from "./signups/signups.routes";
import organizationsRouter from "./organizations/organizations.routes";
import logger from "./middleware/logger.middleware";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// Create an instance of the express application
const app = express();

// Define the port number for the server
const port = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// A route handler for the root URL ("/") of the server.
app.get("/", (req: Request, res: Response) => {
    res.send("<h1>Welcome to the VolunteerSync API</h1>");
});

// Use cors middleware to enable cross-origin resource sharing
app.use(cors());

// Use helmet middleware to secure the app by setting HTTP headers
app.use(helmet());

// Use logger middleware in development mode
if (process.env.NODE_ENV === "development") {
    app.use(logger);
    console.log(`${process.env.GREETING} in dev mode`);
}

// Application routes
app.use("/", [eventsRouter, usersRouter, signupsRouter, organizationsRouter]);

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
    console.log(`VolunteerSync API running at http://localhost:${port}`);
});
