const mongoose = require("mongoose");
const { getDatabaseName } = require("../../constants");
const {
  Schema,
  Types: { ObjectId },
} = mongoose;

// Define the schema
const schema = new Schema(
  {
    candidateId: {
      type: ObjectId,
      required: [true, "Candidate ID is required"],
    },
    OTP: {
      type: String,
      required: [true, "OTP is required"],
      maxlength: [6, "OTP must be 6 digits"],
    },
    requests: [
      {
        mobileNumber: {
          type: String,
          required: [true, "Mobile number is required"],
          match: [/^\d{10}$/, "Mobile number must be exactly 10 digits"],
        },
        countryCode: {
          type: String,
          required: [true, "Country code is required"],
          enum: ["+91"], // Consider expanding this if needed
        },
        createdAt: {
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

// Ensure TTL index is created
// Ensure deleteAt index is created (for document expiry)
schema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 });

// Consider adding indexes for frequently queried fields
schema.index({ candidateId: 1 });
schema.index({ mobileNumber: 1 });
schema.index({ countryCode: 1 });

const CandidateMobileOTPModel = mongoose.connection
  .useDb(getDatabaseName())
  .model("candidate-mobile-otp", schema);

module.exports = CandidateMobileOTPModel;
