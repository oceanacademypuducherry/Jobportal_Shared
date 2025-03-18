const mongoose = require("mongoose");
const { getDatabaseName } = require("../../constants");

const { ObjectId } = mongoose.Types;

const schema = new mongoose.Schema({
  token: { type: String, required: true },
  recruiterId: { type: ObjectId, required: true },
});

const myDB = mongoose.connection.useDb(getDatabaseName());

const RecruiterTokenModel = myDB.model("recruiter-token", schema);

module.exports = { RecruiterTokenModel };
