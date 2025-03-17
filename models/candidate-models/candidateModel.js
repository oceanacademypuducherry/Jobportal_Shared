const mongoose = require("mongoose");
const { percentageWeights } = require("../../utils");
const { DATABASE_NAME } = require("../../constants");
const { ObjectId } = mongoose.Types;

// Enum Definitions
const WORK_STATUS = ["fresher", "experienced", null];
const MARITAL_STATUS = [
  "married",
  "unmarried",
  "widowed",
  "divorced",
  "separated",
  "other",
  null,
];
const GENDER = ["male", "female", "other", null];
const PROJECT_STATUS = ["completed", "notCompleted", null];

const educationSchema = new mongoose.Schema({
  _id: { type: ObjectId, auto: true },
  qualificationId: { type: ObjectId, required: true },
  // qualification: { type: String, required: true },
  specializationId: {
    type: ObjectId,
    required: function () {
      return !this.isOther;
    },
    default: null,
  },
  // specialization: { type: String, required: true },
  courseId: {
    type: ObjectId,
    required: function () {
      return !this.isOther;
    },
    default: null,
  },
  // course: { type: String, required: true },
  institute: { type: String, required: true },
  courseType: { type: String, required: true },
  courseStartYear: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "Course start year must be an integer.",
    },
  },
  courseEndYear: {
    type: Number,
    required: true,
    validate: [
      {
        validator: Number.isInteger,
        message: "Course end year must be an integer.",
      },
      {
        validator: function (value) {
          return this.courseStartYear <= value;
        },
        message:
          "Course start year must be less than or equal to course end year.",
      },
    ],
  },
  courseStartMonth: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  courseEndMonth: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
    validate: {
      validator: function (value) {
        if (this.courseStartYear === this.courseEndYear) {
          return this.courseStartMonth <= value;
        }
        return true;
      },
      message:
        "Course start month must be less than or equal to course end month within the same year.",
    },
  },
  markPercentage: { type: Number, default: null },
  isPrimary: { type: Boolean, required: true },
  isOther: { type: Boolean, default: false },
});

const schoolSchema = new mongoose.Schema({
  _id: { type: ObjectId, auto: true },
  qualification: { type: String, required: true },
  schoolBoard: { type: String, required: true },
  schoolPassedOutYear: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "School passed-out year must be an integer.",
    },
  },
  schoolPassedOutMonth: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
    validate: {
      validator: Number.isInteger,
      message: "School passed-out month must be an integer.",
    },
  },
  schoolMedium: {
    type: String,
    default: null,
    validate: {
      validator: function (value) {
        return value === null || value.trim().length > 0;
      },
      message: "School medium cannot be an empty string.",
    },
  },
  markPercentage: {
    type: Number,
    default: null,
    min: 0,
    max: 100,
    validate: {
      validator: function (value) {
        if (value !== null && (value < 0 || value > 100)) {
          return false;
        }
        return true;
      },
      message: "Mark percentage must be between 0 and 100.",
    },
  },
});

