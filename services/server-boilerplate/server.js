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
var config = require('./config/config');

if(config.env !== process.env.NODE_ENV){
  process.env.NODE_ENV = config.env;
}

// Bootstrap models
var modelsPath = path.join(__dirname, './models');
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});

var app = express();

// Express settings
require('./config/express')(app);

// Routing
require('./routes')(app);

// Start server  (how we getting port set again?)
app.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
