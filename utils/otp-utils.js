function generateOTP(otpLength) {
  // Validate otpLength
  if (typeof otpLength !== "number" || otpLength < 1 || otpLength % 1 !== 0) {
    throw new Error("Invalid OTP length. It must be a positive integer.");
  }

  // Calculate the range for OTP generation
  const min = Math.pow(10, otpLength - 1);
  const max = Math.pow(10, otpLength) - 1;

  // Handle edge case when otpLength is 1
  if (otpLength === 1) {
    return Math.floor(Math.random() * 10).toString(); // Generates a single digit OTP (0-9)
  }

  // Generate the OTP number within the specified range
  const otpNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  // Convert the number to a string and return
  return otpNumber.toString();
}

module.exports = { generateOTP };
