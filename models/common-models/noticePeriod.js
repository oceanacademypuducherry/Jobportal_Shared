const mongoose = require("mongoose");
const { DATABASE_NAME } = require("../../constants");

// Define the schema
const schema = new mongoose.Schema({
  noticePeriod: { type: String, required: true },
});

const myDB = mongoose.connection.useDb(DATABASE_NAME);

// Create the model
const NoticePeriodModel = myDB.model("notice-period", schema);

module.exports = NoticePeriodModel;
