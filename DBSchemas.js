var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

var db = mongoose.connection;

db.on('error', function (err) {
    console.error('connection error:', err.message);
});
db.once('open', function callback () {
    console.info("Connected to DB!");
});

var Schema = mongoose.Schema;

// create a schema
var curSchema = new Schema({
  purchase: { type: Number, required: true},
  sale:     { type: Number, required: true},
  nbu_cur:  { type: Number, required: true },  
  grabbed_from: { type: String, required: true},
  created_at: Date
});

var userSchema = new Schema({
  name:     {type: String, required: true},
  password: {type: String, required: true}  
})

// the schema is useless so far
// we need to create a model using it
var exports = module.exports = {};
exports.Currency = mongoose.model('Currency', curSchema);
exports.User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
// module.exports = {
//   Currency: mongoose.model('Currency', curSchema),
//   Users: mongoose.model('User', userSchema),
// }