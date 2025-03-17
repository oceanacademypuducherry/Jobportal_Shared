const mongoose = require("mongoose");
const { DATABASE_NAME } = require("../../constants");

// Define the schema
const schema = new mongoose.Schema({
  jobApproach: { type: String, required: true },
});

const myDB = mongoose.connection.useDb(DATABASE_NAME);

// Create the model
const JobApprochModel = myDB.model("job-approach", schema);

module.exports = JobApprochModel;
