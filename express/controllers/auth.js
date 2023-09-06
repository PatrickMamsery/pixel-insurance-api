const express = require("express");
const path = require("path");

const models = require(path.join(__dirname, "..", "..", "models"));

const router = express.Router();

models.User.register = (data, callback) => {
	
}
