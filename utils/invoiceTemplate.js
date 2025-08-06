module.exports.invoiceEmailTemplate = ({
  date = "06-12-2024",
  billNo = "OAJPO1",
  jobId = "JP24019",
  items = [{ description: "Standard Plan", amount: 399 }],
  totalAmount = "470.82",
  totalAmountWords = "Four Hundred Seventy Rupees and Eighty-Two Paise Only",
  gstPercentage = "18",
  gstAmount = "6",
  companyAddress,
  companyName,
  gstNumber,
  logoUrl,
  supportEmail,
  supportMobile,
  termsUrl,
}) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
     
      </head>
      <body>
      <div style="max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #000; padding: 20px; background-color: #fff;">
  <!-- Header Section -->
<div style="overflow: hidden; margin-bottom: 20px; width: 100%;">
  <!-- Logo Section -->
  <div style="float: left;">
    <img src="${logoUrl}" alt="Company Logo" style="width: 150px; height: auto;" />
  </div>
  <!-- Invoice and Date Section -->
  <div style="float: right; text-align: right;">
    <h2 style="margin: 0;">Invoice</h2>
    <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
  </div>
</div>



  <!-- Bill and Company Details -->
<div style="width: 100%; margin-bottom: 20px; font-size: 14px;">
    <!-- Bill Details -->
    <div style="display: inline-block; width: 48%; vertical-align: top;">
      <p style="margin: 5px 0;"><strong>Bill No:</strong> ${billNo}</p>
      <p style="margin: 5px 0;"><strong>Job ID:</strong> ${jobId}</p>
    </div>
    <!-- Company Name and Address -->
    <div style="display: inline-block; width: 48%; text-align: right; vertical-align: top;">
      <p style="margin: 5px 0;"><strong>${companyName}</strong></p>
      <p style="margin: 5px 0;">${companyAddress}</p>
    </div>
  </div>


  <!-- Table Section -->
  <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
    <thead>
      <tr>
        <th style="border: 1px solid #000; padding: 10px; background-color: #f4f4f4;">S. No</th>
        <th style="border: 1px solid #000; padding: 10px; background-color: #f4f4f4;">Description of Service</th>
        <th style="border: 1px solid #000; padding: 10px; background-color: #f4f4f4;">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${items
        .map(
          (item, index) => `
          <tr>
            <td style="border: 1px solid #000; padding: 10px; text-align: center;">${
              index + 1
            }</td>
            <td style="border: 1px solid #000; padding: 10px; text-align: center;">${
              item.description
            }</td>
            <td style="border: 1px solid #000; padding: 10px; text-align: center;">${
              Number(item.amount).toFixed(2)
            }</td>
          </tr>`
        )
        .join("")}
      <tr>
        <td colspan="2" style="text-align: right; border: 1px solid #000; padding: 10px;">GST (${gstPercentage}%)</td>
        <td style="border: 1px solid #000; padding: 10px; text-align: center;">${gstAmount}</td>
      </tr>
      <tr>
        <td colspan="2" style="text-align: right; border: 1px solid #000; padding: 10px;"><strong>Total Amount</strong></td>
        <td style="border: 1px solid #000; padding: 10px; text-align: center;"><strong>${totalAmount}</strong></td>
      </tr>
    </tbody>
  </table>

  <!-- Total Amount in Words -->
  <div style="margin-top: 20px; text-align: right;">
    <p style="margin: 5px 0;"><strong>Total in Words:</strong> ${totalAmountWords}</p>
  </div>

  <!-- Footer Section -->
  <div style="margin-top: 30px; border-top: 1px solid #000; padding-top: 10px; font-size: 14px;">
  <!-- Support and GST Details -->
  <div style="width: 100%; overflow: hidden;">
    <!-- Left Section -->
    <div style="display: inline-block; width: 48%; vertical-align: top;">
      <p style="margin: 5px 0;"><strong>Email:</strong> ${supportEmail}</p>
      <p style="margin: 5px 0;"><strong>Mobile Number:</strong> ${supportMobile}</p>
      <a href="${termsUrl}" target="_blank" style="text-decoration: none; color: blue;">Terms and conditions</a>
    </div>
    <!-- Right Section -->
    <div style="display: inline-block; width: 48%; text-align: right; vertical-align: top;">
      <p style="margin: 5px 0;"><strong>GST No:</strong> ${gstNumber}</p>
    </div>
  </div>
</div>

</div>

      </body>
      </html>
    `;
};
