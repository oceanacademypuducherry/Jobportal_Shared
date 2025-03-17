const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

// Define the schema
const schema = new mongoose.Schema(
  {
    candidateId: {
      type: ObjectId,
      required: [true, "Candidate ID is required"],
      validate: {
        validator: (value) => mongoose.isValidObjectId(value),
        message: "Invalid Candidate ID",
      },
    },
    recruiterId: {
      type: ObjectId,
      required: [true, "Recruiter ID is required"],
      validate: {
        validator: (value) => mongoose.isValidObjectId(value),
        message: "Invalid Recruiter ID",
      },
    },
    organizationId: {
      type: ObjectId,
      required: [true, "Organization ID is required"],
      validate: {
        validator: (value) => mongoose.isValidObjectId(value),
        message: "Invalid Organization ID",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

// Define the TTL index for the createdAt field
schema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 }); // 30 days in seconds

const myDB = mongoose.connection.useDb("OA_Job_Portal_API");

// Create the model
const DownloadedResumeHistoryModel = myDB.model(
  "downloaded-resume-history",
  schema
);

module.exports = DownloadedResumeHistoryModel;
