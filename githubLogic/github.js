const axios = require('axios');
const keys = require('../config/keys')
const github = require('octonode');

let client = github.client();

module.exports = {
  searchRepos: (query) => {
  //   try {
  //     let params = {
  //       q: query,
  //       client_secret: keys.github.clientSecret
  //     };
  //     let results = await axios.get('https://api.github.com/search/repositories', params);
  //   } catch(err) {
  //     console.log('err is ', err.response.data);
  //     return;
  //   }


  // }
    let params = {
      q: query,
      sort: 'stars',
      order: 'asc'

    };
    return client.get('/search/repositories', params, (err, status, body, headers) => {
      if (err) {
        console.log('err is  ', err)
      } else {
        //console.log('response is ', body);
      }

    });

  }
};