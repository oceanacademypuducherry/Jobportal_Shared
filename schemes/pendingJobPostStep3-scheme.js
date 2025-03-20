const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

// Define the schema
const pendingJobPostStep3Schema = new mongoose.Schema(
  {
    organizationId: {
      type: ObjectId,
      // ref : "verification-organization",
      required: [true, "Organization ID is required"],
      validate: {
        validator: mongoose.Types.ObjectId.isValid,
        message: "Invalid organization ID",
      },
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = { pendingJobPostStep3Schema };
