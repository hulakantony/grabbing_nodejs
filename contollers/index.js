'use strict';
const getUsers = require('./getUsers/');
const getResourses = require('./getResourses/');
const getDataByDate = require('./getDataByDate/');
const getAllCurrencyData = require('./getAllCurrencyData/');
const userSignin = require('./userSignin/');
const authorization = require('./authorization/');
const authVerification = require('./authVerification/');

module.exports = {
	getUsers: getUsers,
	getResourses: getResourses,
	getDataByDate: getDataByDate,
	getAllCurrencyData: getAllCurrencyData,
	userSignin: userSignin,
	authorization: authorization,
	authVerification: authVerification
}