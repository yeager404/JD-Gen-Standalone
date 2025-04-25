const { TwitterApi } = require('twitter-api-v2');
const ErrorResponse = require('../utils/errorHandler');

exports.postTweet = async (accessToken, accessTokenSecret, tweet) => {
  try {
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken,
      accessSecret: accessTokenSecret
    });

    const response = await client.v2.tweet(tweet);
    return response.data;
  } catch (err) {
    console.error('Twitter API Error:', err);
    throw new ErrorResponse('Failed to post to Twitter', 500);
  }
};