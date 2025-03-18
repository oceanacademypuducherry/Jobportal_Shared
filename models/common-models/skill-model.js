const mongoose = require("mongoose");
const { getDatabaseName } = require("../../constants");

// Define the schema
const schema = new mongoose.Schema(
  {
    skillName: {
      type: String,
      required: true,
    },
  },

  { timestamps: { createdAt: true, updatedAt: true } }
);

const myDB = mongoose.connection.useDb(getDatabaseName());

// Create the model
const SkillModel = myDB.model("skill", schema);

module.exports = SkillModel;
