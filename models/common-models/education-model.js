const mongoose = require("mongoose");
const { getDatabaseName } = require("../../constants");

// Define the schema
const schema = new mongoose.Schema(
  {
    label: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const myDB = mongoose.connection.useDb(getDatabaseName());

// Create the model
const EducationModel = myDB.model("education", schema);

module.exports = EducationModel;
