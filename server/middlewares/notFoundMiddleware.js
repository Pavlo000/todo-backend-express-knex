const ApiError = require('../utils/apiError.js');

module.exports = function notFoundMiddleware(req, res, next) {
  next(ApiError.notFound('Route not found'));
};
