const mongoose = require("mongoose");
const { DATABASE_NAME } = require("../../constants");

// Define the schema
const schema = new mongoose.Schema({
  speakingLanguage: { type: String, required: true },
});

const myDB = mongoose.connection.useDb(DATABASE_NAME);

// Create the model
const SpeakingLanguageModel = myDB.model("speaking-language", schema);

module.exports = SpeakingLanguageModel;
