const TWITTER_API_URL = 'https://api.twitter.com/2';

export const postToTwitter = async (accessToken, tweetContent) => {
  try {
    const response = await fetch(`${TWITTER_API_URL}/tweets`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: tweetContent
      })
    });

    if (!response.ok) {
      throw new Error('Failed to post tweet');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Error posting to Twitter: ' + error.message);
  }
};