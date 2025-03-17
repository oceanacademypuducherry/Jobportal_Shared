const mongoose = require("mongoose");

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

const myDB = mongoose.connection.useDb("OA_Job_Portal_API");

// Create the model
const SkillModel = myDB.model("skill", schema);

module.exports = SkillModel;
