const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
  city: {
    type: String,
    required: [true, "City is required"],
    minlength: [2, "City must be at least 2 characters long"],
    maxlength: [50, "City cannot exceed 50 characters"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
    minlength: [2, "State must be at least 2 characters long"],
    maxlength: [50, "State cannot exceed 50 characters"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
    minlength: [2, "Country must be at least 2 characters long"],
    maxlength: [50, "Country cannot exceed 50 characters"],
  },
  street: {
    type: String,
    required: [true, "Street is required"],
    minlength: [2, "Street must be at least 2 characters long"],
    maxlength: [100, "Street cannot exceed 100 characters"],
  },
  area: {
    type: String,
    minlength: [2, "Area must be at least 2 characters long"],
    maxlength: [100, "Area cannot exceed 100 characters"],
  },
  pincode: {
    type: Number,
    required: [true, "Pincode is required"],
    minlength: [6, "Pincode must be exactly 6 characters long"],
    maxlength: [6, "Pincode must be exactly 6 characters long"],
    match: [/^\d{6}$/, "Pincode must be exactly 6 digits"],
  },
});

module.exports = { addressSchema };
