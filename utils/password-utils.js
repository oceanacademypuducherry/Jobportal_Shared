const bcrypt = require("bcrypt");

// Function to hash a password
async function hashPassword(plaintextPassword) {
  try {
    // Generate a salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

    return hashedPassword;
  } catch (error) {
    // Handle errors appropriately
    console.error("Error hashing password:", error);
    throw new Error("Password hashing failed");
  }
}

// Function to compare a plaintext password with a hashed password
async function comparePassword(plaintextPassword, hashedPassword) {
  // Input validation
  if (
    typeof plaintextPassword !== "string" ||
    typeof hashedPassword !== "string"
  ) {
    throw new Error("Invalid input type");
  }

  if (!plaintextPassword || !hashedPassword) {
    throw new Error("Passwords cannot be empty");
  }

  try {
    // Compare the plaintext password with the hashed password
    const isMatch = await bcrypt.compare(plaintextPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing password:", error.message);
    throw new Error("Password comparison failed");
  }
}

// Export the function
module.exports = {
  hashPassword,
  comparePassword,
};
