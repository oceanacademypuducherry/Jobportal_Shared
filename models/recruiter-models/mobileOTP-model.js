const mongoose = require("mongoose");
const {
  Schema,
  Types: { ObjectId },
} = mongoose;

// Define the schema
const schema = new Schema(
  {
    recruiterId: {
      type: ObjectId,
      required: [true, "Recruiter ID is required"],
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Example validation for a 10-digit number
        },
        message: "Invalid mobile number format.",
      },
    },
    countryCode: {
      type: String,
      required: [true, "Country code is required"],
      validate: {
        validator: function (v) {
          return /^\+\d{1,4}$/.test(v); // Example validation for country code (e.g., +1, +44)
        },
        message: "Invalid country code format.",
      },
    },
    OTP: {
      type: String, // Encrypted OTP
      required: [true, "OTP is required"],
      maxlength: [6, "OTP must be 6 digits"], // Adjust based on encryption
    },
    attempts: [
      {
        date: {
          type: Date,
          required: [true, "Attempt date is required"],
        },
        successful: {
          type: Boolean,
          default: false,
        },
      },
    ],
    expiry: {
      type: Date,
      required: [true, "Expiry date is required"],
      validate: {
        validator: function (v) {
          return v > new Date(); // Ensure expiry is in the future
        },
        message: "Expiry must be a future date.",
      },
    },
    deleteAt: {
      type: Date,
      required: [true, "DeleteAt date is required"],
      validate: {
        validator: function (v) {
          return v > new Date(); // Ensure deleteAt is in the future
        },
        message: "DeleteAt must be a future date.",
      },
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

// Create the model
const myDB = mongoose.connection.useDb("OA_Job_Portal_API");
const RecruiterMobileOTPModel = myDB.model("recruiter-mobile-otp", schema);

// Ensure deleteAt index is created (for document expiry)
schema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 });

// Consider adding indexes for frequently queried fields
schema.index({ recruiterId: 1 });
schema.index({ mobileNumber: 1 });
schema.index({ countryCode: 1 });

module.exports = { RecruiterMobileOTPModel };
