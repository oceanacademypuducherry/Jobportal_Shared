const validator = require("validator");
const { check } = require("express-validator");

// Separate validation into a function for better organization
const validateEmail = (email) => validator.isEmail(email);

// Utility function to capitalize space-separated words
const capitalizeSpaceSeparatedWords = (str) => {
  if (!str || typeof str !== "string") {
    return ""; // Return an empty string for undefined or non-string values
  }

  // Trim leading and trailing spaces, and replace multiple spaces with a single space
  const trimmedStr = str.trim().replace(/\s+/g, " ");

  return trimmedStr
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Validate mobile number and OTP code
const validateMobileNumber = (mobileNumber) => {
  return typeof mobileNumber === "string" && /^\d{10}$/.test(mobileNumber);
};

// Define custom validators
const validateReason = (reason) => {
  return reason.length > 5; // Example: reason must be at least 5 characters long
};

// Define custom validators
const isIntegerValidator = {
  validator: Number.isInteger,
  message: "{PATH} must be an integer",
};

const isValidDateValidator = {
  validator: (value) => !isNaN(Date.parse(value)),
  message: "{PATH} must be a valid date",
};

const validateFile = (file) => {
  if (!file || typeof file !== "object") {
    throw new Error("Invalid file parameter. The file must be an object.");
  }
  if (!file.buffer || !Buffer.isBuffer(file.buffer)) {
    throw new Error(
      "Invalid file buffer. The file must contain a valid buffer."
    );
  }
  if (!file.mimetype || typeof file.mimetype !== "string") {
    throw new Error(
      "Invalid file mimetype. The file must contain a valid mimetype."
    );
  }
};

const validateFilePath = (filePath) => {
  if (
    !filePath ||
    typeof filePath !== "string" ||
    filePath.trim().length === 0
  ) {
    throw new Error(
      "Invalid filePath parameter. The filePath must be a non-empty string."
    );
  }
};

const normalizeOrganizationName = (name) => {
  if (typeof name !== "string") {
    throw new TypeError("Input must be a string.");
  }
  return name
    .replace(/\s+/g, "") // Remove all spaces
    .toLowerCase(); // Convert to lowercase
};

const validatePagination = [
  check("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer."),
  check("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer."),
  check("sortField")
    .optional()
    .isIn(["createdAt", "updatedAt"])
    .withMessage(
      "Invalid sort field. Valid fields are 'createdAt' and 'updatedAt'."
    ),
  check("sort")
    .optional()
    .isInt({ min: -1, max: 1 })
    .withMessage(
      "Invalid sort order. Use 1 for ascending and -1 for descending."
    ),
  check("search")
    .optional()
    .isString()
    .withMessage("Search query must be a string."),
];

module.exports = {
  capitalizeSpaceSeparatedWords,
  validateEmail,
  validateReason,
  isIntegerValidator,
  isValidDateValidator,
  validateFile,
  validateFilePath,
  validateMobileNumber,
  normalizeOrganizationName,
  validatePagination,
};
