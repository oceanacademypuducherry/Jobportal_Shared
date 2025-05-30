const mongoose = require("mongoose");
const {
  pendingJobPostStep1Schema,
  pendingJobPostStep2Schema,
  pendingJobPostStep3Schema,
  pendingJobPostStep4Schema,
} = require("../../schemes");
const { validateReason } = require("../../utils");
const { getDatabaseName } = require("../../constants");
const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema(
  {
    recruiterId: {
      type: ObjectId,
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
    step4: pendingJobPostStep4Schema, // This will not be required
    reason: {
      type: String,
      required: [true, "Reason is required"],
      validate: [validateReason, "Reason must be at least 5 characters long"],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

// Create the model
const myDB = mongoose.connection.useDb(getDatabaseName());

const RejectedJobPostModel = myDB.model("rejected-jobPost", schema);

module.exports = RejectedJobPostModel;
