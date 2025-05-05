const mongoose = require("mongoose");
const {
  pendingJobPostStep1Schema,
} = require("../../schemes/pendingJobPostStep1-schema");
const {
  pendingJobPostStep2Schema,
} = require("../../schemes/pendingJobPostStep2-scheme");
const {
  pendingJobPostStep3Schema,
} = require("../../schemes/pendingJobPostStep3-scheme");
const {
  pendingJobPostStep4Schema,
} = require("../../schemes/pendingJobPostStep4-scheme");
const { validateReason } = require("../../utils");
const { getDatabaseName } = require("../../constants");
const { ObjectId } = mongoose.Schema.Types;

// Define the schema
const schema = new mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Recruiter ID is required"],
      validate: {
        validator: mongoose.Types.ObjectId.isValid,
        message: "Invalid recruiter ID",
      },
    },
    step1: {
      type: pendingJobPostStep1Schema,
      required: [true, "Step 1 data is required"],
    },
    step2: {
      type: pendingJobPostStep2Schema,
      required: [true, "Step 2 data is required"],
    },
    step3: {
      type: pendingJobPostStep3Schema,
      required: [true, "Step 3 data is required"],
    },
    paymentHistoryId: {
      type: ObjectId,
      required: [true, "paymentHistoryId is required"],
    },
    reason: {
      type: String,
      required: [true, "Reason is required"],
      validate: [validateReason, "Reason must be at least 5 characters long"],
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

// Create the model
const myDB = mongoose.connection.useDb(getDatabaseName());

const OnHoldJobPostModel = myDB.model("onHold-jobPost", schema);

module.exports = OnHoldJobPostModel;
