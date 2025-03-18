const mongoose = require("mongoose");
const { getDatabaseName } = require("../../constants");

// Define the schema
const schema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const myDB = mongoose.connection.useDb(getDatabaseName());

// Create the model
const RoleModel = myDB.model("role", schema);

module.exports = RoleModel;
