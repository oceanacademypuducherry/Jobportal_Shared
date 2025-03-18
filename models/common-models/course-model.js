const mongoose = require("mongoose");
const { getDatabaseName } = require("../../constants");

const { ObjectId } = mongoose.Types;

// Define the schema
const schema = new mongoose.Schema(
  {
    educationId: { type: ObjectId, required: true },
    label: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const myDB = mongoose.connection.useDb(getDatabaseName());

// Create the model
const CourseModel = myDB.model("course", schema);

module.exports = CourseModel;
