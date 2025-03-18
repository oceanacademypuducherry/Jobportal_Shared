const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const {
  pendingJobPostStep1Schema,
  pendingJobPostStep2Schema,
} = require("../../scheme");
const { getDatabaseName } = require("../../constants");

// Define the schema
const schema = new mongoose.Schema(
  {
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
    step1: {
      type: pendingJobPostStep1Schema,
      default: null,
    },
    step2: {
      type: pendingJobPostStep2Schema,
      default: null,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    validateBeforeSave: true,
  }
);

// Create the model
const myDB = mongoose.connection.useDb(getDatabaseName());

const DraftJobPostModel = myDB.model("draft-jobPost", schema);

module.exports = DraftJobPostModel;
