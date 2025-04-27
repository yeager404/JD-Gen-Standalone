import { generateJobDescriptions } from './api';

const LINKEDIN_API_URL = 'https://api.linkedin.com/v2';

export const postToLinkedIn = async (accessToken, jobDescription) => {
  try {
    const response = await fetch(`${LINKEDIN_API_URL}/ugcPosts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: 'urn:li:organization:{organization_id}', // Replace with actual org ID
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: jobDescription
            },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to post to LinkedIn');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Error posting to LinkedIn: ' + error.message);
  }
};