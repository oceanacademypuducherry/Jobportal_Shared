const mongoose = require("mongoose");
const moment = require("moment");

const admissionSchema = mongoose.Schema({
  _id: { type: String },
  name: { type: String },
  dob: { type: String },
  mobileNumber: { type: String },
  address: { type: String },
  qualification: { type: String },
  nationality: { type: String },
  workingDesignation: { type: String },
  studentCollegeName: { type: String },
  courseName: { type: String },
  courseCode: { type: String },
  email: { type: String },
  whatsappnumber: { type: String },
  gender: { type: String },
  batchname: { type: String },
  trainerName: { type: String },
  doj: { type: String },
  photo: { type: String },
  date: {
    type: String,
    default: moment().utcOffset(330).format("DD-MM-yyy"),
  },
  active: { type: Boolean, default: true },
  archive: { type: Boolean, default: false },
  coursestatus: { type: String, default: "Learning" },
  certificateCollectedStatus: { type: String, default: "No" },
  totalFees: { type: Number },
  studentId: {
    type: String,
    pattern: { type: String },
    parentNumber: { type: String },
    regNo: { type: String },
  },
});

const myDB = mongoose.connection.useDb("OA_SMS");

const AdmissionModel = myDB.model("admission", admissionSchema);

module.exports = AdmissionModel;
