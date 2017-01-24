"use strict";

const express = require('express');
const app = express();
const Currency = require('./DBSchemas').Currency;
const User = require('./DBSchemas').User;

const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const saveToDB = require('./helpers/dbSave');

const router = express.Router();

app.use('/public', express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


saveToDB();
setInterval(saveToDB, 3600000);

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// router.use(function(req, res, next) {    
//     console.log('middleware');
//     next(); 
// });

app.set('superSecret', 'otsosi');
router.post('/authenticate', function(req, res) {	
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
        	expiresIn : 60*60*24 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

router.post('/login', function(req, res) {
	const name = req.body.name;
	const pass = req.body.password;
	console.log( typeof name, typeof pass)
	var user = new User({ 
		name: name, 
		password: pass	
	});
	
	user.save(function(err) {
		if (err) throw err;

		console.log('User saved successfully');
		res.redirect('/');
	});
});

router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

router.get('/', function(req, res) {
	console.log(req)
	Currency.find({}, function(err, currencies) {
  		if (err) throw err;  				
  		res.json(currencies);
	});
})

router.get('/date/:date', function(req, res) {
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
	
})

router.get('/resourses/:resours', function(req, res) {
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
})
app.get('/login', function(req, res) {

  // create a sample user
  var nick = new User({ 
    name: 'Nick Cerminara', 
    password: 'password',
    admin: true 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

router.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		if(err) throw err;
		res.json(users)
	})
})





app.get('/', function(req, res) {
		
	fs.readFile('views/home.html', function (err, data) {
		res.writeHead(200, {
			"Content-Type": "text/html"
		});		
		res.write(data);			
		res.send();
	});
	
})
app.use('/api', router);

app.listen(5555, () => {
	console.log('server stars on port 5555');
})

function checkValidDateQuery(req) {
	if(!req.query.y || !req.query.m || !req.query.d){		
		return false;
	}
	if(req.params.date !== 'date'){		
		return false;
	}
	if(+req.query.y < 2016 || +req.query.y > 2017 || isNaN(req.query.y)) {		
		return false;
	}
	if(+req.query.m < 0 || +req.query.m > 12 || isNaN(req.query.m)) {		
		return false;
	}
	if(+req.query.d < 1 || +req.query.d > 31 || isNaN(req.query.d)) {		
		return false;
	}

	return true;
}

function checkValidResoursQuery(req) {
	const resours = req.params.resours;	
	if(resours === 'privat'){
		return true;
	} else if(resours === 'finance') {
		return true;
	} else if(resours === 'kurs') {
		return true;
	}
	return false;
}