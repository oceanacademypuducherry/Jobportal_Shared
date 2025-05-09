const mongoose = require("mongoose");
const { getDatabaseName } = require("../../constants");

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequenceValue: { type: Number, default: 0 },
});

// Create the model
const myDB = mongoose.connection.useDb(getDatabaseName());
const CounterModel = myDB.model("counter", counterSchema);

module.exports =  CounterModel;
