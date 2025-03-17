const mongoose = require("mongoose");
const { DATABASE_NAME } = require("../../constants");

const { ObjectId } = mongoose.Types;

const schema = new mongoose.Schema({
  token: { type: String, required: true },
  recruiterId: { type: ObjectId, required: true },
});

const myDB = mongoose.connection.useDb(DATABASE_NAME);

const RecruiterTokenModel = myDB.model("recruiter-token", schema);

module.exports = { RecruiterTokenModel };
