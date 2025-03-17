const mongoose = require("mongoose");
const { addressSchema } = require("../../scheme");
const { DATABASE_NAME } = require("../../constants");

const { ObjectId } = mongoose.Schema.Types;

// Define the schema
const schema = new mongoose.Schema(
  {
    recruiterId: {
      type: ObjectId,
      required: [true, "Recruiter ID is required"],
      ref: "RecruiterModel",
    },
    organizationLogo: {
      type: String,
      required: [true, "Organization logo is required"],
      // match: [
      //   /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg))$/i,
      //   "Organization logo must be a valid URL and of type png, jpg, jpeg, or svg",
      // ],
    },
    organizationName: {
      type: String,
      required: [true, "Organization name is required"],
      trim: true,
      minlength: [2, "Organization name must be at least 2 characters long"],
      maxlength: [100, "Organization name cannot exceed 100 characters"],
    },
    normalizedOrganizationName: {
      type: String,
      trim: true,
      minlength: [
        2,
        "Normalized organization name must be at least 2 characters long",
      ],
      maxlength: [
        100,
        "Normalized organization name cannot exceed 100 characters",
      ],
      lowercase: true, // Ensuring normalization for consistent database querying
    },
    about: {
      type: String,
      required: [true, "About section is required"],
      trim: true,
      minlength: [10, "About section must be at least 10 characters long"],
      maxlength: [1000, "About section cannot exceed 1000 characters"],
    },
    websiteLink: {
      type: String,
      required: [true, "Website link is required"],
      // match: [
      //   /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+)(\.[a-z]{2,})+(\/[^\s]*)?$/,
      //   "Website link must be a valid URL",
      // ],
      trim: true,
    },
    gallery: {
      type: [String],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length >= 3 && v.length <= 6;
        },
        message:
          "Gallery should have at least 3 images and a maximum of 6 images.",
      },
    },
    teamSize: {
      type: String,
      required: [true, "Team size is required"],
      // enum: {
      //   values: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1001+"],
      //   message: "Team size must be one of the predefined values",
      // },
    },
    foundedYear: {
      type: Number,
      required: [true, "Founded year is required"],
      min: [1800, "Founded year cannot be before 1800"],
      max: [new Date().getFullYear(), "Founded year cannot be in the future"],
    },
    address: {
      type: addressSchema,
      required: [true, "Address is required"],
    },
    gstNumber: {
      type: String,
      required: [true, "GST number is required"],
      match: [
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[A-Z0-9]{1}$/,
        "Invalid GST number format",
      ],
      unique: true, // Ensures that the GST number is unique in the collection
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

// Indexing for better performance
schema.index({ recruiterId: 1 });
schema.index({ normalizedOrganizationName: 1 });

const myDB = mongoose.connection.useDb(DATABASE_NAME);

// Create the model
const ActiveOrganizationModel = myDB.model("active-organization", schema);

module.exports = ActiveOrganizationModel;
