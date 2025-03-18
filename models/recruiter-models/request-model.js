const mongoose = require("mongoose");
const { getDatabaseName } = require("../../constants");

// Define the schema
const schema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true,
      match: [/^\d{10}$/, "Mobile number must be exactly 10 digits"],
    },
    countryCode: {
      type: String,
      required: [true, "Country code is required"],
      enum: ["+91"], // Consider expanding this if needed
    },
    OTP: {
      type: String,
      required: [true, "OTP is required"],
      // minlength: [24, "Encrypted OTP must be at least 24 characters long"],
      maxlength: [6, "OTP must be at most 6 characters long"],
    },
    requests: [
      {
        date: {
          type: Date,
          required: [true, "Request date is required"],
          default: Date.now,
        },
        attempts: {
          type: Number,
          default: 0, // Initialize attempts with 0
          min: [0, "Attempts cannot be negative"],
        },
        successful: {
          type: Boolean,
          default: false,
        },
      },
    ],
    expiryDate: {
      type: Date,
      required: [true, "Expiry date is required"],
      validate: {
        validator: function (v) {
          return v > Date.now();
        },
        message: "Expiry date must be in the future.",
      },
    },
    deleteAt: {
      type: Date,
      required: [true, "Deletion time is required"],
      validate: {
        validator: function (v) {
          return v > Date.now();
        },
        message: "Deletion time must be in the future.",
      },
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

// Add indexes
schema.index({ mobileNumber: 1, countryCode: 1 }); // Compound index on mobileNumber and countryCode
schema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 }); // TTL index for automatic deletion

const myDB = mongoose.connection.useDb(getDatabaseName());

// Create the model
const RequestRecruiterModel = myDB.model("request-recruiter", schema);

module.exports = RequestRecruiterModel;
