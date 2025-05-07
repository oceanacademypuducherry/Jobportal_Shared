const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const { getDatabaseName } = require("../../constants");


const reportSchema = new mongoose.Schema({
    _id: { 
        type: ObjectId, 
        auto:true
    },
    candidateId: { 
        type: ObjectId, 
        required: true 
    },
    jobPostId: { 
        type: ObjectId, 
        required: true 
    }, 
    reportReason:{
        type: Array,
        default: []
    },
    organizationId:{
        type: ObjectId, 
        required: true 
    }
})
const myDB = mongoose.connection.useDb(getDatabaseName());
// Create the model
const JobReportModel = myDB.model("job-report", reportSchema);

module.exports = JobReportModel;