const mongoose = require("mongoose");

// Define the schema
const schema = new mongoose.Schema({
  jobApproach: { type: String, required: true },
});

const myDB = mongoose.connection.useDb("OA_Job_Portal_API");

// Create the model
const JobApprochModel = myDB.model("job-approach", schema);

module.exports = JobApprochModel;
