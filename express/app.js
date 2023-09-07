// app.js (or your main Express application file)

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routers/routes');

const app = express();

// ================== MIDDLEWARE ==================
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Middleware for handling CORS
app.use(cors());

// ================== ROUTES ==================
app.use("/", routes);

module.exports = app;
