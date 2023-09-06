// app.js (or your main Express application file)

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routers/routes');

const app = express();

// Middleware for parsing JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Middleware for handling CORS
app.use(cors());

// Routes
app.use('/', routes);

module.exports = app;
