require("dotenv").config();
require("./config/dbConnection");

const express = require("express");
const path = require("path");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const cors = require("cors");

const app = express();
/**
 * Middlewares
 */
const corsOptions = { origin: process.env.FRONTEND_URL, credentials: true };

app.use(cors(corsOptions));
app.use(logger("dev")); // This logs HTTP reponses in the console.
app.use(express.json()); // Access data sent as json @req.body
app.use(express.urlencoded({ extended: false })); // Access data sent as application/x-www-form-urlencoded @req.body

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }), // Persist session in database.
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    resave: true,
    saveUninitialized: true,
  })
);

// // Test to see if user is logged In before getting into any router.
// app.use(function (req, res, next) {
//   console.log("User in session =>", req.session.currentUser);
//   next();
// });

/**
 * Routes
 */

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

// 404 Middleware
app.use((req, res, next) => {
  const error = new Error("Ressource not found.");
  error.status = 404;
  next(error);
});

// Error handler middleware
// If you pass an argument to your next function in any of your routes or middlewares
// You will end up in this middleware
// next("toto") makes you end up here
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }
  console.log("An error occured");
  res.status(err.status || 500);
  if (!res.headersSent) {
    // A limited amount of information sent in production
    if (process.env.NODE_ENV === "production") {
      res.json(err);
    } else {
      res.json(
        JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)))
      );
    }
  }
});

module.exports = app;
