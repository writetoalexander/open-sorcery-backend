const express = require('express');
const router = express.Router();
const github = require('../githubLogic/github');

router.get('/search', (req, res, next) => {
  github.searchRepos('React Native');
  console.log('req is ', res.body);
  //console.log(' res is ', res);
});

module.exports = router;