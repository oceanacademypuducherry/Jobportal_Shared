const mongoose = require("mongoose");
const { getDatabaseName } = require("../../constants");
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
    email: { type: String, required: true },
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
const myDB = mongoose.connection.useDb(getDatabaseName());
const RecruiterEmailOTPModel = myDB.model("recruiter-email-otp", schema);

// Ensure deleteAt index is created (for document expiry)
schema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 });

// Consider adding indexes for frequently queried fields
schema.index({ recruiterId: 1 });

module.exports =  RecruiterEmailOTPModel ;
