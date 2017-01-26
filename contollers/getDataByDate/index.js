const CurrencyModel = require('../../models/DBSchemas').Currency;
const checkValidDateQuery = require('./helpers/checkValidDateQuery');
const handleError = require('../../helpers/errorHandler');

module.exports = function(req, res) {
	if(!checkValidDateQuery(req)) {
		handleError(res, 'Not valid data query', 'Correct your query params', 400);
	} else {
		let year = req.query.y,
			date = req.query.d,
			month = req.query.m;
		if(month.length === 1){
			month = `0${month}`;
		} 
		if(date.length === 1){
			date = `0${date}`;
		}
		CurrencyModel.find({ '$where': `this.created_at.toJSON().slice(0, 10) == "${year}-${month}-${date}"` }, 
			function(err, data) {
				if(err) throw err;
				res.json(data)
			})
	}		
}