const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  organisationName: {
    type: String,
  },
  enrolledProgram: {
    type: String,
  },
  representerName: {
    type: String,
  },
  representerDesignation: {
    type: String,
  },
  registeredID: {
    type: Number,
  },
  month: {
    type: String,
  },
  food: {
    type: Number,
  },
  under: {
    type: Number,
  },
  over: {
    type: Number,
  },
  females: {
    type: Number,
  },
  total: {
    type: Number,
  },
  location: {
    type: String,
  },
  partnerOrganisation: {
    type: String,
  },
});

module.exports = mongoose.model("enrollment", EnrollmentSchema);
