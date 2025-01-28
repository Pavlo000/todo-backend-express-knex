const jwt = require('jsonwebtoken');

function generateAccessToken(credentials) {
  return jwt.sign(credentials, process.env.JWT_ACCESS_SECRET, { expiresIn: '2h' });
}

function generateRefreshToken(credentials) {
  return jwt.sign(credentials, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

function verifyAccessToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    return null;
  }
}

function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};