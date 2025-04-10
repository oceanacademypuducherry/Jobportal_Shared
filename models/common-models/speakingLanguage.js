const mongoose = require("mongoose");
const { getDatabaseName } = require("../../constants");

// Define the schema
const schema = new mongoose.Schema({
  speakingLanguage: { type: String, required: true },
});

const myDB = mongoose.connection.useDb(getDatabaseName());

// Create the model
const SpeakingLanguageModel = myDB.model("speaking-language", schema);

module.exports = SpeakingLanguageModel;
