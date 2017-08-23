var fs = require('fs');
var dir = __dirname;
var modules = {}
fs.readdirSync(dir).forEach(function(file) {
        if (file == "index.js") return;
        var name = file.substr(0, file.indexOf('.'));
        modules[name] = require('./' + file);
    });

exports = module.exports = modules
