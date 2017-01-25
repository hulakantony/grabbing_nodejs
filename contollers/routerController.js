const { checkValidDateQuery, 
checkValidResoursQuery } = require('../helpers/checkQueryValidation');
const Currency = require('../models/DBSchemas').Currency;
const User = require('../models/DBSchemas').User;
const handleError = require('../helpers/errorHandler');
const jwt = require('jsonwebtoken');

module.exports = {
	getUsers: function(req, res) {
		User.find({}, function(err, users) {
			if(err) throw err;
			res.json(users)
		})
	},
	getResourses: function(req, res) {
		if(!checkValidResoursQuery(req)){
			handleError(res, 'Not valid resours endpoint', 'Correct your resours endpoint params', 400);
		} else {
			let dbQuery;
			const resours = req.params.resours;
			if(resours === 'privat') {
				dbQuery = 'privatbank.ua';
			}
			if(resours === 'finance') {
				dbQuery = 'finance.i.ua';
			}
			if(resours === 'kurs') {
				dbQuery = 'kurs.com.ua';
			}
			Currency.find({ 'grabbed_from': `${dbQuery}` }, 
				function(err, data) {
					if(err) throw err;
					res.json(data)
				})
		}
	},
	getDataByDate: function(req, res) {
		if(!checkValidDateQuery(req)) {
			handleError(res, 'Not valid data query', 'Correct your query params', 400);
		} else {
			let year = req.query.y,
				date = req.query.d,
				month = req.query.m;
			if(month.length === 1){
				month = `0${month}`;
			} 
			if(date.length === 1){
				date = `0${date}`;
			}
			Currency.find({ '$where': `this.created_at.toJSON().slice(0, 10) == "${year}-${month}-${date}"` }, 
				function(err, data) {
					if(err) throw err;
					res.json(data)
				})
		}		
	},
	getAllData: function(req, res) {
		console.log('ddddddddddd')			
		Currency.find({}, function(err, currencies) {
	  		if (err) throw err;  				
	  		res.json(currencies);
		});
	},
	userSignin: function(req, res) {
		const name = req.body.name;
		const pass = req.body.password;	
		var user = new User({ 
			name: name, 
			password: pass	
		});	
		user.save(function(err) {
			if (err) throw err;

			console.log('User saved successfully');
			res.redirect('/');
		});
	},
	authorization: function(app) {

		return function(req, res) { 
			console.log(req.body.name)
		User.findOne({
			name: req.body.name
		}, function(err, user) {
			if (err) throw err;
			if (!user) {
	  			res.json({ success: false, message: 'Authentication failed. User not found.' });
			} else if (user) {     
	  			if (user.password != req.body.password) {	  				
	    			res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	  			} else {
	    			var token = jwt.sign(user, app.get('superSecret'), {
	    				expiresIn : 60*60*24 // expires in 24 hours
	    			});       
	    			res.json({
	      				success: true,
	      				message: 'Enjoy your token!',
	      				token: token
	    			});
	  			}   

			}
		});
	}
	},
	authVerification: function (app) {
		return function(req, res, next) {  
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		if (token) {   
			jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
	  			if (err) {
	    			return res.json({ success: false, message: 'Failed to authenticate token.' });    
	  			} else {         	
	   				req.decoded = decoded;       
	    			next();
	  			}
			});

		} else {  
			return res.status(403).send({ 
    			success: false, 
    			message: 'No token provided.' 
			});
		}
	}
	}
}