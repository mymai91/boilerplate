'use strict';

var config = require('../config/config.json');
var jwt = require('jsonwebtoken');

exports.validate = function(req, res) {
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401
  // would probably be good to support a provider paranter
  // then the othe parameters would then be whatever the provider
  // requires.
  // Once you have the provider, you can get it's proxy, then use
  // the info provided to fetch the user profile info to stuff in
  // the token

  // Main thing to do is:
  //  1 - use some service to validate the credentials passed in
  //  2 - use some service to fetch the profile info you want
  //      available to other secured api calls

  if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
    res.send(401, 'Wrong user or password');
    return;
  }

  var profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    id: 123
  };

  // We are sending the profile inside the token
  var token = jwt.sign(profile, config.auth.jwtSecret, {expiresInMinutes: config.auth.expiresInMinutes} );

  console.log('created token for ' + JSON.stringify(profile));

  res.json({ token: token });
};
