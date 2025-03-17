const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    candidateId: { type: mongoose.Schema.Types.ObjectId, required: true },
    sessionId: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const myDB = mongoose.connection.useDb("OA_Job_Portal_API");

schema.index({ candidateId: 1, sessionId: 1 });

const CandidateToken = myDB.model("candidate-token", schema);

module.exports = { CandidateToken };
