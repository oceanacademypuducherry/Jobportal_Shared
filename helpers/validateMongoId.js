const mongoose = require("mongoose");

// Helper function to check if an array contains valid MongoDB ObjectIds
const areValidObjectIds = (ids) =>
  ids.every((id) => mongoose.Types.ObjectId.isValid(id));

// Helper function to check if it contains valid MongoDB ObjectIds
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = {
  areValidObjectIds,
  isValidObjectId,
};
