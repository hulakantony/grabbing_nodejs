const cheerio = require('cheerio');
const request = require('request');
const Currency = require('../models/DBSchemas').Currency;

const exec = require('./getDataFromPhantom');

const finaceURL = 'http://finance.i.ua/';
const privatURL = 'https://privatbank.ua/ru/';

module.exports = function() {   
	 
    request(finaceURL,  function (error, response, body) {
		if(!error) {
			const $ = cheerio.load(body);
			const buyCur = $(getFinanceUsdCur(2)).text();
			const saleCur = $(getFinanceUsdCur(3)).text();
			const nbuCur = $(getFinanceUsdCur(4)).text();

			const currFinance = new Currency({
				purchase: +buyCur,
				sale: +saleCur,
				nbu_cur: +nbuCur,
				grabbed_from: 'finance.i.ua',
				created_at: new Date()
			})
			currFinance.save(function(err) {
				if (err) throw err;
				console.log('currency finance.i.ua saved');
			})								
		}
	})	

	request(privatURL, function(error, response, body) {
		if(!error) {			
			const $ = cheerio.load(body);			
			const buyCur = $(getPrivatUsdCur(2)).text();
			const saleCur = $(getPrivatUsdCur(3)).text();
			
			const currPrivat = new Currency({
				purchase: +buyCur,
				sale: +saleCur,
				nbu_cur: 0,
				grabbed_from: 'privatbank.ua',
				created_at: new Date()
			})
			currPrivat.save(function(err) {
				if (err) throw err;
				console.log('currency privat saved');
			})
		}
	})

	exec(savePhantomToDB);
};

function getFinanceUsdCur(num) {
	return `.widget-currency_bank tbody tr:first-child td:nth-child(${num}) span.value span:first-child`
}

function getPrivatUsdCur(num) {
	return `table#course-table-pb tbody#selectByPB tr:nth-child(3) td:nth-child(${num})`;
}

function savePhantomToDB(msg){
	if(msg){
		const kursCur = JSON.parse(msg);
		let { buy, nbu, sale } = kursCur;
		const currKurs = new Currency({
			purchase: buy,
			sale: sale,
			nbu_cur: nbu,
			grabbed_from: 'kurs.com.ua',
			created_at: new Date()
		})
		currKurs.save(function(err) {
			if (err) throw err;
			console.log('currency kurs saved');
		})
	}
}