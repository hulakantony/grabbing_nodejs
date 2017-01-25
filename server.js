"use strict";

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');
const routerContr = require('./contollers/routerController');
const saveToDB = require('./helpers/dbSave');
const router = express.Router();

saveToDB();
cron.schedule('* * 6 * * *', function() {
    saveToDB();
});

app.use('/public', express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('superSecret', 'secret19');

router.post('/authenticate', routerContr.authorization);
router.post('/signin', routerContr.userSignin);
router.use(routerContr.authVerification);
router.get('/', routerContr.getAllData);
router.get('/date/:date', routerContr.getDataByDate);
router.get('/resourses/:resours', routerContr.getResourses);
router.get('/users', routerContr.getUsers);
app.use('/api', router);

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

app.listen(5555, () => {
	console.log('server stars on port 5555');
})

