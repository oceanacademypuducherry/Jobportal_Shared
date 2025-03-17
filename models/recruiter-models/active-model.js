const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

// Define the schema
const schema = new mongoose.Schema(
  {
    avatar: { type: String, required: true },
    fullName: { type: String, required: true, minlength: 2, maxlength: 50 },
    designation: { type: String, required: true, minlength: 2, maxlength: 50 },
    email: {
      type: String,
      required: true,
      match: /^\S+@\S+\.\S+$/,
      unique: true, // Unique index (no need for manual index)
      lowercase: true, // Ensure case-insensitive uniqueness
      trim: true, // Remove accidental spaces
    },
    countryCode: { type: String, required: true, enum: ["+91"] },
    mobileNumber: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
      unique: true,  // Unique index (no need for manual index)
    },
    password: { type: String, required: true },
    organizationId: {
      type: ObjectId,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

// Indexing for performance
schema.index({ organizationId: 1 });

const myDB = mongoose.connection.useDb("OA_Job_Portal_API");

// Create the model
const ActiveRecruiterModel = myDB.model("active-recruiter", schema);

module.exports = ActiveRecruiterModel;
