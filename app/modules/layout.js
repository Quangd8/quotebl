var request = require('request'),
  dbInstance = require('../db');

var noop = function() {};

var createLayout = function(options, callback) {
  var cb = callback || noop,
    opts = options || {};
  console.log("Start creating layout");
  if (!opts.name) {
    return cb("Layout name required");
  }
  if (!opts.layout) {
    return cb("Layout data required");
  }
  var data = {
    name: opts.name.trim(),
    data: opts.layout,
    updated: new Date()
  }
  var collection = dbInstance.collection("public_layouts");
  collection.insert(data, function(err, results) {
    if (err) {
      return cb("Please try again! Error insert new user");
    } else if (results && results.length) {
      return cb(null, results[0]);
    } else {
      console.log("cai j vay ssava");
      return cb('Create layout error');
    }
  });
}

var listPublic = function(options, callback) {
  var cb = callback || noop,
    opts = options || {};
  var collection = dbInstance.collection("public_layouts");
  var limit = opts.perpage || 20;
    collection.find(opts ,{limit: limit, sort: {'_id': -1}}).toArray(function(err, results){
      cb(err, results);
    })
}

var createLayoutSet = function(options, callback) {
  var cb = callback || noop,
    opts = options || {};
  console.log("Start creating layout set");
  if (!opts.name) {
    return cb("Layout name required");
  }
  if (!opts.collection) {
    return cb("Layout collection data required");
  }
  var data = {
    name: opts.name.trim(),
    data: opts.collection,
    updated: new Date()
  }
  var collection = dbInstance.collection("public_layouts_set");
  collection.insert(data, function(err, results) {
    if (err) {
      return cb("Please try again! Error insert new user");
    } else if (results && results.length) {
      return cb(null, results[0]);
    } else {
      return cb('Create layout error');
    }
  });
}

var listPublicSet = function(options, callback) {
  var cb = callback || noop,
    opts = options || {};
  var collection = dbInstance.collection("public_layouts_set");
  var limit = opts.perpage || 20;
    collection.find(opts ,{limit: limit, sort: {'_id': -1}}).toArray(function(err, results){
      cb(err, results);
    })
}

exports = module.exports = {
  createLayout: createLayout,
  listPublic: listPublic,
  createLayoutSet: createLayoutSet,
  listPublicSet: listPublicSet
};
