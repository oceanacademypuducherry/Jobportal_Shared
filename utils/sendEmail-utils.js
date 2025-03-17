const nodemailer = require("nodemailer");

const sendEmail = async (senderEmail, emailBody) => {
  // Check if the required environment variables are set
  if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
    const errorMsg = "Email credentials are not set in environment variables.";
    console.error(errorMsg);
    throw new Error(errorMsg); // Throw error to propagate it back to the caller
  }

  // Create a transporter using your email credentials
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD, // SMTP Password
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL,
    to: senderEmail,
    subject: "Welcome to our OA Job Portal!",
    html: emailBody,
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${senderEmail}: ${info.response}`);
    // return { success: true, message: `Email sent to ${senderEmail}` }; // Return a success message
  } catch (error) {
    const errorMsg = `Error sending email to ${senderEmail}: ${error.message}`;
    console.error(errorMsg);
    throw new Error(errorMsg); // Throw error to propagate it back to the caller
  }
};

module.exports = { sendEmail };
