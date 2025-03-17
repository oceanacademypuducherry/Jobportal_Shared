const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

// Define the schema
const schema = new mongoose.Schema(
  {
    candidateId: { type: ObjectId, required: true },
    jobPostId: { type: ObjectId, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const myDB = mongoose.connection.useDb("OA_Job_Portal_API");

// Create the model
const JobOfferModel = myDB.model("job-offer", schema);

module.exports = JobOfferModel;
