const UserModel = require('../../models/DBSchemas').User;

module.exports = function(req, res) {
	const name = req.body.name;
	const pass = req.body.password;		
	UserModel.findOne({
		name: name
	}, function(err, user) {
		if(err) throw err;
		if(!user) {
			var user = new UserModel({ 
				name: name, 
				password: pass	
			});	
			user.save(function(err) {
				if (err) throw err;

				console.log('User saved successfully');
				res.json({ success: true, message: 'User saved successfully' })					
			});
		} else {
			res.json({ success: false, message: 'Username has already been used' });				
		}	
	})			
}