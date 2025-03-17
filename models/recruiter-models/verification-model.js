const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define the schema
const schema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is optional"], // Optional field
      minlength: [2, "Full name must be at least 2 characters long"],
      maxlength: [50, "Full name cannot exceed 50 characters"],
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      minlength: [10, "Mobile number must be exactly 10 digits long"],
      maxlength: [10, "Mobile number must be exactly 10 digits long"],
      match: [/^\d{10}$/, "Mobile number must be exactly 10 digits"],
      unique: true, // Ensure mobileNumber is unique
    },
    countryCode: {
      type: String,
      required: [true, "Country code is required"],
      minlength: [1, "Country code must be at least 1 character long"],
      maxlength: [4, "Country code cannot exceed 4 characters"],
      enum: ["+91"], // Only allow +91
    },
    email: {
      type: String,
      required: [true, "Email is optional"],
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is optional"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Do not include password in queries by default
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      required: [false, "Organization ID is optional"],
      ref: "organization-verification",
      default: null,
    },
    avatar: { type: String, required: true },
    designation: {
      type: String,
      required: [true, "Designation is optional"], // Optional field
      minlength: [2, "Designation must be at least 2 characters long"],
      maxlength: [50, "Designation cannot exceed 50 characters"],
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);


// Create the model
const myDB = mongoose.connection.useDb("OA_Job_Portal_API");
const VerificationRecruiterModel = myDB.model("verification-recruiter", schema);

module.exports = VerificationRecruiterModel;
