const { isProduction } = require("../utils");

module.exports = {
    // Database constants
    DATABASE_NAME: isProduction() ? "OA_Job_Portal_API" : "OA_Job_Portal_API_TEST",
};
