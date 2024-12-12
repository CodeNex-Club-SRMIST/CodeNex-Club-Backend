const jwt = require("jsonwebtoken");

/**
 * Generate a JWT token
 * @param {Object} payload - The payload to encode in the token
 * @param {String} secret - The secret key for signing the token
 * @param {Object} options - Additional options for token signing
 * @returns {String} - Signed JWT token
 */
exports.generateToken = (payload, secret, options = { expiresIn: "1d" }) => {
  try {
    return jwt.sign(payload, secret, options);
  } catch (err) {
    throw new Error(`Token generation failed: ${err.message}`);
  }
};

/**
 * Verify a JWT token
 * @param {String} token - The token to verify
 * @param {String} secret - The secret key for verifying the token
 * @returns {Object} - Decoded payload
 */
exports.verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error(`Token verification failed: ${err.message}`);
  }
};
