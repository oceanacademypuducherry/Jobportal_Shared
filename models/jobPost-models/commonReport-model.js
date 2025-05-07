const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const { getDatabaseName } = require("../../constants");


const commonReportSchema = new mongoose.Schema({
    _id: { 
        type: ObjectId, 
        auto:true
    },
    userId: { 
        type: ObjectId, 
        required: true 
    },
    issueImage: { 
        type: String
    },
    issue:{
        type: String
    }
})
const myDB = mongoose.connection.useDb(getDatabaseName());
// Create the model
const CommonReportModel = myDB.model("common-report", commonReportSchema);

module.exports = CommonReportModel;