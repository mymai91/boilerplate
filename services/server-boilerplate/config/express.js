'use strict';

var express = require('express'),
    path = require('path'),
    config = require('./config'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

/**
 * Express configuration
 */
module.exports = function(app) {

	var env = process.env.NODE_ENV || 'development';
	if ('development' == env) {
	 	app.use(require('connect-livereload')());
	}

	if ('production' == env) {

	}

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))

	// parse application/json
	app.use(bodyParser.json())

	// parse application/vnd.api+json as json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
};
