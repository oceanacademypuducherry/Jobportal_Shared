const { isProduction } = require("../utils/env-utils");

module.exports = {
    // Database constants
    getDatabaseName: () => isProduction() ? "OA_Job_Portal_API" : "OA_Job_Portal_API_TEST",
};
