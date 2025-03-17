const mongoose = require("mongoose");
const { DATABASE_NAME } = require("../../constants");
const {
  Schema,
  Types: { ObjectId },
} = mongoose;

// Define the schema
const schema = new mongoose.Schema(
  {
    recruiterId: {
      type: ObjectId,
      required: [true, "Recruiter ID is required"],
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true,
      minlength: [10, "Mobile number must be exactly 10 digits long"],
      maxlength: [10, "Mobile number must be exactly 10 digits long"],
      match: [/^\d{10}$/, "Mobile number must be exactly 10 digits"],
    },
    countryCode: {
      type: String,
      required: [true, "Country code is required"],
      enum: ["+91"],
    },
    deleteAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const myDB = mongoose.connection.useDb(DATABASE_NAME);

// Create the model
const PendingRecruiterModel = myDB.model("pending-recruiter", schema);

// Ensure TTL index is created
schema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 });

module.exports = PendingRecruiterModel;
