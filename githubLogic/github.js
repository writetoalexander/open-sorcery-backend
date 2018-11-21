const axios = require('axios');
const keys = require('../config/keys')
const github = require('octonode');

let client = github.client();

module.exports = {
  searchRepos: async (query) => {
      let params = {
        q: query
      };
      let results;
      await client.get('https://api.github.com/search/repositories', params, (err, status, body, header) => {
        if (err) {
          console.log('err is ', err);
          return;
        } else {
          results = body
        }
      });
      return results;
  }
};