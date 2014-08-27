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

	// Add headers
	app.use(function (req, res, next) {

	    // Website you wish to allow to connect
//	    res.setHeader('Access-Control-Allow-Origin', 'http://staging-greenchef-static.s3-website-us-west-2.amazonaws.com');
	    res.setHeader('Access-Control-Allow-Origin', '*');

	    // Request methods you wish to allow
	    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	    // Request headers you wish to allow
	    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	    // Set to true if you need the website to include cookies in the requests sent
	    // to the API (e.g. in case you use sessions)
	    res.setHeader('Access-Control-Allow-Credentials', true);

	    // Pass to next layer of middleware
	    next();
	});

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))

	// parse application/json
	app.use(bodyParser.json())

	// parse application/vnd.api+json as json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
};
