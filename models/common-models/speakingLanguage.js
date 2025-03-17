const mongoose = require("mongoose");

// Define the schema
const schema = new mongoose.Schema({
  speakingLanguage: { type: String, required: true },
});

const myDB = mongoose.connection.useDb("OA_Job_Portal_API");

// Create the model
const SpeakingLanguageModel = myDB.model("speaking-language", schema);

module.exports = SpeakingLanguageModel;
