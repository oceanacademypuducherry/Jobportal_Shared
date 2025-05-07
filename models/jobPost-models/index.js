const CommonReportModel = require("./commonReport-model");

module.exports = {
  ActiveJobPostModel: require("./active-model"),
  DraftJobPostModel: require("./draft-model"),
  ExpiredJobPostModel: require("./expired-model"),
  JobInvitationModel: require("./invitation-model"),
  OnHoldJobPostModel: require("./onHold-model"),
  PendingJobPostModel: require("./pending-model"),
  RejectedJobPostModel: require("./rejected-model"),
  JobReportModel: require("./reportJob-model"),
  VerificationJobPostModel: require("./verification-model"),
  CommonReportModel: require("./commonReport-model")
};
