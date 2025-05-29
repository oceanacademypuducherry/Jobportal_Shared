const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

// Define the schema
const pendingJobPostStep2Schema = new mongoose.Schema(
  {
    qualificationIds: {
      type: [ObjectId],
      required: [true, "Qualification ID is required"],
      validate: {
        validator: function (v) {
          return v.every((id) => ObjectId.isValid(id));
        },
        message: "Invalid Qualification ID format",
      },
    },
    courseIds: {
      type: [ObjectId],
      required: [true, "Course ID is required"],
      validate: {
        validator: function (v) {
          return v.every((id) => ObjectId.isValid(id));
        },
        message: "Invalid Course ID format",
      },
    },
    specializationIds: {
      type: [ObjectId],
      required: [true, "Specialization ID is required"],
      validate: {
        validator: function (v) {
          return v.every((id) => ObjectId.isValid(id));
        },
        message: "Invalid Specialization ID format",
      },
    },
    preferredGender: {
      type: String,
      required: [true, "Preferred gender is required"],
      enum: {
        values: ["Male", "Female", "Other", "Any"],
        message: "Preferred gender must be 'Male', 'Female', 'Other', or 'Any'",
      },
      minlength: [3, "Preferred gender must be at least 3 characters"],
      maxlength: [6, "Preferred gender must be at most 6 characters"],
    },
    jobOpeningCount: {
      type: Number,
      required: [true, "Job opening count is required"],
      min: [1, "Job opening count must be at least 1"],
      validate: {
        validator: Number.isInteger,
        message: "Job opening count must be an integer",
      },
    },
    experienceLevel: {
      type: String,
      enum: {
        values: ["Fresher", "Experienced", "Any"],
        message: "Experience level must be 'Fresher', 'Experienced', or 'Any'",
      },
      required: [true, "Experience level is required"],
      minlength: [3, "Experience level must be at least 3 characters"],
      maxlength: [11, "Experience level must be at most 11 characters"],
    },
    // experience: {
    //   type: {
    //     min: {
    //       type: Number,
    //       required: function () {
    //         return this.experienceLevel === "Experienced";
    //       },
    //       min: [0, "Minimum experience must be a non-negative number"],
    //       validate: {
    //         validator: Number.isInteger,
    //         message: "Minimum experience must be an integer",
    //       },
    //     },
    //     max: {
    //       type: Number,
    //       required: function () {
    //         return this.experienceLevel === "Experienced";
    //       },
    //       min: [0, "Maximum experience must be a non-negative number"],
    //       validate: {
    //         validator: Number.isInteger,
    //         message: "Maximum experience must be an integer",
    //       },
    //     },
    //   },
    //   validate: {
    //     validator: function (v) {
    //       if (
    //         this.experienceLevel === "Fresher" ||
    //         this.experienceLevel === "Any"
    //       ) {
    //         return !v || (v.min === undefined && v.max === undefined);
    //       }
    //       return v.min <= v.max;
    //     },
    //     message: function (props) {
    //       if (
    //         this.experienceLevel === "Fresher" ||
    //         this.experienceLevel === "Any"
    //       ) {
    //         return "Experience field should not be provided for 'Fresher' or 'Any' experience levels";
    //       }
    //       return "Minimum experience must be less than or equal to maximum experience";
    //     },
    //   },
    // },
        experience: {
  type: {
    min: {
      type: Number,
      required: function () {
        return this.experienceLevel === "Experienced";
      },
      min: [0, "Minimum experience must be a non-negative number"],
      validate: {
        validator: Number.isInteger,
        message: "Minimum experience must be an integer",
      },
    },
    max: {
      type: Number,
      required: function () {
        return this.experienceLevel === "Experienced";
      },
      min: [0, "Maximum experience must be a non-negative number"],
      validate: {
        validator: Number.isInteger,
        message: "Maximum experience must be an integer",
      },
    },
  },
  validate: {
    validator: function (v) {
      if (this.experienceLevel === "Fresher") {
        return !v || (v.min === undefined && v.max === undefined);
      }
      if (this.experienceLevel === "Experienced") {
        return v && v.min <= v.max;
      }
      // When experienceLevel is "Any", allow any value or no value
      return true;
    },
    message: function (props) {
      if (this.experienceLevel === "Fresher") {
        return "Experience field should not be provided for 'Fresher' experience level";
      }
      if (this.experienceLevel === "Experienced") {
        return "Minimum experience must be less than or equal to maximum experience";
      }
      return "Invalid experience configuration";
    },
  },
},
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = { pendingJobPostStep2Schema };
