const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// GitHub Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
  scope: ['user:email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user exists
    let user = await User.findOne({ githubId: profile.id });

    if (!user) {
      // Create new user
      user = new User({
        githubId: profile.id,
        name: profile.displayName || profile.username,
        email: profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.username}@github.com`,
        avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : '',
        authMethod: 'github',
        isVerified: true
      });
      await user.save();
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

module.exports = passport;
