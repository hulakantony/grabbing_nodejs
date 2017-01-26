const CurrencyModel = require('../../models/DBSchemas').Currency;
const checkValidResoursQuery = require('./helpers/checkValidResoursQuery');
const handleError = require('../../helpers/errorHandler');

module.exports = function(req, res) {
	if(!checkValidResoursQuery(req)){
		handleError(res, 'Not valid resours endpoint', 'Correct your resours endpoint params', 400);
	} else {
		let dbQuery;
		const resours = req.params.resours;
		if(resours === 'privat') {
			dbQuery = 'privatbank.ua';
		}
		if(resours === 'finance') {
			dbQuery = 'finance.i.ua';
		}
		if(resours === 'kurs') {
			dbQuery = 'kurs.com.ua';
		}
		CurrencyModel.find({ 'grabbed_from': `${dbQuery}` }, 
			function(err, data) {
				if(err) throw err;
				res.json(data)
			})
	}
}