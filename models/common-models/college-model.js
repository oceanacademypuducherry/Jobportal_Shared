const mongoose = require('mongoose');
const { getDatabaseName } = require("../../constants");

const collegeSchema = new mongoose.Schema({
    collegeName: {
        type: String,
        required: true
    }
}, { timestamps: false });

const myDB = mongoose.connection.useDb(getDatabaseName());

const College = myDB.model('college', collegeSchema);

module.exports = College;
