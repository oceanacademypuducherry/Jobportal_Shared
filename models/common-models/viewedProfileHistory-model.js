const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

// Define the schema with validation
const schema = new mongoose.Schema(
  {
    candidateId: {
      type: ObjectId,
      required: [true, "Candidate ID is required"],
      validate: {
        validator: mongoose.Types.ObjectId.isValid,
        message: "Invalid Candidate ID",
      },
    },
    recruiterId: {
      type: ObjectId,
      required: [true, "Recruiter ID is required"],
      validate: {
        validator: mongoose.Types.ObjectId.isValid,
        message: "Invalid Recruiter ID",
      },
    },
    organizationId: {
      type: ObjectId,
      required: [true, "Organization ID is required"],
      validate: {
        validator: mongoose.Types.ObjectId.isValid,
        message: "Invalid Organization ID",
      },
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const myDB = mongoose.connection.useDb("OA_Job_Portal_API");

// Create the model
const ViewedProfileHistory = myDB.model("viewed-profile-history", schema);

module.exports = ViewedProfileHistory;
