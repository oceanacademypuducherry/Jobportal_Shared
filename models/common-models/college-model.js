const mongoose = require('mongoose');
const { getDatabaseName } = require("../../constants");

const collegeSchema = new mongoose.Schema({
    universityName: {
        type: String,
        required: true
    },
    collegeName: {
        type: String,
        required: true
    },
    // collegeType: {
    //     type: String,
    //     enum: ['Affiliated College', 'Constituent / University College', 'PG Center / Off-Campus Center', 'Recognized Center'],
    //     required: true
    // },
    stateName: {
        type: String,
        required: true
    },
    districtName: {
        type: String,
        required: true
    }
}, { timestamps: false });

const myDB = mongoose.connection.useDb(getDatabaseName());

const College = myDB.model('college', collegeSchema);

module.exports = College;
