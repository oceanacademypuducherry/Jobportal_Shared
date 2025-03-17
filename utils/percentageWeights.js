// Define percentage weights for all fields
const percentageWeights = {
  resume: 15,
  skillIds: 10,
  roleIds: 10,
  linkedIn: 3,
  workStatus: 4,
  noticePeriod: 4,
  profileSummary: 5,
  avatar: 5,
  fullName: 5,
  email: 5,
  mobileNumber: 6,
  countryCode: 2,
  maritalStatus: 2,
  gender: 2,
  dob: 2,
  address: 5,
  speakingLanguageIds: 3,
  educations: 5, // 5% for educations
  schools: 5, // 5% for schools
  projects: 7,
};

/**
 * Calculates the score for a candidate based on provided fields.
 * @param {Object} candidate - The candidate object containing various fields.
 * @returns {number} The total score calculated based on the percentage weights.
 */
const calculateScore = (candidate) => {
  if (!candidate || typeof candidate !== "object") {
    throw new Error("Invalid candidate object");
  }

  let totalScore = 0;

  // Destructure properties for cleaner access
  const {
    resume,
    skillIds,
    roleIds,
    linkedIn,
    workStatus,
    noticePeriod,
    profileSummary,
    avatar,
    fullName,
    email,
    mobileNumber,
    countryCode,
    maritalStatus,
    gender,
    dob,
    address,
    speakingLanguageIds,
    educations,
    schools,
    projects,
  } = candidate;

  // Add score for each field based on existence
  if (resume) totalScore += percentageWeights.resume;
  if (Array.isArray(skillIds) && skillIds.length)
    totalScore += percentageWeights.skillIds;
  if (Array.isArray(roleIds) && roleIds.length)
    totalScore += percentageWeights.roleIds;
  if (linkedIn) totalScore += percentageWeights.linkedIn;
  if (workStatus) totalScore += percentageWeights.workStatus;
  if (noticePeriod) totalScore += percentageWeights.noticePeriod;
  if (profileSummary) totalScore += percentageWeights.profileSummary;
  if (avatar) totalScore += percentageWeights.avatar;
  if (fullName) totalScore += percentageWeights.fullName;
  if (email) totalScore += percentageWeights.email;
  if (mobileNumber) totalScore += percentageWeights.mobileNumber;
  if (countryCode) totalScore += percentageWeights.countryCode;
  if (maritalStatus) totalScore += percentageWeights.maritalStatus;
  if (gender) totalScore += percentageWeights.gender;
  if (dob) totalScore += percentageWeights.dob;
  if (address) totalScore += percentageWeights.address;
  if (Array.isArray(speakingLanguageIds) && speakingLanguageIds.length)
    totalScore += percentageWeights.speakingLanguageIds;

  // Check for either educations or schools
  if (
    (Array.isArray(educations) && educations.length) ||
    (Array.isArray(schools) && schools.length)
  ) {
    totalScore += percentageWeights.educations; // Add 5% for educations if exists
  }
  // if (
  //   Array.isArray(schools) &&
  //   schools.length &&
  //   !(Array.isArray(educations) && educations.length)
  // ) {
  //   totalScore += percentageWeights.schools; // Add 5% for schools only if educations don't exist
  // }

  // Add score for projects if they exist
  if (Array.isArray(projects) && projects.length) {
    totalScore += percentageWeights.projects;
  }

  return totalScore;
};

module.exports = { percentageWeights, calculateScore };
