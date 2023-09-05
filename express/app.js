const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

const userRouter = require(path.join(__dirname, "routers", "user.router"));

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

app.use("/api/users", userRouter);

module.exports = app;
