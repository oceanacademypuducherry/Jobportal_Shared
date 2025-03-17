const mongoose = require("mongoose");
const { DATABASE_NAME } = require("../../constants");

const { ObjectId } = mongoose.Types;

// Define the schema with status as an array of objects
const schema = new mongoose.Schema(
  {
    candidateId: {
      type: ObjectId,
      required: true,
      validate: {
        validator: mongoose.Types.ObjectId.isValid,
        message: "Invalid candidate ID format.",
      },
    },
    jobPostId: {
      type: ObjectId,
      required: true,
      validate: {
        validator: mongoose.Types.ObjectId.isValid,
        message: "Invalid job post ID format.",
      },
    },
    status: {
      type: [
        {
          process: {
            type: String,
            required: true,
            enum: ["sent", "viewed", "shortlisted"],
          },
          createdAt: {
            type: Date,
            required: true,
            default: Date.now,
          },
        },
      ],
      default: [{ process: "sent", createdAt: Date.now() }],
      validate: {
        validator: function (value) {
          return value.length <= 3;
        },
        message: "Status array can contain a maximum of 3 objects.",
      },
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const myDB = mongoose.connection.useDb(DATABASE_NAME);

// Create the model
const JobApplicationModel = myDB.model("job-application", schema);

module.exports = JobApplicationModel;
