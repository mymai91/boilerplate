/* -*- mode: javascript; indent-tabs-mode: nil; js-indent-level: 2 -*- */
'use strict';

var express = require('express'),
    path = require('path'),
    fs = require('fs');

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./endpoints/config/config');

if(config.env !== process.env.NODE_ENV){
  process.env.NODE_ENV = config.env;
}

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});

// Populate empty DB with sample data
// Passport Configuration
var passport = require('./endpoints/config/passport');

var app = express();

// Express settings
require('./endpoints/config/express')(app);

// Routing
require('./endpoints/routes')(app);

// Start server
app.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
