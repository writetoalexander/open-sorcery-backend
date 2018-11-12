var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('gethappening')
	res.render('index', { title: 'Express' });
});

/* GET Google Authentication API. */
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] })
);


router.get(
	'/auth/google/callback',
	passport.authenticate('google', { failureRedirect: '/', session: false }),
	function(req, res) {
		var token = req.user.token;
		res.redirect('http://localhost:3000?token=' + token);
	}
);

router.get('/auth/github', passport.authenticate('github', {scope: ['profile', 'email']}));

router.get('/auth/github/callback', passport.authenticate('github',{ failureRedirect: '/', session: false}),
   function(req, res) {
     var token = req.user.token;
     console.log('token is ', token);
     res.redirect('http://localhost:3000?token=' + token);
   }
);

router.get('/logout', function(req, res, next){
  console.log('auth logout reached')
  req.logOut();
  res.redirect('/');
});

module.exports = router;
