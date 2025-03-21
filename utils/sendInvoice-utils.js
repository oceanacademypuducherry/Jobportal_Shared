const nodemailer = require("nodemailer");
const puppeteer = require("puppeteer-core");
const chromium = require("chrome-aws-lambda");
// const localPuppeteer = require("puppeteer");

const { invoiceEmailTemplate } = require("./invoiceTemplate");

const { ToWords } = require("to-words");
const { OUR_ORG_INFO } = require("../../constant");
const toWords = new ToWords();

// const generatePDF = async (htmlContent) => {
//   // const browser = await puppeteer.launch();
//   // const browser = await puppeteer.launch({
//   //   // executablePath: puppeteer.executablePath(),
//   //   headless: true, // Ensure the browser runs headlessly in the cloud
//   //   // args: ["--no-sandbox", "--disable-setuid-sandbox"], // Required in some environments like Firebase
//   // });
//    const browser = await puppeteer.launch({
//     executablePath: await chromium.executablePath,  // Use the correct Chromium executable for Firebase
//     args: chromium.args,                          // Set required arguments for headless Chrome
//     headless: chromium.headless,                  // Ensure Chrome runs in headless mode
//   });
//   const page = await browser.newPage();
//   await page.setContent(htmlContent);
//   const pdfBuffer = await page.pdf({ format: "A4" });
//   await browser.close();
//   return pdfBuffer;
// };
const generatePDF = async (htmlContent) => {
  try {
    // from below is for local development
    // const browser = await localPuppeteer.launch();

    // Launch browser with necessary configuration for Firebase or serverless environments
    const browser = await puppeteer.launch({
      executablePath: await chromium.executablePath, // Path to Chromium for Firebase/Serverless
      args: chromium.args, // Required arguments for running headless
      headless: chromium.headless, // Ensure headless mode is enabled
    });

    // Create a new page in the browser
    const page = await browser.newPage();

    // Set the HTML content dynamically passed to this function
    await page.setContent(htmlContent);

    // Generate the PDF from the page's content
    const pdfBuffer = await page.pdf({
      format: "A4", // Set paper format to A4 (you can customize this if needed)
      printBackground: true, // Include background images or colors in the PDF
    });

    // Close the browser once done
    await browser.close();

    // Return the PDF as a buffer
    return pdfBuffer;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error; // Re-throw the error for further handling
  }
};
const sendInvoice = async (recruiterWithPlan, paymentHistory) => {
  if (!recruiterWithPlan || !paymentHistory) {
    throw new Error("No data provided to send the invoice.");
  }

  const { recruiterEmail, gstAmount, totalAmount, amount, gstPercentage } =
    recruiterWithPlan;

  const { billNumber, jobId, planName } = paymentHistory;

  // Check if the required environment variables are set
  if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
    const errorMsg = "Email credentials are not set in environment variables.";
    console.error(errorMsg);
    throw new Error(errorMsg); // Throw error to propagate it back to the caller
  }
  // console.log(totalAmount);
  // Email content
  const htmlBody = `
     <p>Dear Customer,</p>
     <p>Please find attached your invoice. If you have any questions, feel free to reach out to us.</p>
     <p>Best regards,<br>Ocean academy</p>
   `;
  const invoiceData = {
    date: new Date().toLocaleDateString(),
    billNo: billNumber,
    jobId,
    items: [{ description: `${planName}`, amount: `${amount}` }],
    totalAmount,
    totalAmountWords: toWords.convert(totalAmount, { currency: true }),
    gstPercentage,
    gstAmount,
    ...OUR_ORG_INFO,
  };

  // Generate the invoice HTML content
  const invoiceHTML = invoiceEmailTemplate(invoiceData);
  const pdfBuffer = await generatePDF(invoiceHTML);

  // Create a transporter using your email credentials
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD, // SMTP Password
    },
    // === add this === //
    tls: { rejectUnauthorized: false },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL,
    to: recruiterEmail,
    subject: "Welcome to our OA Job Portal!",
    html: htmlBody, // HTML content from the template
    attachments: [
      {
        filename: "invoice.pdf",
        content: pdfBuffer,
        encoding: "base64",
      },
    ],
  };
  // Send the email with the PDF attachment
  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent successfully!", info);
    return { status: 200, message: "Email sent successfully!", info };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email", error);
  }
};

module.exports = { sendInvoice, generatePDF };
