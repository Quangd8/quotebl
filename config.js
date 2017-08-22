'use strict';


var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Request-Headers', 'X-Requested-With, accept, content-type');
  res.header('Access-Control-Allow-Headers', 'Set-Cookie, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-access-token');
  next();

};

exports = module.exports = function(app) {
  // Configuration for server

    app.use(allowCrossDomain);

};
