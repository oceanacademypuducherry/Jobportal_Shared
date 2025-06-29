const mongoose = require("mongoose");
const { getDatabaseName } = require("../../constants");
const { isIntegerValidator } = require("../../utils");

const { ObjectId } = mongoose.Types;

// Define the schema
const paymentHistorySchema = new mongoose.Schema(
  {
    billNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensure bill numbers are unique
      match: /^OAJP\d+$/, // Regular expression to match "OAJP" followed by digits
      minlength: 5,
      maxlength: 20, // Adjust this as per your requirements
    },
    jobPostId: {
      type: ObjectId,
      required: true,
    },
    recruiterId: {
      type: ObjectId,
      required: true,
    },
    organizationId: {
      type: ObjectId,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0, // Ensure amount is non-negative
    },
    planName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100, // Limit the length of plan name
    },
    maxApplicant: {
      type: Number,
      required: true,
      min: 0, // Ensure non-negative value
    },
    userAccessCount: {
      type: Number,
      required: true,
      min: 0, // Ensure non-negative value
    },
    candidateLastActiveMonth: {
      type: Number,
      required: true,
      min: 0, // Ensure non-negative value
    },
    maxResult: {
      type: Number,
      required: true,
      min: 0, // Ensure non-negative value
    },
    maxProfileView: {
      type: Number,
      required: true,
      min: 0, // Ensure non-negative value
    },
    isDownloadResume: {
      type: Boolean,
      default: false,
    },
    isFilter: {
      type: Boolean,
      default: false,
    },
    isTag: {
      type: Boolean,
      default: false,
    },
    minValidityDay: {
      type: Number,
      required: true,
      min: 1, // Minimum validity should be at least 1 day
    },
    maxValidityDay: {
      type: Number,
      required: true,
      min: 1, // Minimum validity should be at least 1 day
    },
    isFree: {
      type: Boolean,
      required: [true, "isFree field is required"],
      default: false, // Assuming plans are paid by default
    },
    isJobOffer: {
      type: Boolean,
      required: [true, "Job offer status is required"],
    },
    isPaymentVerified: {
      type: Boolean,
      required: [true, "isVerified is required"]
    },
    paymentId: {
      type: String,
      default: null,
    },
    orderId: {
      type: String,
      default: null,
    },
    jobId: {
      type: String,
      required: [true, "Job ID is required"],
    },
    jobOfferDiscountPercentage: {
      type: Number,
      required: function () {
        return this.isJobOffer === true; // Only required if isJobOffer is true
      },
      min: [1, "Discount percentage must be greater than 1%"],
      max: [99, "Discount percentage must be less than or equal to 99%"],
      validate: {
        validator: function (value) {
          // Allow null when isJobOffer is false
          return this.isJobOffer === true ? value !== null : true;
        },
        message: "Discount percentage is required when isJobOffer is true",
      },
    },
    gstPercentage: {
      type: Number,
      required: [true, "GST percentage is required"],
      min: [0, "GST percentage must be a positive number"],
      max: [100, "GST percentage cannot exceed 100%"],
      validate: isIntegerValidator,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0, // Ensure total amount is non-negative
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Indexing frequently queried fields for performance
paymentHistorySchema.index({ recruiterId: 1 });
paymentHistorySchema.index({ organizationId: 1 });

// Connect to the specific database
const myDB = mongoose.connection.useDb(getDatabaseName());

// Create the model
const PaymentHistoryModel = myDB.model("payment-history", paymentHistorySchema);

module.exports = PaymentHistoryModel;
