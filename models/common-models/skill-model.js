const mongoose = require("mongoose");
const { DATABASE_NAME } = require("../../constants");

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

const myDB = mongoose.connection.useDb(DATABASE_NAME);

// Create the model
const SkillModel = myDB.model("skill", schema);

module.exports = SkillModel;
