'use strict';
var processor = require('../processor')();
var mObject= require('../modules/index').layout;
var constants = require('../constants')();
var jwt    = require('jsonwebtoken');

var createLayout = function(req, res){
  var data = {
    name: req.body.name,
    layout: req.body.layout
  };
  mObject.createLayout(data, function(err, response) {
    processor.render(req, res, {
      result: response && !err ? response : null,
      error: err ? err : null
    });
  })
}

var listPublic = function(req, res){
  var data = {

  };
  mObject.listPublic(data, function(err, response) {
    processor.render(req, res, {
      result: response && !err ? response : null,
      error: err ? err : null
    });
  })
}

exports  = module.exports = {
  share: createLayout,
  listPublic: listPublic
}
