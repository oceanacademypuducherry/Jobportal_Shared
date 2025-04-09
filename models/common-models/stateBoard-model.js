const mongoose = require("mongoose");
const { getDatabaseName } = require("../../constants");

// Define the schema
const schema = new mongoose.Schema(
  {
    state: { type: String, required: true },
    boards: [
      {
        label: { type: String, required: true },
      },
    ],
  },
  { timestamps: false }
);

const myDB = mongoose.connection.useDb(getDatabaseName());

// Create the model
const StateBoardModel = myDB.model("state-board", schema);

module.exports = StateBoardModel;
