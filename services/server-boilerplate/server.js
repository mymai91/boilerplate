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

// Bootstrap models
var modelsPath = path.join(__dirname, './models');
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});

var app = express();

// initialize express
require('./config/init')(app);

// set up the routing
require('./routes')(app);

// set the listen port
var port = process.env.PORT || 3000;

// Start server  (how we getting port set again?)
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

// Expose app
exports = module.exports = app;
