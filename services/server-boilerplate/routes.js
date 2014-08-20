/* -*- mode: javascript; js-indent-level: 2; indent-tabs-mode: nil -*- */
'use strict';

var awesome = require('./controllers/awesomethings');

/**
 * Application routes
 */
module.exports = function(app) {

  app.get('/api/awesome/:id', awesome.show)

  // Any other versions accessed should return 410 Gone.
  app.get('/api/v*/*', function (req, res) {
    res.send(410);
  });

  // All other undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });
};
