const mongoose = require("mongoose");
const { DATABASE_NAME } = require("../../constants");

const { ObjectId } = mongoose.Types;

// Define the schema
const schema = new mongoose.Schema(
  {
    candidateId: { type: ObjectId, required: true },
    jobPostId: { type: ObjectId, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const myDB = mongoose.connection.useDb(DATABASE_NAME);

// Create the model
const CandidateSavedJobModel = myDB.model("candidate-saved-job", schema);

module.exports = CandidateSavedJobModel;
