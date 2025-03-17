const mongoose = require("mongoose");

// Define the schema
const schema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    expireAt: {
      type: Date,
      default: () => new Date(+new Date() + 60 * 60 * 1000), // Set to expire after one hour
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Create the TTL index
schema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const myDB = mongoose.connection.useDb("OA_Job_Portal_API");

// Create the model
const CandidateRequestModel = myDB.model("candidate-request", schema);

module.exports = { CandidateRequestModel };
