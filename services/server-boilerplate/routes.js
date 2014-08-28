/* -*- mode: javascript; js-indent-level: 2; indent-tabs-mode: nil -*- */
'use strict';

var awesome = require('./controllers/awesomethings'),
  auth = require('./controllers/authorize');

/**
 * Application routes
 */
module.exports = function(app) {


  // define the auth endpoint
  app.post('/api/authenticate', auth.validate);

  // define the public api end points
  app.get('/public/api/awesome/:id', awesome.show)

  // define the secured api end points
  app.get('/api/awesome/:id', awesome.showSecured)

  // Any other versions accessed should return 410 Gone.
  app.get('/api/v*/*', function (req, res) {
    res.send(410);
  });

  // All other undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });
};
