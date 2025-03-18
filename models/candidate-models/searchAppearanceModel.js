const mongoose = require("mongoose");
const { getDatabaseName } = require("../../constants");
const Schema = mongoose.Schema;

const SearchAppearanceSchema = new Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recruiter",
      required: true,
    },
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "candidate",
      required: true,
    },
    appearanceCount: {
      type: Number,
      default: 1,
    },
    // Field to track expiration date
    expiresAt: {
      type: Date,
      required: true,
      default: () => {
        // Set the default expiration time to 30 days from now
        return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      },
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Add an index to improve performance of frequent searches
SearchAppearanceSchema.index(
  { recruiterId: 1, candidateId: 1 },
  { unique: true }
);

// Create a TTL index on the expiresAt field
SearchAppearanceSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const myDB = mongoose.connection.useDb(getDatabaseName());

const SearchAppearanceModel = myDB.model(
  "search-appearance-history",
  SearchAppearanceSchema
);

module.exports = SearchAppearanceModel;
