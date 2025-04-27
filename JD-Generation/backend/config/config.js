module.exports = {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/job-description-generator',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
    LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
    LINKEDIN_REDIRECT_URI: process.env.LINKEDIN_REDIRECT_URI,
    TWITTER_API_KEY: process.env.TWITTER_API_KEY,
    TWITTER_API_SECRET: process.env.TWITTER_API_SECRET,
    TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_SECRET: process.env.TWITTER_ACCESS_SECRET,
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
    JWT_EXPIRE: '24h'
  };