const mongoose = require("mongoose");
const { getDatabaseName } = require("../../constants");

const { ObjectId } = mongoose.Types;

// Define the schema
const schema = new mongoose.Schema(
  {
    candidateId: { type: ObjectId, required: true },
    jobPostId: { type: ObjectId, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const myDB = mongoose.connection.useDb(getDatabaseName());

// Create the model
const CandidateSavedJobModel = myDB.model("candidate-saved-job", schema);

module.exports = CandidateSavedJobModel;
