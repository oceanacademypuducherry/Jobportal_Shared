const mongoose = require("mongoose");
const { DATABASE_NAME } = require("../../constants");

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

const myDB = mongoose.connection.useDb(DATABASE_NAME);

// Create the model
const JobTypeModel = myDB.model("jobType", schema);

module.exports = JobTypeModel;
