const mongoose = require("mongoose");
const { getDatabaseName } = require("../../constants");
const { ObjectId } = mongoose.Types;

// Define the schema for Search Appearance History
const searchAppearanceHistorySchema = new mongoose.Schema(
  {
    recruiterId: { type: ObjectId, ref: "recruiter", required: true },
    searchQuery: {
      roleIds: { type: [ObjectId], default: [] },
      skillIds: { type: [ObjectId], default: [] },
      workStatus: {
        type: String,
        enum: ["fresher", "experienced", null],
        default: null,
      },
      yearExperienceStart: { type: Number, default: null },
      yearExperienceEnd: { type: Number, default: null },
    },
    searchDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Create indexes for efficient querying
searchAppearanceHistorySchema.index({ recruiterId: 1 });
searchAppearanceHistorySchema.index({ searchDate: -1 });

// Create the model
const myDB = mongoose.connection.useDb(getDatabaseName());
const SearchAppearanceHistoryModel = myDB.model(
  "search-appearance-history",
  searchAppearanceHistorySchema
);

module.exports = SearchAppearanceHistoryModel;
