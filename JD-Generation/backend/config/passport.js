const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('./config');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// LinkedIn Strategy
passport.use(new LinkedInStrategy({
  clientID: config.LINKEDIN_CLIENT_ID,
  clientSecret: config.LINKEDIN_CLIENT_SECRET,
  callbackURL: config.LINKEDIN_REDIRECT_URI,
  scope: ['r_emailaddress', 'r_liteprofile', 'w_member_social'],
  state: true
}, (accessToken, refreshToken, profile, done) => {
  return done(null, { profile, accessToken });
}));

// Twitter Strategy
passport.use(new TwitterStrategy({
  consumerKey: config.TWITTER_API_KEY,
  consumerSecret: config.TWITTER_API_SECRET,
  callbackURL: `${config.BASE_URL}/api/auth/twitter/callback`,
  includeEmail: true
}, (token, tokenSecret, profile, done) => {
  return done(null, { profile, token, tokenSecret });
}));