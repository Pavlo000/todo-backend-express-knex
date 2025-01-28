module.exports = class ApiError extends Error {
  statusCode;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }

  static badRequest(message) {
    return new ApiError(message, 400);
  }

  static notFound(message) {
    return new ApiError(message, 404);
  }

  static invalidPayload(message) {
    return new ApiError(message, 422);
  }

  static unauthorized(message) {
    return new ApiError(message, 401);
  }
};
