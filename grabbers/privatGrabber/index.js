const cheerio = require('cheerio');
const request = require('request');
const CurrencyModel = require('../../models/DBSchemas').Currency;
const getPrivatUsdCur = require('./helpers/getPrivatUsdCur');
const currencySaver = require('../../database/currencySaver/');
const privatURL = 'https://privatbank.ua/ru/';

module.exports = function () {
	request(privatURL, function(error, response, body) {
		if(!error) {			
			const $ = cheerio.load(body);			
			const buyCur = $(getPrivatUsdCur(2)).text();
			const saleCur = $(getPrivatUsdCur(3)).text();
			
			currencySaver('privatbank.ua', buyCur, saleCur, 0);			
		}
	})
}