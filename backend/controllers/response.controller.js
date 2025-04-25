const Response = require('../models/Response.model');
const Job = require('../models/JobPrompt.model');

const submitResponse = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { email } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: 'Resume is required' });
    }

    const newResponse = await Response.create({
      email,
      resume: req.file.path,
    });

    await Job.findByIdAndUpdate(jobId, {
      $push: { responses: newResponse._id },
    });

    return res.status(201).json({ responseId: newResponse._id });
  } catch (error) {
    console.error('Error uploading response:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {  submitResponse };
