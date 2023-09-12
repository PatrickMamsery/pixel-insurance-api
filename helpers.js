var _ = require("lodash");

exports.paginate = (data, count, page, limit) => {
	console.log("adfdfasdfsa");
	const totalItems = count;
	const currentPage = page;
	const nextPage = page + 1;
	const totalPages = _.ceil(totalItems / limit);

	return { data, totalItems, totalPages, currentPage, nextPage, size: limit };
};

exports.sendResponse = (res, data, message, statusCode = 200) => {
	res.status(statusCode).json({
		status: "success",
		data,
		message,
		statusCode: statusCode,
	});
};

exports.sendError = (res, error, statusCode = 500) => {
	res.status(statusCode).json({
		status: "error",
		error,
		statusCode: statusCode,
	});
}
