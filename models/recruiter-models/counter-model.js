const mongoose = require("mongoose");
const { DATABASE_NAME } = require("../../constants");

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequenceValue: { type: Number, default: 0 },
});

// Create the model
const myDB = mongoose.connection.useDb(DATABASE_NAME);
const CounterModel = myDB.model("counter", counterSchema);

module.exports = { CounterModel };
