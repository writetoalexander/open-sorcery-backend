const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require('./keys.js');
const User = require('../database');

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.google.clientID,
			clientSecret: keys.google.clientSecret,
			callbackURL: "http://localhost:4500/auth/google/callback"
		},
		function(accessToken, refreshToken, profile, done) {
			let usrObj = new User({
				userID: profile.id,
				userName: profile.displayName
			});
			User.findOne({userID: profile.id}, (err, res) => {
				if(!res) {
					usrObj.save(console.log('saving ', usrObj.userName));
				} else {
					console.log('user already present');
				}
			});
			done(null, usrObj);
		}
	)
);
