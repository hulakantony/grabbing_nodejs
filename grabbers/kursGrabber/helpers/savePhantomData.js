const CurrencyModel = require('../../../models/DBSchemas').Currency;
const currencySaver = require('../../../database/currencySaver/');
const exec = require('./phantomExecute');

module.exports = function savePhantomData(msg){
	if(msg === 'nodata'){
		console.log('nodata')
		exec(savePhantomData);
	}
	if(msg && msg !== 'nodata'){
		const kursCur = JSON.parse(msg);
		let { buy, nbu, sale } = kursCur;
		currencySaver('kurs.com.ua', buy, sale, nbu);		
	}
}