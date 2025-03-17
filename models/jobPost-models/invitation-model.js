const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

// Define the schema
const schema = new mongoose.Schema(
  {
    candidateId: {
      type: ObjectId,
      required: [true, "Candidate ID is required."],
      validate: {
        validator: ObjectId.isValid,
        message: "Invalid Candidate ID format.",
      },
    },
    recruiterId: {
      type: ObjectId,
      required: [true, "Recruiter ID is required."],
      validate: {
        validator: ObjectId.isValid,
        message: "Invalid Recruiter ID format.",
      },
    },
    organizationId: {
      type: ObjectId,
      required: [true, "Organization ID is required."],
      validate: {
        validator: ObjectId.isValid,
        message: "Invalid Organization ID format.",
      },
    },
    jobPostId: {
      type: ObjectId,
      required: [true, "Job Post ID is required."],
      validate: {
        validator: ObjectId.isValid,
        message: "Invalid Job Post ID format.",
      },
    },
    isApplied: {
      type: Boolean,
      default: false, // Default to false if not specified
    },
    appliedAt: {
      type: Date,
      default: null, // Default to null if not specified
      validate: {
        // Validate that appliedAt is not set in the future
        validator: function (value) {
          return !value || value <= new Date();
        },
        message: "Applied date cannot be in the future.",
      },
      // Ensure appliedAt is required when isApplied is true
      required: function () {
        return this.isApplied;
      },
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    versionKey: false, // Disable the version key (__v) for this schema
  }
);

const myDB = mongoose.connection.useDb("OA_Job_Portal_API");

// Create the model
const JobInvitationModel = myDB.model("job-invitation", schema);

module.exports = JobInvitationModel;
