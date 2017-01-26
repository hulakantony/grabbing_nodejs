const UserModel = require('../../models/DBSchemas').User;
const jwt = require('jsonwebtoken');

module.exports = function(app) {
	return function(req, res) { 			
	UserModel.findOne({
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
}