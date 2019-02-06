var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

/* GET Google Authentication API. */


router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ], prompt: 'consent' }));

router.get('/auth/github/callback', passport.authenticate('github',{ failureRedirect: '/', session: false}),
   function(req, res) {
     console.log('req.user ', req.user)
     var token = req.user.token;
     console.log('token is ', token);
     res.redirect('http://localhost:3000?token=' + token);
   }
);

router.get('/logout', function(req, res, next){
  req.logout();
  req.session = null; 
  res.redirect('/');
 
});

module.exports = router;
