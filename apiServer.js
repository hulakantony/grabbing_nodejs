"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const routerContr = require('./contollers/');
const cors = require('cors');
const router = express.Router();

app.set('superSecret', 'secret19');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:8080'}));

router.post('/authenticate', routerContr.authorization(app));
router.post('/signin', routerContr.userSignin);

router.use(routerContr.authVerification(app));

router.get('/', routerContr.getAllCurrencyData);
router.get('/date/:date', routerContr.getDataByDate);
router.get('/resourses/:resours', routerContr.getResourses);
router.get('/users', routerContr.getUsers);

app.use('/api', router);

app.listen(5555, () => {
	console.log('api server starts on port 5555');
})