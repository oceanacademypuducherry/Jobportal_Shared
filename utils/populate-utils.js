const { SkillModel } = require("../models/common-models/skill-model");
const { RoleModel } = require("../models/common-models/role-model");
const {
  ActiveOrganizationModel,
} = require("../models/organization-models/active-model");
const { EducationModel } = require("../models/common-models/education-model");
const {
  SpecializationModel,
} = require("../models/common-models/specialization-model");
const { CourseModel } = require("../models/common-models/course-model");

/**
 * Applies common population and selection to job post queries.
 * @param {Query} query - The Mongoose query to modify.
 * @returns {Query} - The modified Mongoose query.
 */
const populateJobPostDetails = (query) => {
  return query
    .select("-createdAt -updatedAt -__v -planId") // Exclude specified fields
    .populate({
      path: "jobSkillIds",
      model: SkillModel,
      select: "skillName",
    })
    .populate({
      path: "jobPreferredSkillIds",
      model: SkillModel,
      select: "skillName",
    })
    .populate({
      path: "jobRoleIds",
      model: RoleModel,
      select: "roleName",
    })
    .populate({
      path: "organizationId",
      model: ActiveOrganizationModel,
      select: "organizationName",
    })
    .populate({
      path: "qualificationIds",
      model: EducationModel,
      select: "label",
    })
    .populate({
      path: "courseIds",
      model: CourseModel,
      select: "label",
    })
    .populate({
      path: "specializationIds",
      model: SpecializationModel,
      select: "label",
    });
};

module.exports = { populateJobPostDetails };