// Define the schema
const schema = new mongoose.Schema(
  {
    profilePercentage: { type: Number, default: 0 },
    skillIds: { type: [ObjectId], ref: "skill", default: [] },
    roleIds: { type: [ObjectId], ref: "role", default: [] },
    resume: {
      type: {
        resumeName: { type: String, default: null },
        resumeLink: { type: String, default: null },
        createdAt: { type: Date, default: Date.now },
      },
      default: null,
    },
    linkedIn: { type: String, default: null },
    workStatus: {
      type: String,
      enum: WORK_STATUS,
      default: null,
      validate: {
        validator: function (value) {
          return WORK_STATUS.includes(value);
        },
        message: "Invalid work status",
      },
    },
    experience: {
      type: {
        years: {
          type: Number,
          default: null,
          validate: {
            validator: function (value) {
              return (
                this.workStatus === "fresher" || (value !== null && value >= 0)
              );
            },
            message: "Years of experience must be at least 0 for non-freshers.",
          },
        },
        months: {
          type: Number,
          default: null,
          validate: {
            validator: function (value) {
              return (
                this.workStatus === "fresher" || (value !== null && value >= 0)
              );
            },
            message:
              "Months of experience must be at least 0 for non-freshers.",
          },
        },
      },
      default: null,
      validate: {
        validator: function (value) {
          if (this.workStatus === "fresher") {
            return (
              value === null || (value.years === null && value.months === null)
            );
          }
          return true;
        },
        message: "Experience should be null for freshers.",
      },
    },
    currentSalary: {
      type: Number,
      default: null,
      validate: {
        validator: function (value) {
          return this.workStatus !== "fresher" || value === null;
        },
        message: "currentSalary is required for non-freshers",
      },
    },
    salaryExpectation: {
      type: Number,
      default: null,
      validate: {
        validator: function (value) {
          return value === null || value > 0;
        },
        message: "Salary expectation must be a positive number.",
      },
    },
    noticePeriod: { type: String, default: null },
    profileSummary: { type: String, default: null },
    avatar: { type: String, default: null },
    fullName: { type: String, default: null },
    mobileNumber: { type: Number, default: null },
    email: { type: String, default: null, required: true },
    countryCode: { type: String, default: "+91" },
    maritalStatus: {
      type: String,
      enum: MARITAL_STATUS,
      default: null,
      validate: {
        validator: function (value) {
          return MARITAL_STATUS.includes(value);
        },
        message: "Invalid marital status",
      },
    },
    gender: {
      type: String,
      enum: GENDER,
      default: null,
      validate: {
        validator: function (value) {
          return GENDER.includes(value);
        },
        message: "Invalid gender",
      },
    },
    dob: { type: Date, default: null },
    address: {
      type: {
        city: { type: String, default: null },
        area: { type: String, default: null },
        street: { type: String, default: null },
        pincode: { type: Number, default: null },
      },
      default: null,
    },
    speakingLanguageIds: {
      type: [ObjectId],
      ref: "speaking-language",
      default: [],
    },
    educations: {
      type: [educationSchema],
      default: [],
    },
    // Fields for 10th and 12th qualifications
    schools: {
      type: [schoolSchema],
      default: [],
      validate: {
        validator: function (schools) {
          // Count how many entries are there for 10th and 12th grades
          const count10th = schools.filter(
            (school) => school.qualification === "10th"
          ).length;
          const count12th = schools.filter(
            (school) => school.qualification === "12th"
          ).length;

          // Ensure there's exactly one entry for 10th and one entry for 12th
          return count10th <= 1 && count12th <= 1;
        },
        message:
          "Candidate must have exactly one school entry for 10th grade and one entry for 12th grade.",
      },
    },
    projects: {
      type: [
        {
          _id: { type: ObjectId, auto: true },
          projectName: { type: String, default: null },
          projectStatus: {
            type: String,
            enum: PROJECT_STATUS,
            default: null,
            validate: {
              validator: function (value) {
                return PROJECT_STATUS.includes(value);
              },
              message: "Invalid project status",
            },
          },
          projectURL: { type: String, default: null },
          projectDescription: { type: String, default: null },
          projectStartYear: { type: Number, default: null },
          projectStartMonth: { type: Number, default: null },
          projectEndYear: {
            type: Number,
            default: null,
            validate: {
              validator: function (value) {
                // Allow non-null value only if the project status is 'completed'
                if (this.projectStatus === "completed" && value === null) {
                  return false;
                }
                // Ensure projectEndYear is null if projectStatus is not 'completed'
                if (this.projectStatus !== "completed" && value !== null) {
                  return false;
                }
                return true;
              },
              message:
                "projectEndYear must be provided only for completed projects.",
            },
          },
          projectEndMonth: {
            type: Number,
            default: null,
            validate: {
              validator: function (value) {
                if (this.projectStatus === "completed" && value === null) {
                  return false;
                }
                if (this.projectStatus !== "completed" && value !== null) {
                  return false;
                }
                return true;
              },
              message:
                "projectEndMonth must be provided only for completed projects.",
            },
          },
        },
      ],
      default: [],
    },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: true },
    password: { type: String, default: null },
    isResetPassword: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const myDB = mongoose.connection.useDb(DATABASE_NAME);

schema.index({ isActive: 1 });
schema.index({ profilePercentage: 1 });

// Create the model
const CandidateModel = myDB.model("candidate", schema);

module.exports = CandidateModel;
