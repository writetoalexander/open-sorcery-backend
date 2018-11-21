const express = require('express');
const router = express.Router();
//const github = require('../githubLogic/github');
const github = require('octonode');

let client = github.client();

router.get('/search/:id', (req, res, next) => {
  console.log('req.params ', req.params);
  let params = {
    q: req.params.id
  };
  client.get('https://api.github.com/search/repositories', params, (err, status, body, header) => {
    if (err) {
      console.log('err is ', err);
      return;
    } else {
      //console.log('data is ', JSON.stringify(body.items));
      res.send(body.items);
    }
  });



});

module.exports = router;