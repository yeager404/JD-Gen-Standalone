const mongoose = require('mongoose');

const jobPrompt = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  keywords: {
    type: [String],
    default: [],
  },
  jobLocation: {
    type: String,
    required: true,
  },
  employmentType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance', 'remote'],
    required: true,
  },
  requiredSkills: {
    type: [String],
    default: [],
  },
  additionalInfo: {
    type: String,
  },
  educationRequirements: {
    type: String,
  },
  jobDescriptionMarkdown:{
    type: String,
  },
  jobDeadline: {
    type: Date,
  },
  responses:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Response"
    }
  ]

}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobPrompt);

module.exports = Job;