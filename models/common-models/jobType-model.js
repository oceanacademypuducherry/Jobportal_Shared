const mongoose = require("mongoose");
const { getDatabaseName } = require("../../constants");

// Define the schema
const schema = new mongoose.Schema({
  jobType: { type: String, required: true },
});

// Modify the toJSON method to exclude __v
schema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

const myDB = mongoose.connection.useDb(getDatabaseName());

// Create the model
const JobTypeModel = myDB.model("jobType", schema);

module.exports = JobTypeModel;
