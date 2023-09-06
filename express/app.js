const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

const userRouter = require(path.join(__dirname, "routers", "user.router"));

const authRouter = require(path.join(__dirname, "routers", "auth.router"));


// app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// app.use(useragent.express());

app.get("/", (request, response) => {
	response.status(200);
	response.json({ status: "ok" });
});

// ================== ROUTES ==================

// ================== USER ROUTES ==================
app.use("/api/users", userRouter);

// ================== AUTH ROUTES ==================
app.use("/api/auth", authRouter);

module.exports = app;
