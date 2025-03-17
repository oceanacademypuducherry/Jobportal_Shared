const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

const schema = new mongoose.Schema({
  token: { type: String, required: true },
  recruiterId: { type: ObjectId, required: true },
});

const myDB = mongoose.connection.useDb("OA_Job_Portal_API");

const RecruiterTokenModel = myDB.model("recruiter-token", schema);

module.exports = { RecruiterTokenModel };
