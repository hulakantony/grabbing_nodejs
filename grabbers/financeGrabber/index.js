const CurrencyModel = require('../../models/DBSchemas').Currency;
const cheerio = require('cheerio');
const request = require('request');
const getFinanceUsdCur = require('./helpers/getFinanceUsdCur');
const currencySaver = require('../../database/currencySaver/');
const finaceURL = 'http://finance.i.ua/';

module.exports = function() {
	request(finaceURL,  function (error, response, body) {
		if(!error) {
			const $ = cheerio.load(body);
			const buyCur = $(getFinanceUsdCur(2)).text();
			const saleCur = $(getFinanceUsdCur(3)).text();
			const nbuCur = $(getFinanceUsdCur(4)).text();

			currencySaver('finance.i.ua', buyCur, saleCur, nbuCur);										
		}
	})
}

