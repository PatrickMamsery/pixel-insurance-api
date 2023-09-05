var _ = require("lodash");

exports.paginate = (data, count, page, limit) => {
	console.log("adfdfasdfsa");
	const totalItems = count;
	const currentPage = page;
	const nextPage = page + 1;
	const totalPages = _.ceil(totalItems / limit);

	return { data, totalItems, totalPages, currentPage, nextPage, size: limit };
};
