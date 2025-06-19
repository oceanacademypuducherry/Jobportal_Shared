const mongoose = require("mongoose");
const { isIntegerValidator } = require("../../utils");
const { getDatabaseName } = require("../../constants");

const planSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: [true, "Plan name is required"],
    minlength: [3, "Plan name must be at least 3 characters long"],
    maxlength: [100, "Plan name cannot exceed 100 characters"],
    trim: true,
  },
  maxApplicant: {
    type: Number,
    required: [true, "Number of applicants is required"],
    min: [0, "Applicants count must be a positive number"],
    validate: isIntegerValidator,
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0, "Amount must be a positive number"],
    validate: isIntegerValidator,
  },
  isFree: {
    type: Boolean,
    required: [true, "isFree field is required"],
    default: false, // Assuming plans are paid by default
  },
  userAccessCount: {
    type: Number,
    required: [true, "User access count is required"],
    min: [1, "User access count must be at least 1"],
    validate: isIntegerValidator,
  },
  candidateLastActiveMonth: {
    type: Number,
    required: [true, "Candidate last active month is required"],
    min: [1, "Candidate last active month must be between 1 and 12"],
    max: [12, "Candidate last active month must be between 1 and 12"],
  },
  maxResult: {
    type: Number,
    required: [true, "Search result count is required"],
    min: [0, "Search result count must be a positive number"],
    validate: isIntegerValidator,
  },
  maxProfileView: {
    type: Number,
    required: [true, "Maximum profile view count is required"],
    min: [0, "Maximum profile view count must be a positive number"],
    validate: isIntegerValidator,
  },
  isBooleanKeywordSearch: {
    type: Boolean,
    required: [true, "Boolean keyword search availability is required"],
  },
  isDownloadResume: {
    type: Boolean,
    required: [true, "Resume download availability is required"],
  },
  isFilter: {
    type: Boolean,
    required: [true, "Filter feature availability is required"],
  },
  isTag: {
    type: Boolean,
    required: [true, "Tag feature availability is required"],
  },
  minValidityDay: {
    type: Number,
    required: [true, "Minimum validity day is required"],
    min: [1, "Minimum validity day must be a positive number"],
    validate: [
      isIntegerValidator,
      {
        validator: function (value) {
          return !this.maxValidityDay || value < this.maxValidityDay;
        },
        message: "Minimum validity day must be less than maximum validity day",
      },
    ],
  },
  maxValidityDay: {
    type: Number,
    required: [true, "Maximum validity day is required"],
    min: [1, "Maximum validity day must be a positive number"],
    validate: [
      isIntegerValidator,
      {
        validator: function (value) {
          return !this.minValidityDay || value > this.minValidityDay;
        },
        message:
          "Maximum validity day must be greater than minimum validity day",
      },
    ],
  },
  isJobOffer: {
    type: Boolean,
    required: [true, "Job offer status is required"],
    validate: {
      validator: function () {
        return this.isFree === false || this.isJobOffer === false;
      },
      message: "isJobOffer can only be true if isFree is false",
    },
  },
  jobOfferDetails: {
    jobOfferValidity: {
      type: Date,
      required: function () {
        return this.isJobOffer;
      },
      validate: {
        validator: function (value) {
          return !this.isJobOffer || value > new Date();
        },
        message: "Job offer validity date must be in the future",
      },
    },
    jobOfferDiscountPercentage: {
      type: Number,
      required: function () {
        return this.isJobOffer;
      },
      min: [1, "Discount percentage must be greater than 1%"],
      max: [99, "Discount percentage must be less than or equal to 99%"],
      validate: isIntegerValidator,
    },
  },
  submitLabel: {
    type: String,
    required: [true, "Submit label is required"],
    minlength: [3, "Submit label must be at least 3 characters long"],
    maxlength: [100, "Submit label cannot exceed 100 characters"],
    trim: true,
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

});

const myDB = mongoose.connection.useDb(getDatabaseName());
const PlanModel = myDB.model("Plan", planSchema);

module.exports = PlanModel;
