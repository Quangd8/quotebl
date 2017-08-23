var fs = require('fs');
var dir = __dirname;
var controllers = {}
fs.readdirSync(dir).forEach(function(file) {
        if (file == "index.js") return;
        var name = file.substr(0, file.indexOf('.'));
        controllers[name] = require('./' + file);
    });

exports = module.exports = controllers
