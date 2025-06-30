const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const {
  pendingJobPostStep1Schema,
} = require("../../schemes/pendingJobPostStep1-schema");
const {
  pendingJobPostStep2Schema,
} = require("../../schemes/pendingJobPostStep2-scheme");
const { getDatabaseName } = require("../../constants");

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
    isFroozen: {
      type: Boolean,
      default: false
    },
    paymentHistoryId: {
      type: ObjectId,
      required: [true, "Payment History ID is required"],
      ref: "paymentHistory",
      validate: {
        validator: function (v) {
          return mongoose.Types.ObjectId.isValid(v);
        },
        message: "Invalid Payment History ID format",
      },
    },
    ...pendingJobPostStep1Schema.obj,
    ...pendingJobPostStep2Schema.obj,
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

// Create the model
const myDB = mongoose.connection.useDb(getDatabaseName());

const ActiveJobPostModel = myDB.model("active-jobPost", schema);

module.exports = ActiveJobPostModel;
