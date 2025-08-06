const nodemailer = require("nodemailer");
const puppeteer = require("puppeteer-core");
const chromium = require("chrome-aws-lambda");
const localPuppeteer = require("puppeteer");
const { invoiceEmailTemplate } = require("./invoiceTemplate");
const { ToWords } = require("to-words");
const { OUR_ORG_INFO } = require("../constants");
const { invoiceSchema } = require("../../../src/validators");
const { isProduction, isTest } = require("./env-utils");
// const { isProduction, isTest } = require("jp-shared/utils");
const toWords = new ToWords();

const generatePDF = async (htmlContent) => {
 try {
    let browser;

    if (isProduction() || isTest()) {
      // In serverless/production environments
      browser = await puppeteer.launch({
        executablePath: await chromium.executablePath,
        args: chromium.args,
        headless: chromium.headless,
      });
    } else {
      // In local development
      const localPuppeteer = require("puppeteer"); // Use full puppeteer
      browser = await localPuppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    }

    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();
    return pdfBuffer;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
const sendInvoice = async (invoiceInput) => {

  // Validate input
  const { error, value } = invoiceSchema.validate(invoiceInput);
  if (error) throw new Error(`Invalid invoice input: ${error.message}`);

  // Destructure the validated value
  const {
    recruiterEmail,
    gstAmount,
    totalAmount,
    amount,
    gstPercentage,
    billNumber,
    jobId,
    planName,
  } = value;

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
