import React from 'react';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { useJobStore } from '../store/jobStore';

const LinkedInAuth = () => {
  const { setLinkedInAccessToken, setError } = useJobStore();

  const { linkedInLogin } = useLinkedIn({
    clientId: 'YOUR_LINKEDIN_CLIENT_ID', // Replace with your LinkedIn Client ID
    redirectUri: `${window.location.origin}/linkedin`,
    scope: 'w_member_social',
    onSuccess: (code) => {
      // Exchange code for access token using your backend
      setLinkedInAccessToken(code);
    },
    onError: (error) => {
      setError('LinkedIn authentication failed: ' + error);
    },
  });

  return (
    <button
      onClick={linkedInLogin}
      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Connect LinkedIn
    </button>
  );
};

export default LinkedInAuth;