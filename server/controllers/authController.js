const userService = require('../services/userService.js');
const ApiError = require('../utils/apiError.js');
const bcryptService = require('../services/bcryptService.js');
const jwtService = require('../services/jwtService.js');
const tokenService = require('../services/tokenService.js');

async function register(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    throw ApiError.invalidPayload('Username and password are required');
  }

  const existingUser = await userService.getByUsername(username);

  if (existingUser) {
    throw ApiError.invalidPayload('User already exists');
  }

  const hashedPassword = bcryptService.hash(password);

  await userService.create(username, hashedPassword);

  res.send({
    success: true,
  });
}

async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    throw ApiError.invalidPayload('Username and password are required');
  }

  const user = await userService.getByUsername(username);

  if (!user) {
    throw ApiError.invalidPayload('User not found');
  }

  const isPasswordValid = bcryptService.compare(password, user.password);

  if (!isPasswordValid) {
    throw ApiError.invalidPayload('Invalid password');
  }

  await _sendAuth(res, user);
}

async function refresh(req, res) {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw ApiError.unauthorized('Refresh token is required');
  }

  const userData = jwtService.verifyRefreshToken(refreshToken);

  if (!userData) {
    throw ApiError.unauthorized('Invalid refresh token');
  }

  const user = await userService.getById(userData.id);

  if (!user) {
    throw ApiError.unauthorized('User not found');
  }

  await _sendAuth(res, user);
}

async function logout(req, res) {
  const { refreshToken } = req.cookies;

  const userData = jwtService.verifyRefreshToken(refreshToken);

  res.clearCookie('refreshToken');

  if (!userData) {
    throw ApiError.unauthorized('Invalid refresh token');
  }

  await tokenService.remove(userData.id);

  res.send({
    success: true,
  });
}

async function _sendAuth(res, user) {
  const credentials = {
    id: user.id,
    username: user.username,
    password: user.password,
  };

  const accessToken = jwtService.generateAccessToken(credentials);
  const refreshToken = jwtService.generateRefreshToken(credentials);

  await tokenService.save(refreshToken, user.id);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.send({
    success: true,
    data: {
      accessToken,
      user,
    },
  });
}

module.exports = {
  register,
  login,
  refresh,
  logout,
};
