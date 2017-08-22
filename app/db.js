var mongoskin = require('mongoskin');

var prod = true;
if(process.env.NODE_ENV == 'production'){
  prod = true;
}
var dbInstance;
if(prod){
  // dbInstance = mongoskin.db('mongodb://qu4ngco:856814@waffle.modulusmongo.net:27017/izig9Epy', {safe:true})
  // dbInstance = mongoskin.db('mongodb://quangpham:12345abc@ds161860.mlab.com:61860/quotebl', {safe:true})
  // mongodb://<dbuser>:<dbpassword>@ds011379.mlab.com:11379/heroku_mtk8qg33
dbInstance = mongoskin.db('mongodb://quangd8:admin123@localhost27017/quotebl', {safe:true})

} else{
  dbInstance = mongoskin.db('mongodb://quangd8:admin123@localhost27017/quotebl', {safe:true})
}
exports = module.exports = dbInstance;
