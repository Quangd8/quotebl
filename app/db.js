var mongoskin = require('mongoskin');

var prod = true;
if(process.env.NODE_ENV == 'production'){
  prod = true;
}
var dbInstance;
if (prod) {
  // dbInstance = mongoskin.db('mongodb://quangd8:admin123@localhost:27017/quotebl',{native_parser:true})
  dbInstance = mongoskin.db('mongodb://localhost:27017/quotebl',{native_parser:true})
} else{
  dbInstance = mongoskin.db('mongodb://localhost:27017/quotebl',{native_parser:true})
}
exports = module.exports = dbInstance;
