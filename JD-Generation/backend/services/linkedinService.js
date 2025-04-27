const axios = require('axios');
const config = require('../config/config');
const ErrorResponse = require('../utils/errorHandler');

exports.generateDescriptions = async (formData) => {
  try {
    // Using OpenAI API to generate descriptions
    const prompt = `Generate two job descriptions for a ${formData.jobRole} position at ${formData.companyName}. 
    The first should be a professional LinkedIn post (500-1000 characters). 
    The second should be a concise Twitter post (280 characters max with relevant hashtags). 
    Here are the details:
    - Experience: ${formData.yearsOfExperience} years
    - Location: ${formData.jobLocation}
    - Employment Type: ${formData.employmentType}
    - Skills: ${formData.requiredSkills.join(', ')}
    - Salary: $${formData.salaryRange.min}-$${formData.salaryRange.max}
    - Education: ${formData.educationRequirements}
    - Keywords: ${formData.keywords.join(', ')}`;

    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.7,
      n: 1
    }, {
      headers: {
        'Authorization': `Bearer ${config.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const text = response.data.choices[0].text.trim();
    // Parse the response to get LinkedIn and Twitter descriptions
    const linkedInDescription = text.split('LinkedIn:')[1]?.split('Twitter:')[0]?.trim();
    const twitterDescription = text.split('Twitter:')[1]?.trim();

    return {
      linkedInDescription: linkedInDescription || generateDefaultLinkedInDesc(formData),
      twitterDescription: twitterDescription || generateDefaultTwitterDesc(formData)
    };
  } catch (err) {
    console.error('AI Service Error:', err);
    // Return default descriptions if API fails
    return {
      linkedInDescription: generateDefaultLinkedInDesc(formData),
      twitterDescription: generateDefaultTwitterDesc(formData)
    };
  }
};

function generateDefaultLinkedInDesc(formData) {
  return `${formData.companyName} is seeking a ${formData.jobRole} with ${formData.yearsOfExperience} years of experience. 
  Location: ${formData.jobLocation}. 
  Employment Type: ${formData.employmentType}. 
  Required Skills: ${formData.requiredSkills.join(', ')}. 
  Salary Range: $${formData.salaryRange.min.toLocaleString()} - $${formData.salaryRange.max.toLocaleString()}. 
  Education: ${formData.educationRequirements}.`;
}

function generateDefaultTwitterDesc(formData) {
  return `🚀 ${formData.companyName} is hiring a ${formData.jobRole}!
  📍 ${formData.jobLocation} | ${formData.employmentType}
  💰 $${formData.salaryRange.min.toLocaleString()}-$${formData.salaryRange.max.toLocaleString()}
  #${formData.keywords.join(' #')}`;
}