const jwt = require("jsonwebtoken");

const generateToken = (payload, options = {}) => {
  try {
    // Set default expiration if not provided
    const tokenOptions = {
      expiresIn: options.expiresIn || "1h", // default to 1 hour
      ...options,
    };

    return jwt.sign(payload, process.env.SECRET_KEY, tokenOptions);
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw new Error("Token generation failed.");
  }
};

module.exports = { generateToken };
