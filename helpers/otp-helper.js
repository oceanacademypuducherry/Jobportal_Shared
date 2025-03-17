// Helper function to send OTP via SMS
const axios = require("axios");

const sendOTPviaSMS = async (name, mobileNumber, otpCode) => {
  // Validate name
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    throw new Error(
      "Invalid or missing name. Name must be a non-empty string."
    );
  }

  // Validate mobile number
  if (
    !mobileNumber ||
    typeof mobileNumber !== "string" ||
    !/^\d{10}$/.test(mobileNumber)
  ) {
    throw new Error(
      "Invalid or missing mobile number. It must be exactly 10 digits."
    );
  }

  // Validate OTP code as a string
  if (!otpCode || typeof otpCode !== "string" || !/^\d{4,6}$/.test(otpCode)) {
    throw new Error(
      "Invalid or missing OTP. OTP must be a string with 4 to 6 digits."
    );
  }

  // Construct the message
  const message = `Dear ${name}, Your OTP is: ${otpCode}. Please enter this code to verify your identity. Do not share this OTP with anyone. - OCEAN ACADEMY`;

  // Construct the SMS URL
  const smsUrl = `https://sapteleservices.com/SMS_API/sendsms.php?username=oceanacademy&password=Ocean@123&mobile=${mobileNumber}&sendername=OCEAJP&message=${encodeURIComponent(
    message
  )}&routetype=1&tid=1707172233290230214`;

  try {
    // Send the SMS
    await axios.get(smsUrl);
  } catch (error) {
    // Log and rethrow the error
    console.error("Error in sendOTPviaSMS:", error.message);
    throw new Error("Failed to send OTP. Reason: " + error.message);
  }
};

module.exports = { sendOTPviaSMS };
