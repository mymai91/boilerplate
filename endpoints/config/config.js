/* -*- mode: javascript; indent-tabs-mode: nil; js-indent-level: 2 -*- */
'use strict';

var _ = require('lodash');
var fs = require('fs');
var currentEnvConfig = './env/development';

/**
 * Load environment configuration
 */

if(process.argv.length > 2)
{
  if(fs.existsSync(process.argv[2]))
  {
    currentEnvConfig = process.argv[2];
  }
  else
  {
    console.log('Specified config file not found: ' + process.argv[2]);
  }
}
else if(process.env.NODE_ENV !== undefined
        && fs.existsSync('./env/' + process.env.NODE_ENV + '.js'))
{
  currentEnvConfig = './env/' + process.env.NODE_ENV + '.js';
}

module.exports = _.merge(
    require('./env/all.js'),
    require(currentEnvConfig) || {});
