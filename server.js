"use strict";

const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const app = express();

const Currency = require('./Currency');
const exec = require('./test');
const finaceURL = 'http://finance.i.ua/';
const privatURL = 'https://privatbank.ua/ru/';
const path = require('path');

const fs = require('fs');

app.use('/public', express.static(path.join(__dirname, "public")));

app.get('/', function(req, res) {

	request(finaceURL,  function (error, response, body) {
		if(!error) {
			const $ = cheerio.load(body);
			const buyCur = $(getUsdCur(2)).text();
			const saleCur = $(getUsdCur(3)).text();
			const nbuCur = $(getUsdCur(4)).text();

			// const currFinance = new Currency({
			// 	purchase: +buyCur,
			// 	sale: +saleCur,
			// 	nbu_cur: +nbuCur,
			// 	grabbed_from: 'finance.i.ua',
			// 	created_at: new Date()
			// })
			// currFinance.save(function(err) {
			// 	if (err) throw err;
			// 	console.log('currency finance.i.ua saved');
			// })								
		}
	})	

	request(privatURL, function(error, response, body) {
		if(!error) {			
			const $ = cheerio.load(body);			
			const buyCur = $('table#course-table-pb tbody#selectByPB tr:nth-child(3) td:nth-child(2)').text();
			const saleCur = $('table#course-table-pb tbody#selectByPB tr:nth-child(3) td:nth-child(3)').text();
			
			// const currPrivat = new Currency({
			// 	purchase: +buyCur,
			// 	sale: +saleCur,
			// 	nbu_cur: 0,
			// 	grabbed_from: 'privatbank.ua',
			// 	created_at: new Date()
			// })
			// currPrivat.save(function(err) {
			// 	if (err) throw err;
			// 	console.log('currency privat saved');
			// })
		}
	})	

	//exec(savePhantomToDB);

		
	fs.readFile('views/home.html', function (err, data) {
		res.writeHead(200, {
			"Content-Type": "text/html"
		});		
		res.write(data);			
		res.send();
	});
	
})
app.get('/api', function(req, res) {
	Currency.find({}, function(err, currencies) {
  		if (err) throw err;  				
  		res.send(currencies);
	});
})
app.listen(5555, () => {
	console.log('server stars on port 5555');
})

function getUsdCur(num){
	return `.widget-currency_bank tbody tr:first-child td:nth-child(${num}) span.value span:first-child`
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