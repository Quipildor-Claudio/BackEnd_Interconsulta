require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const test_routes = require('./server/routes/routes');
const isAuthenticated = require("./middlewares/is-authenticated");
const bcrypt = require("bcrypt");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");


mongoose.connect(process.env.MONGODB_URI);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "*", // Allow the frontend to connect to the server
  credentials: true, // Allow credentials, required for sessions with authentication
};

// Enable CORS
app.use(cors(corsOptions));



// Middleware to create a session ID
// When using req.session, the session ID will be stored in the cookie and the session data will be stored in memory (by default)
app.use(
  session({
    secret: process.env.SECRET_KEY, // Secret key for session
    resave: false, // Avoids resaving sessions that haven't changed
    saveUninitialized: true, // Saves new sessions
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      maxAge: 1000 * 60 * 60 * 24, // Time in milliseconds (1 day)
    }), // Store the session in MongoDB, overrides the default memory store

    // This configuration ensures that the cookie is sent over HTTPS (if available) and is not accessible through client-side scripts
    cookie: { secure: "auto", httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }, // Max age in milliseconds (1 day)
  })
);


app.use(morgan('dev'));
app.use('/api', test_routes);

// Using auth middleware to check if the user is authenticated
// The middleware will check if the user is logged in by checking the session
// If the user is logged in, the request will be passed to the endpoint
// If the user is not logged in, the middleware will return a 401 status
app.get("/is-authenticated", isAuthenticated, (req, res) => {
  res.status(200).send({ message: "Authenticated" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`)
})