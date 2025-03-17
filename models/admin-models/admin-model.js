const mongoose = require("mongoose");
const { hashPassword } = require("../../utils");
const { DATABASE_NAME } = require("../../constants");

// Define the schema with validation and best practices
const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    otp: {
      type: String,
      required: true,
      // minlength: 6, // Ensure a minimum OTP length
      // maxlength: 6, // Ensure a maximum OTP length
    },
    sentAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Pre-save hook to hash the OTP before saving
schema.pre("save", async function (next) {
  if (!this.isModified("otp")) {
    return next();
  }

  try {
    this.otp = await hashPassword(this.otp); // Hash the OTP
    next();
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

// Using a separate database instance
const myDB = mongoose.connection.useDb(DATABASE_NAME);

// Model definition
const AdminModel = myDB.model("Admin", schema);

module.exports = AdminModel;
