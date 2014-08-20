'use strict';

module.exports = {
  env: 'production',
  mongo: {
    uri: process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
         'mongodb://localhost/fullstack'
  },
  beneficiary: {
    transactionProcessors: {
      // TODO: replace with production object IDs
      "piryx": "PROD_ID",
      "rally": "PROD_ID"
    }
  },
  rallyApiBaseUrl: 'https://rally.org/api/core'
};
