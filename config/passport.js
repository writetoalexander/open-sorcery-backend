const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GitHubStrategy = require('passport-github2');
const keys = require('./keys.js');
const User = require('../database');

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});



passport.use(new GitHubStrategy({
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret,
    callbackURL: "http://localhost:4500/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
		console.log('inside passport.use access is ', accessToken);
		console.log('inside passport.use refresh is ', refreshToken);
    let userData = {
      name: profile.displayName,
      token: accessToken,
      refresh: refreshToken
    };
    let usrObj = new User({
				userID: profile.id,
				userName: profile.displayName
			});
			User.findOne({userID: profile.id}, (err, res) => {
				if(!res) {
					usrObj.save(console.log('saving ', usrObj.userName));
				} else {
					console.log('user is present ', usrObj);
				}
			});
			done(null, userData);
  }
));










