const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

// Define the schema
const pendingJobPostStep4Schema = new mongoose.Schema(
  {
    planId: {
      type: ObjectId,
      required: [true, "Plan ID is required"],
      validate: {
        validator: function (v) {
          return mongoose.Types.ObjectId.isValid(v);
        },
        message: "Invalid Plan ID format",
      },
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = { pendingJobPostStep4Schema };
