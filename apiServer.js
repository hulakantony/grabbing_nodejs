"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const routerContr = require('./contollers/routerController');
const cors = require('cors');
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({origin: 'http://localhost:8080'}));


app.set('superSecret', 'secret19');

router.post('/authenticate', routerContr.authorization(app));
router.post('/signin', routerContr.userSignin);
router.use(routerContr.authVerification(app));
router.get('/', routerContr.getAllData);
router.get('/date/:date', routerContr.getDataByDate);
router.get('/resourses/:resours', routerContr.getResourses);
router.get('/users', routerContr.getUsers);
app.use('/api', router);

app.listen(5555, () => {
	console.log('static server starts on port 5555');
})