const mongoose = require("mongoose");

// Define the schema
const schema = new mongoose.Schema({
  noticePeriod: { type: String, required: true },
});

const myDB = mongoose.connection.useDb("OA_Job_Portal_API");

// Create the model
const NoticePeriodModel = myDB.model("notice-period", schema);

module.exports = { NoticePeriodModel };
