var fs = require('fs');
var multer = require('multer'),
  upload = multer(),
  processor = require('../processor')();
var constants = require('../constants')();
var jwt    = require('jsonwebtoken');
var requireSession = function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log(token);
  if (!token){
    processor.render(req, res, {
      result: null,
      error: 'Authorization required'
    });
  } else {
    jwt.verify(token, constants.get(constants.keys.SUPER_SECRET), function(err, decoded) {
      if (err) {
        processor.render(req, res, {
          result: null,
          error: 'Invalid token'
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  }

}


exports = module.exports = function(app, controllers, modules) {
  app.get('/', function(req, res) {
    res.send("Quote BL API is alive");
  })

  fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "index.js") return;
        var name = file.substr(0, file.indexOf('.'));
        require('./' + name)(requireSession, app, controllers, modules, upload);
    });
}
