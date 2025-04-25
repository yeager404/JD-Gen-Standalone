// backend/services/aiService.js
const axios = require('axios');
const ErrorResponse = require('../utils/errorHandler');

exports.generateDescriptions = async (formData) => {
  try {
    // 1. Kubernetes Service Endpoint (choose one option below)
    const MODEL_SERVICE_URL = process.env.MODEL_SERVICE_URL || 
      'http://your-service-name.your-namespace.svc.cluster.local:8000/predict';
      // OR for external access:
      // 'https://api.yourdomain.com/jd-generator'

    // 2. Prepare input for your model
    const payload = {
      company_name: formData.companyName,
      job_role: formData.jobRole,
      skills: formData.requiredSkills,
      // ... other fields your model expects
    };

    // 3. Call your model
    const response = await axios.post(MODEL_SERVICE_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        // Add auth if needed:
        'Authorization': `Bearer ${process.env.MODEL_API_KEY}`
      },
      timeout: 30000 // Increase timeout if model is slow
    });

    // 4. Parse your model's response
    return {
      linkedInDescription: response.data.linkedin_description,
      twitterDescription: response.data.twitter_description
    };

  } catch (err) {
    console.error('Model Service Error:', err.response?.data || err.message);
    return {
      linkedInDescription: generateDefaultLinkedInDesc(formData),
      twitterDescription: generateDefaultTwitterDesc(formData)
    };
  }
};