const express = require("express");
const path = require("path");

const models = require(path.join(__dirname, "..", "..", "models"));

const UserController = require(path.join(__dirname, "..", "controllers", "userController"));

const router = express.Router();

// router.get("/", (request, response) => {
// 	const { filter, page, count } = request.query;
// 	models.User.index(filter, page, count, models, (error, result) => {
// 		if (error) {
// 			response.json({ status: "error", error: error });
// 		} else {
// 			response.json({ status: "ok", ...result });
// 		}
// 	});
// });

router.get("/", UserController.index);
router.get("/:id", UserController.show);


// router.get("/:id", (request, response) => {
// 	const { id } = request.params;

// 	models.User.show(id, (error, result) => {
// 		if (error) {
// 			response.json({ status: "error", error: error });
// 		} else {
// 			response.json({ status: "ok", data: result });
// 		}
// 	});
// });
module.exports = router;
