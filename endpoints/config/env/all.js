'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
  root: rootPath,
  port: process.env.PORT || 3000,
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },
  beneficiary: {
    transactionProcessors: {
      "piryx": "5392359d30046c182f11de7b",
      "rally": "5392359d30046c182f11de7b"
    }
  },
  rallyApiBaseUrl: 'https://staging.rally.me/api/core'
};
