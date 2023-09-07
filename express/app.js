// app.js (or your main Express application file)

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routers/routes');

const app = express();

const userRouter = require(path.join(__dirname, "routers", "user.router"));

const authRouter = require(path.join(__dirname, "routers", "auth.router"));


// app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Middleware for handling CORS
app.use(cors());

// ================== ROUTES ==================

// ================== USER ROUTES ==================
app.use("/api/users", userRouter);

// ================== AUTH ROUTES ==================
app.use("/api/auth", authRouter);

module.exports = app;
