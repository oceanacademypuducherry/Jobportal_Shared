const mongoose = require("mongoose");
const { DATABASE_NAME } = require("../../constants");

const { ObjectId } = mongoose.Types;

// Define the schema
const schema = new mongoose.Schema(
  {
    courseId: { type: ObjectId, required: true },
    label: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const myDB = mongoose.connection.useDb(DATABASE_NAME);

// Create the model
const SpecializationModel = myDB.model("specialization", schema);

module.exports = SpecializationModel;
