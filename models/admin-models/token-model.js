const mongoose = require("mongoose");
const { DATABASE_NAME } = require("../../constants");

const schema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", // Reference to the Admin model
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const myDB = mongoose.connection.useDb(DATABASE_NAME);

const AdminTokenModel = myDB.model("admin-token", schema);

module.exports = AdminTokenModel;
