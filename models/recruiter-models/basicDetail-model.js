const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isMobilePhone } = require("validator");
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
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Full name must be at least 3 characters long"],
      maxlength: [50, "Full name must be at most 50 characters long"],
    },
    designation: {
      type: String,
      required: [true, "Designation is optional"], // Optional field
      minlength: [2, "Designation must be at least 2 characters long"],
      maxlength: [50, "Designation cannot exceed 50 characters"],
    },
    // mobileNumber: {
    //   type: String,
    //   required: [true, "Mobile number is required"],
    //   minlength: [10, "Mobile number must be exactly 10 digits long"],
    //   maxlength: [10, "Mobile number must be exactly 10 digits long"],
    //   match: [/^\d{10}$/, "Mobile number must be exactly 10 digits"],
    //   unique: true, // Ensure mobileNumber is unique
    // },
    // countryCode: {
    //   type: String,
    //   required: [true, "Country code is required"],
    //   minlength: [1, "Country code must be at least 1 character long"],
    //   maxlength: [4, "Country code cannot exceed 4 characters"],
    //   enum: ["+91"], // Only allow +91
    // },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
      maxlength: 100,
    },
    OTP: {
      type: String,
      required: [true, "OTP is required"],
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
          default: 0,
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

// Define indexes for TTL and other fields
schema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 });
schema.index({ recruiterId: 1 });

// Create the model
const myDB = mongoose.connection.useDb("OA_Job_Portal_API");
const RecruiterBasicDetailModel = myDB.model("recruiter-basic-detail", schema);

module.exports = { RecruiterBasicDetailModel };
