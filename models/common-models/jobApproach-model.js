const mongoose = require("mongoose");
const { getDatabaseName } = require("../../constants");

// Define the schema
const schema = new mongoose.Schema({
  jobApproach: { type: String, required: true },
});

const myDB = mongoose.connection.useDb(getDatabaseName());

// Create the model
const JobApprochModel = myDB.model("job-approach", schema);

module.exports = JobApprochModel;
