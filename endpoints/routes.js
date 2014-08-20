/* -*- mode: javascript; js-indent-level: 2; indent-tabs-mode: nil -*- */
'use strict';

var index = require('./controllers');

var middleware = require('./middleware');

var API_VERSION = 1;

/**
 * Application routes
 */
module.exports = function(app) {

  // Any other versions accessed should return 410 Gone.
  app.get('/api/v*/*', function (req, res) {
    res.send(410);
  });

  // All other undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};
