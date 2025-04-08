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
const BoardModel = myDB.model("board", schema);

module.exports = BoardModel;
