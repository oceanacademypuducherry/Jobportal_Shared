const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// Define the schema
const pendingJobPostStep1Schema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      minlength: [3, "Job title must be at least 3 characters long"],
      maxlength: [100, "Job title cannot exceed 100 characters"],
    },
    jobRoleIds: {
      type: [{ type: ObjectId, ref: "role", required: true }],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one job role ID is required",
      },
    },
    jobSkillIds: {
      type: [{ type: ObjectId, ref: "skill", required: true }],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one job skill ID is required",
      },
    },
    jobPreferredSkillIds: {
      type: [{ type: ObjectId, ref: "skill", required: true }],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one job preferred skill ID is required",
      },
    },
    jobLocation: {
      type: String,
      required: [true, "Job location is required"],
      minlength: [2, "Job location must be at least 2 characters long"],
      maxlength: [100, "Job location cannot exceed 100 characters"],
    },
    jobMode: {
      type: [{ type: String, required: true }],
      validate: {
        validator: function (v) {
          const validModes = ["Remote", "On-site", "Hybrid"];
          return v.every((mode) => validModes.includes(mode));
        },
        message: "Invalid job mode",
      },
    },
    jobType: {
      type: [{ type: String, required: true }],
      validate: {
        validator: function (v) {
          const validTypes = [
            "Full-time",
            "Part-time",
            "Contract",
            "Internship",
          ];
          return v.every((type) => validTypes.includes(type));
        },
        message: "Invalid job type",
      },
    },
    jobShift: {
      type: String,
      required: [true, "Job shift is required"],
      enum: {
        values: ["Day", "Night", "Flexible"],
        message: "Invalid job shift",
      },
    },
    isJobSalaryToShow: {
      type: Boolean,
      required: [true, "Salary display preference is required"],
    },
    jobSalaryDetails: {
      type: {
        jobSalaryCurrency: {
          type: String,
          required: function () {
            return this.isJobSalaryToShow;
          },
          enum: {
            values: ["USD", "INR"],
            message: "Job salary currency must be either 'USD' or 'INR'",
          },
        },
        jobMaximumSalary: {
          type: Number,
          required: function () {
            return this.isJobSalaryToShow;
          },
          min: [0, "Job maximum salary must be a positive number"],
        },
        jobMinimumSalary: {
          type: Number,
          required: function () {
            return this.isJobSalaryToShow;
          },
          min: [0, "Job minimum salary must be a positive number"],
          validate: {
            validator: function (v) {
              return this.isJobSalaryToShow
                ? v <= this.jobSalaryDetails.jobMaximumSalary
                : true;
            },
            message:
              "Job minimum salary must be less than or equal to maximum salary",
          },
        },
      },
      validate: {
        validator: function (v) {
          if (this.isJobSalaryToShow) {
            return (
              v.jobSalaryCurrency && v.jobMaximumSalary && v.jobMinimumSalary
            );
          }
          return true;
        },
        message:
          "All job salary details are required when salary display preference is enabled",
      },
    },
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
      minlength: [10, "Job description must be at least 10 characters long"],
      maxlength: [2000, "Job description cannot exceed 2000 characters"],
    },
    jobResponsibility: {
      type: [{ type: String, required: true }],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one job responsibility is required",
      },
    },
    jobRequirement: {
      type: [{ type: String, required: true }],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one job requirement is required",
      },
    },
    isFeeCollecting: {
      type: Boolean,
      required: [true, "Fee collecting status is required"],
    },
    feeDetails: {
      amount: {
        type: Number,
        required: function () {
          return this.isFeeCollecting;
        },
        min: [0, "Fee amount must be a positive number"],
      },
      reasons: {
        type: [{ type: String, required: true }],
        required: function () {
          return this.isFeeCollecting;
        },
        validate: {
          validator: function (v) {
            return this.isFeeCollecting
              ? Array.isArray(v) && v.length > 0
              : true;
          },
          message: "At least one reason for the fee is required",
        },
      },
      feePaymentSchedule: {
        type: String,
        enum: ["Before giving job", "After giving job"],
        required: false,
      },
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = { pendingJobPostStep1Schema };
