"use strict";

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');
const fromGrabbersToDB = require('./grabbers/');


fromGrabbersToDB();
cron.schedule('* * 6 * * *', function() {
    fromGrabbersToDB();
});

app.use('/public', express.static(path.join(__dirname, "public")));


app.get('/', function(req, res) {		
	fs.readFile('views/login.html', function (err, data) {
		res.writeHead(200, {
			"Content-Type": "text/html"
		});		
		res.write(data);			
		res.send();
	});
	
})

app.get('/currency', function(req, res) {
	fs.readFile('views/home.html', function (err, data) {
		res.writeHead(200, {
			"Content-Type": "text/html"
		});		
		res.write(data);			
		res.send();
	});
})

app.listen(8080, () => {
	console.log('static server starts on port 8080');
})

