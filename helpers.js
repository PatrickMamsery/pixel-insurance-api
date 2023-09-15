var _ = require("lodash");

exports.paginate = (data, count, page, limit) => {
	// console.log("adfdfasdfsa");
	const totalItems = count;
	const currentPage = parseInt(page);
	const totalPages = _.ceil(totalItems / limit);
	const nextPage = (parseInt(page) + 1) * limit < totalItems ? parseInt(page) + 1 : null;

	return { data, totalItems, totalPages, currentPage, nextPage, size: limit };
};

exports.sendResponse = (res, data, message, statusCode = 200) => {
	if (statusCode >= 200 && statusCode < 300) {
	  res.status(statusCode).json({
		status: "success",
		...data,
		message,
		statusCode: statusCode,
	  });
	} else {
	  res.status(statusCode).json({
		status: "error",
		error: data,
		message,
		statusCode: statusCode,
	  });
	}
  };

  exports.sendError = (res, error, statusCode = 500) => {
	res.status(statusCode).json({
	  status: "error",
	  error,
	  statusCode: statusCode,
	});
  };

