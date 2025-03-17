const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

// Define the schema
const schema = new mongoose.Schema(
  {
    courseId: { type: ObjectId, required: true },
    label: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const myDB = mongoose.connection.useDb("OA_Job_Portal_API");

// Create the model
const SpecializationModel = myDB.model("specialization", schema);

module.exports = { SpecializationModel };
