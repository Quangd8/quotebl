var request = require('request'),
  dbInstance = require('../db');

var noop = function() {};

var pGetFacebook = function(options, callback) {
  var cb = callback || noop,
    opts = options || {};

  var collection = dbInstance.collection("users");
  var limit = 1;
  var findOpts = {
    fbId: opts.fbId,
  }
  collection.find(findOpts, {
    limit: limit
  }).toArray(function(err, results) {
    if (err) {
      return cb(err);
    }
    if (results && results.length) {
      cb(null, results[0]);
    } else {
      cb('user not found');
    }
  });
}

var pAddFacebook = function(options, callback) {
  var cb = callback || noop,
    opts = options || {};
  console.log("Start creating faecbook account");
  var data = {
    fbId: opts.fbId.trim()
  }
  var collection = dbInstance.collection("users");
  collection.insert(data, function(err, results) {
    if (err) {
      return cb("Please try again! Error insert new user");
    } else if (results && results.length) {
      return cb(null, results[0]);
    } else {
      return cb('Create user error');
    }
  });
}

exports = module.exports = {
  getFB: pGetFacebook,
  addFB: pAddFacebook
};
