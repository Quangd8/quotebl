'use strict';
var processor = require('../processor')();
var ObjectID = require('mongodb').ObjectID;
var mUser= require('../modules/index').user;
var constants = require('../constants')();
var jwt    = require('jsonwebtoken');

var pFacebookLogin = function(req, res){
  var user = {
    email: req.body.email,
    fbId: req.body.fbId,
    name: req.body.name
  };
  mUser.getFB({fbId: req.body.fbId}, function(err, response) {
    if (!err && response){
      processor.render(req, res, {
        result: response && !err ? response : null,
        error: err ? err : null
      });
    } else{
      mUser.addFB(user, function(err, response) {
        console.log ("Testing");
        processor.render(req, res, {
          result: response && !err ? response : null,
          error: err ? err : null
        });
      });
    }

  })
}

var pGoogleLogin = function(req, res){
  var user = {
    email: req.body.email,
    gId: req.body.gId,
    name: req.body.name
  };
  mUser.getGoogle({fbId: req.body.fbId}, function(err, response) {
    if (!err && response){
      req.session.user = response;
      processor.render(req, res, {
      result: response && !err ? response : null,
      error: err ? err : null
    });
    } else{
      mUser.addGoogle(user, function(err, response){
        if (!err && response){
          req.session.user = response;
        }
        processor.render(req, res, {
          result: response && !err ? response : null,
          error: err ? err : null
        });
      });
    }

  })
}

var pLogout = function(req, res){
  req.session.destroy(() => {
    req.session = null;
    processor.render(req, res,{
      result: {
        success: true
      }
    });
  });
}

exports  = module.exports = {
  logout: pLogout,
  loginFB: pFacebookLogin,
  loginGoogle: pGoogleLogin,
}
