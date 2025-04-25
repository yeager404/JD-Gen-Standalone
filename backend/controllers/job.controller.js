const Job = require("../models/JobPrompt.model.js"); 

const createJob = async (req, res) => {
  try {
    const {
      companyName,
      jobRole,
      yearsOfExperience,
      keywords,
      jobLocation,
      employmentType,
      requiredSkills,
      additionalInfo,
      educationRequirements,
      jobDescriptionMarkdown,
    } = req.body;

    const newJob = new Job({
      companyName,
      jobRole,
      yearsOfExperience,
      keywords,
      jobLocation,
      employmentType,
      requiredSkills,
      additionalInfo,
      educationRequirements,
      jobDescriptionMarkdown,
    });

    const savedJob = await newJob.save();

    return res.status(201).json({
      message: "Job created successfully",
      jobId: savedJob._id
    });

  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {createJob};
