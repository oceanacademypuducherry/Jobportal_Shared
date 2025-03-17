const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const {
  pendingJobPostStep1Schema,
} = require("../../scheme/pendingJobPostStep1-schema");
const {
  pendingJobPostStep2Schema,
} = require("../../scheme/pendingJobPostStep2-scheme");

// Define the schema
const schema = new mongoose.Schema(
  {
    organizationId: {
      type: ObjectId,
      required: [true, "Organization ID is required"],
      validate: {
        validator: function (v) {
          return mongoose.Types.ObjectId.isValid(v);
        },
        message: "Invalid Organization ID format",
      },
    },
    recruiterId: {
      type: ObjectId,
      required: [true, "Recruiter ID is required"],
      validate: {
        validator: function (v) {
          return mongoose.Types.ObjectId.isValid(v);
        },
        message: "Invalid Recruiter ID format",
      },
    },
    expiredAt: { type: Date, default: Date.now }, // Add expiredAt field
    ...pendingJobPostStep1Schema.obj,
    ...pendingJobPostStep2Schema.obj,
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

// Create the model
const myDB = mongoose.connection.useDb("OA_Job_Portal_API");

const ExpiredJobPostModel = myDB.model("expired-jobPost", schema);

module.exports = ExpiredJobPostModel;
