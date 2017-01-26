const CurrencyModel = require('../../models/DBSchemas').Currency;

module.exports = function (resours, buy, sale, nbu) {
	const siteCurrency = new CurrencyModel({
		purchase: +buy,
		sale: +sale,
		nbu_cur: +nbu,
		grabbed_from: `${resours}`,
		created_at: new Date()
	})
	siteCurrency.save(function(err) {
		if (err) throw err;
		console.log(`currency ${resours} saved`);
	})
}