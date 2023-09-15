const jwt = require('jsonwebtoken');
const express = require('express');

class JwtAuthHelper {
  /**
   * Create a JwtAuthHelper instance.
   * @param {string} secretKey - Your secret key used for JWT token signing.
   * @param {string} tokenExpiration - The token expiration time (e.g., '1h' for 1 hour).
   */
  constructor(secretKey, tokenExpiration) {
    this.secretKey = secretKey;
    this.tokenExpiration = tokenExpiration;
  }

  /**
   * Generate a JWT token with the given payload.
   * @param {object} payload - The payload to be included in the JWT token.
   * @returns {string} - The generated JWT token.
   */
  generateToken(payload) {
    return jwt.sign(payload, this.secretKey, { expiresIn: this.tokenExpiration });
  }

  /**
   * Middleware to verify JWT tokens in incoming requests.
   * @param {object} req - The Express.js request object.
   * @param {object} res - The Express.js response object.
   * @param {function} next - The next middleware function.
   * @returns {void}
   */
  verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, this.secretKey);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  }
}

module.exports = JwtAuthHelper;
