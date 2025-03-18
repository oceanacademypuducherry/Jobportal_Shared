const mongoose = require("mongoose");
const { getDatabaseName } = require("../../constants");

const { ObjectId } = mongoose.Types;

// Define the schema
const schema = new mongoose.Schema(
  {
    courseId: { type: ObjectId, required: true },
    label: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const myDB = mongoose.connection.useDb(getDatabaseName());

// Create the model
const SpecializationModel = myDB.model("specialization", schema);

module.exports = SpecializationModel;
