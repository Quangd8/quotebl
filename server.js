var express = require('express'),
  bodyParser = require('body-parser'),
  swaggerJSDoc = require('swagger-jsdoc'),
  logger = require('morgan');
var cors = require('cors');
var PORT = Number(process.env.PORT || 8181);
var fs = require('fs');

var app = express()
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('doc'));
app.use('/docs', express.static('doc'));

app.use(logger('dev'));

// setup constants
require('./app/constants')({
  languagePack: require('./app/languages/english')
});


var apis = [];

var dir = __dirname + '/app/routes';
fs.readdirSync(dir).forEach(function(file) {
        if (file == "index.js") return;
        apis.push('./app/routes/' + file);
    });
var options = {
  swaggerDefinition: {
    info: {
      title: 'QuoteBL API', // Title (required)
      description: 'This is API documentation for QuoteBL app',
      version: '1.0.0', // Version (required)
    },
  },
  apis: apis, // Path to the API docs
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
var swaggerSpec = swaggerJSDoc(options);

app.get('/api-docs.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// setup controllers
controllers = require('./app/controllers/index');
// setup modules
modules = require('./app/modules/index');

// setup routes
require('./app/routes/')(app, controllers);
require('./config')(app);

//setup database


app.listen(PORT, function(){
  console.log('Express server listening on port ', PORT)
})
