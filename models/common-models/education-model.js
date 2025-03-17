const mongoose = require("mongoose");

// Define the schema
const schema = new mongoose.Schema(
  {
    label: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const myDB = mongoose.connection.useDb("OA_Job_Portal_API");

// Create the model
const EducationModel = myDB.model("education", schema);

module.exports = { EducationModel };
