const mongoose = require("mongoose");
const { DATABASE_NAME } = require("../../constants");
const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const schema = new Schema(
  {
    candidateId: { type: ObjectId, required: true },
    contactInfo: {
      type: String,
      required: [
        true,
        "Contact information (email or mobile number) is required",
      ],
      validate: {
        validator: function (v) {
          const emailRegex = /^\S+@\S+\.\S+$/;
          const mobileRegex = /^\d{10}$/;
          return emailRegex.test(v) || mobileRegex.test(v);
        },
        message:
          "Invalid contact information. Must be a valid email address or a 10-digit mobile number.",
      },
    },
    type: {
      type: String,
      enum: ["email", "mobile"],
      required: [true, "OTP type (email or mobile) is required"],
    },
    purpose: {
      type: String,
      enum: ["creation", "change"],
      required: [true, "Purpose (creation or change) is required"],
    },
    OTP: {
      type: Number,
      required: [true, "OTP is required"],
      minlength: [4, "OTP must be at least 4 digits long"],
      maxlength: [6, "OTP must be at most 6 digits long"],
      match: [/^\d{4,6}$/, "OTP must be 4 to 6 digits long"],
    },
    expiryDate: {
      type: Date,
      required: [true, "Expiry date is required"],
    },
    attempts: {
      type: Number,
      default: 0,
      required: [true, "Attempts count is required"],
      min: [0, "Attempts count cannot be negative"],
    },
    deleteAt: {
      type: Date,
      required: [true, "Deletion time is required"], // TTL field for automatic deletion
      validate: {
        validator: function (v) {
          return v > this.expiryDate;
        },
        message: "Deletion time must be after the expiry date.",
      },
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

// Ensure TTL index is created
schema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 });

const CandidateOTPModel = mongoose.connection
  .useDb(DATABASE_NAME)
  .model("recruiter-otp", schema);

module.exports = CandidateOTPModel;
