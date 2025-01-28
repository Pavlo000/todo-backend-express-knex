const ApiError = require('../utils/apiError.js');
const jwtService = require('../services/jwtService.js');

module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(ApiError.unauthorized('Unauthorized'));
  }

  const accessToken = authHeader.split(' ')[1];

  if (!accessToken) {
    return next(ApiError.unauthorized('Unauthorized'));
  }

  const userData = jwtService.verifyAccessToken(accessToken);

  if (!userData) {
    return next(ApiError.unauthorized('Unauthorized'));
  }

  req.user = userData;

  next();
}
