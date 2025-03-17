const mongoose = require("mongoose");
const { DATABASE_NAME } = require("../../constants");

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

const myDB = mongoose.connection.useDb(DATABASE_NAME);

// Create the model
const RoleModel = myDB.model("role", schema);

module.exports = RoleModel;
