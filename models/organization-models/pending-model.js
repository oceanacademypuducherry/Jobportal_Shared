const mongoose = require("mongoose");
const { addressSchema } = require("../../scheme");
const { DATABASE_NAME } = require("../../constants");

const { ObjectId } = mongoose.Schema.Types;

// Define the schema
const schema = new mongoose.Schema(
  {
    recruiterId: { type: ObjectId, required: true },
    organizationLogo: { type: String, required: true },
    organizationName: { type: String, required: true }, // For display purposes
    normalizedOrganizationName: { type: String }, // For database queries and comparisons
    about: { type: String, required: true },
    websiteLink: {
      type: String,
      required: true,
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
    teamSize: { type: String, required: true },
    foundedYear: { type: Number, required: true },
    address: { type: addressSchema, required: true },
    gstNumber: {
      type: String,
      required: [true, "GST number is required"],
      match: [
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[A-Z0-9]{1}$/,
        "Invalid GST number format",
      ],
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const myDB = mongoose.connection.useDb(DATABASE_NAME);

// Create the model
const OrganizationVerificationModel = myDB.model(
  "pending-organization",
  schema
);

module.exports = { OrganizationVerificationModel };
