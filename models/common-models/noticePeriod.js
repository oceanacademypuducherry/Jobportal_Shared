const mongoose = require("mongoose");
const { getDatabaseName } = require("../../constants");

// Define the schema
const schema = new mongoose.Schema({
  noticePeriod: { type: String, required: true },
});

const myDB = mongoose.connection.useDb(getDatabaseName());

// Create the model
const NoticePeriodModel = myDB.model("notice-period", schema);

module.exports = NoticePeriodModel;
