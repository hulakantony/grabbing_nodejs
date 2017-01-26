const CurrencyModel = require('../../models/DBSchemas').Currency;

module.exports = function(req, res) {
	CurrencyModel.find({}, function(err, currencies) {
  		if (err) throw err;  				
  		res.json(currencies);
	});
}