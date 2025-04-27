// src/services/api.js - Vite version

/**
 * Service to communicate with the Flask backend API
 */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Generate job descriptions based on form data
 * @param {Object} formData - The job data to send to the API
 * @returns {Promise} - Promise with the API response
 */

function generateJobPrompt(jobData, change='') {
  const {
    companyName,
    jobRole,
    yearsOfExperience,
    keywords = [],
    jobLocation,
    employmentType,
    requiredSkills = [],
    additionalInfo,
    jobDeadline,
    educationRequirements,
  } = jobData;

  const prompt = `
${companyName} is hiring for the position of **${jobRole}**.
They are looking for candidates with at least **${yearsOfExperience} years** of relevant experience.

**Location:** ${jobLocation}
**Employment Type:** ${employmentType}
**Required Skills:** ${requiredSkills.join(", ")}
**Preferred Keywords:** ${keywords.join(", ")}

**Education Requirements:** ${educationRequirements}
${additionalInfo ? `**Additional Info:** ${additionalInfo}` : ""}
**Application Deadline:** ${jobDeadline}

    `.trim();
  return prompt;
}
export const generateJobDescriptions = async (formData) => {

  const prompt = {prompt: generateJobPrompt(formData), threadID: "1"}

  try {
    const response = await fetch(`http://192.168.45.152:8000/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });


    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to generate job descriptions');
    }
    let data = await response.json()
    console.log(data);

    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
export const generateChanges = async (formData, change) => {

  const prompt = {prompt: change, threadID: "1"}

  try {
    const response = await fetch(`http://192.168.45.152:8000/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });


    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to generate job descriptions');
    }
    let data = await response.json()
    console.log(data);

    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
export const generateJobDescriptionsDUM = async (formData) => {

  const prompt = {prompt: generateJobPrompt(formData)}

  try {
    const response = await fetch(`http://localhost:5000/api/mdDemo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });


    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to generate job descriptions');
    }
    let data = await response.json()
    console.log(data);

    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
export const submitResume = async (formData) => {
  try {
    const response = await fetch(`http://localhost:5000/api/jobs/${formData.get('uid')}/respond`, {
      method: "POST",
      headers: {
      },
      body: formData,
    });


    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit application');
    }
    let data = await response.json()
    console.log(data);

    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
export const submitJob = async (formData) => {


  try {
    const response = await fetch(`http://localhost:5000/api/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });


    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit form');
    }
    let data = await response.json()
    console.log(data);

    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
