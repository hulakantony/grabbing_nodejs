"use strict";

const express = require('express');
const app = express();
const Currency = require('./Currency');

const path = require('path');
const fs = require('fs');

const saveToDB = require('./helpers/dbSave');

app.use('/public', express.static(path.join(__dirname, "public")));
saveToDB();
setInterval(saveToDB, 3600000);
app.get('/', function(req, res) {

		
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

